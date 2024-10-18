import OpenAI from "openai";
import { NextResponse } from "next/server";
import multer from "multer";
import AdmZip from "adm-zip";
import { parseStringPromise } from "xml2js";

// Setup OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

export async function GET() {
  return NextResponse.json({ message: "API route is working!" });
}

// Function to parse DOCX files
async function parseDocx(buffer) {
  try {
    const zip = new AdmZip(buffer);
    const xmlFile = zip.readAsText("word/document.xml");
    const data = await parseStringPromise(xmlFile);

    let extractedText = "";
    const paragraphs = data?.["w:document"]?.["w:body"]?.[0]?.["w:p"];

    if (paragraphs && Array.isArray(paragraphs)) {
      paragraphs.forEach((para) => {
        const runs = para["w:r"];
        if (runs && Array.isArray(runs)) {
          runs.forEach((run) => {
            const texts = run["w:t"];
            if (texts && Array.isArray(texts)) {
              extractedText += texts.join("") + "\n";
            }
          });
        }
      });
    } else {
      throw new Error(
        "DOCX file does not contain the expected paragraph structure."
      );
    }

    return extractedText.trim();
  } catch (error) {
    console.error(`Error parsing DOCX: ${error.message}`);
    throw new Error(`Error parsing DOCX: ${error.message}`);
  }
}

async function convertPdfToDocx(buffer) {
  const pdfPath = "./temp.pdf"; // Temporary path for the PDF
  const docxPath = "./temp.docx"; // Temporary path for the DOCX

  // Write the buffer to a temporary PDF file
  const fs = require("fs");
  fs.writeFileSync(pdfPath, buffer);

  // Convert PDF to DOCX
  await convert(pdfPath, docxPath);

  // Read the converted DOCX file
  const docxBuffer = fs.readFileSync(docxPath);

  // Cleanup temporary files
  fs.unlinkSync(pdfPath);
  fs.unlinkSync(docxPath);

  return docxBuffer; // Return the DOCX buffer
}

// Function to parse XML files
async function parseXml(buffer) {
  try {
    const xmlString = buffer.toString(); // Convert buffer to string
    const data = await parseStringPromise(xmlString); // Parse the XML
    return JSON.stringify(data); // Return as JSON string or plain text
  } catch (error) {
    console.error(`Error parsing XML: ${error.message}`);
    throw new Error(`Error parsing XML: ${error.message}`);
  }
}

// POST function to handle file uploads and send content to OpenAI for summarization
export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  try {
    console.log(
      `Received file: ${file.name}, size: ${file.size}, type: ${file.type}`
    );

    let content = "";

    // Handle DOCX files
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      content = await parseDocx(fileBuffer);
    }
    // Handle XML files
    else if (
      file.type === "text/xml" ||
      file.type === "application/xml" ||
      file.type === "application/xhtml+xml" ||
      file.type === "text/plain"
    ) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      content = await parseXml(fileBuffer);
    }
    // Unsupported file type
    else {
      throw new Error(
        `Uploaded file type is: ${file.type}. Expected DOCX, PDF, XML, or XLSX.`
      );
    }

    console.log("Extracted content:", content);

    // Call OpenAI API to summarize the extracted document
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Summarize this document." },
        { role: "user", content: content },
      ],
    });

    console.log("OpenAI Response:", response.choices[0].message.content);

    return new Response(
      JSON.stringify({ summary: response.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing document:", error.message);
    return NextResponse.json(
      { error: `Error processing document: ${error.message}` },
      { status: 500 }
    );
  }
}
