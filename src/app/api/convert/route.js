import { PythonShell } from 'python-shell';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') { // Check if the request is POST
    const { pdfPath, wordPath } = req.body;

    if (!pdfPath || !wordPath) {
      return res.status(400).json({ error: 'PDF path and Word path are required' });
    }

    try {
      const scriptPath = path.join(process.cwd(), 'src', 'app', 'scripts', 'convert_pdf.py');

      if (!fs.existsSync(pdfPath)) {
        return res.status(400).json({ error: 'PDF file not found at specified path' });
      }

      const options = {
        pythonOptions: ['-u'],
        args: [pdfPath, wordPath],
      };

      PythonShell.run(scriptPath, options, function (err, results) {
        if (err) {
          console.error('Python script error:', err);
          return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ output: results });
      });
    } catch (error) {
      console.error('Handler error:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
