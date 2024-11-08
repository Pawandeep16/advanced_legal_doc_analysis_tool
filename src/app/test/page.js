'use client';
import axios from 'axios';
import React, { useState } from 'react';

function Page() {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setDownloadLink(null); // Reset download link on new file upload
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }

    setIsConverting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/convert', formData, {
        responseType: 'blob', // Important for handling file downloads
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Create a URL for the converted file and set it for download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("An error occurred during the conversion. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  // Cleanup URL to prevent memory leaks when component unmounts or download is reset
  React.useEffect(() => {
    return () => {
      if (downloadLink) {
        window.URL.revokeObjectURL(downloadLink);
      }
    };
  }, [downloadLink]);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>PDF to Word Converter</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      
      <button 
        onClick={handleConvert} 
        disabled={!file || isConverting}
        style={{ marginTop: '10px', padding: '10px 20px', cursor: isConverting ? 'not-allowed' : 'pointer' }}
      >
        {isConverting ? 'Converting...' : 'Convert to DOCX'}
      </button>

      {downloadLink && (
        <div style={{ marginTop: '20px' }}>
          <a href={downloadLink} download="converted.docx">
            Download Converted DOCX
          </a>
        </div>
      )}
    </div>
  );
}

export default Page;
