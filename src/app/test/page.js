'use client';
import { useState } from 'react';

export default function ConvertPdfToWordComponent() {
  const [pdfFile, setPdfFile] = useState(null); // To store the uploaded PDF file
  const [wordPath, setWordPath] = useState(''); // New input for Word file path
  const [output, setOutput] = useState(''); // To display output messages

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const convertPdfToWord = async () => {
    if (!pdfFile) {
      alert('Please upload a PDF file first.');
      return;
    }

    if (!wordPath) {
      alert('Please specify a path to save the DOCX file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('pdfPath', pdfFile.name); // Using file name as pdfPath
    formData.append('wordPath', wordPath); // Specified path to save the DOCX file

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setOutput('Conversion Successful');
      } else {
        setOutput(`Error: ${data.error}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">PDF to Word Converter</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Specify output Word path (e.g., /tmp/output.docx)"
        value={wordPath}
        onChange={(e) => setWordPath(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      />
      <button
        onClick={convertPdfToWord}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Convert PDF to Word
      </button>
      <pre className="mt-4 text-red-500">{output}</pre>
    </div>
  );
}
