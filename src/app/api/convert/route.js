// pages/api/convert.js
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable the bodyParser so that Next.js doesn't try to parse the file automatically
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse the form data using formidable
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

// Main handler function
export default async function handler(req = new NextApiRequest(), res = new NextApiResponse()) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Parse the incoming form data
    const { files } = await parseForm(req);

    // Assuming the uploaded file is named 'file' in the formData
    const uploadedFile = files.file;
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the uploaded file (it's stored temporarily by formidable)
    const filePath = uploadedFile.filepath;

    // Conversion logic: Here, you should add your logic to convert PDF to DOCX.
    // For example:
    const convertedFilePath = path.join(process.cwd(), 'public', '/scripts');
    // Replace the following line with your actual PDF-to-DOCX conversion logic.
    fs.copyFileSync(filePath, convertedFilePath); // For now, just copying the file as a placeholder

    // Send the converted DOCX file as a response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename="converted.docx"');
    res.status(200).send(fs.readFileSync(convertedFilePath));
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: 'Conversion failed' });
  }
}
