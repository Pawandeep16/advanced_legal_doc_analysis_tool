import multer from "multer";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const upload = multer({ storage: multer.memoryStorage() });

const execPromise = promisify(exec);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  upload.single("file")(req, res, async (err) => {
    if (err)
      return res
        .status(500)
        .json({ errorCode: 1, errorText: "Error uploading file" });

    const { buffer, originalname } = req.file;

    // Save the uploaded PDF file to a temporary location
    const pdfFilePath = path.join("/tmp", originalname);
    const docxFilePath = path.join(
      "/tmp",
      `${path.parse(originalname).name}.docx`
    );

    try {
      // Save the PDF buffer to the filesystem
      require("fs").writeFileSync(pdfFilePath, buffer);

      // Command to convert PDF to DOCX using LibreOffice
      const command = `libreoffice --headless --convert-to docx "${pdfFilePath}" --outdir "/tmp"`;
      await execPromise(command);

      // Return the converted file name
      res
        .status(200)
        .json({ errorCode: 0, fileNameResult: path.basename(docxFilePath) });
    } catch (error) {
      console.error("Error converting PDF to DOCX:", error.message);
      res
        .status(500)
        .json({ errorCode: 1, errorText: "Error converting file" });
    } finally {
      // Clean up: Optionally delete the temp files
      require("fs").unlinkSync(pdfFilePath);
      require("fs").unlinkSync(docxFilePath);
    }
  });
}
