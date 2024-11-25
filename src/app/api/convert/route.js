import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import mammoth from "mammoth"; // Use mammoth for DOCX parsing
import OpenAI from "openai";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdfFile");

    if (!file) {
      return NextResponse.json(
        { error: "PDF file is required" },
        { status: 400 }
      );
    }

    // Define temporary paths for the uploaded PDF and converted DOCX
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const pdfPath = path.join(uploadsDir, file.name);
    const docxPath = pdfPath.replace(".pdf", ".docx");

    // Save the PDF file locally
    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(pdfPath, pdfBuffer);

    // Execute the Python script for conversion
    const scriptPath = path.join(process.cwd(), "scripts", "convert_pdf.py");
    const { spawn } = require("child_process");

    const pythonProcess = spawn("python", [scriptPath, pdfPath, docxPath]);

    return new Promise((resolve, reject) => {
      pythonProcess.on("close", async (code) => {
        if (code === 0) {
          // After successful conversion, read the DOCX file
          if (!fs.existsSync(docxPath)) {
            return reject(
              NextResponse.json(
                { error: "DOCX file was not generated" },
                { status: 500 }
              )
            );
          }

          // Use Mammoth to extract text content from the DOCX file
          const docxBuffer = fs.readFileSync(docxPath);
          let content;
          try {
            const result = await mammoth.extractRawText({ buffer: docxBuffer });
            content = result.value; // Extracted text content
          } catch (error) {
            console.error("Error parsing DOCX with Mammoth:", error);
            return reject(
              NextResponse.json(
                { error: "Failed to parse DOCX file" },
                { status: 500 }
              )
            );
          }

          // Send content to OpenAI for summarization
          const question =
            formData.get("question") || "Summarize this document.";
          try {
            const response = await openai.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [
                { role: "system", content: "Summarize this document." },
                { role: "user", content: content },
                { role: "user", content: `Question: ${question}` },
              ],
            });

            resolve(
              NextResponse.json(
                { summary: response.choices[0].message.content },
                { status: 200 }
              )
            );
          } catch (error) {
            console.error("Error with OpenAI API:", error);
            return reject(
              NextResponse.json(
                { error: "Failed to generate summary" },
                { status: 500 }
              )
            );
          }
        } else {
          reject(
            NextResponse.json(
              { error: "Python script execution failed" },
              { status: 500 }
            )
          );
        }
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error("Python script error:", data.toString());
      });
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
