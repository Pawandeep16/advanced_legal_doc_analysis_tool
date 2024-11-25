import pytesseract
from PIL import Image
from docx import Document

# Set the path to Tesseract OCR executable
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text_to_docx(image_path, docx_path):
    try:
        # Step 1: Extract text from the image
        image = Image.open(image_path)
        extracted_text = pytesseract.image_to_string(image)
        print("Extracted Text:", extracted_text)

        # Step 2: Save the extracted text to a DOCX file
        document = Document()
        document.add_paragraph(extracted_text)
        document.save(docx_path)
        print(f"Extracted text saved to {docx_path}")

    except Exception as e:
        print(f"Error: {e}")

# Example usage
if __name__ == "__main__":
    image_path = r"D:\Notes\Loyalist College\StudyMaterial\AIP\Workspace\doc-analysis-tool\scripts\sample_image.jpg"  # Replace with your image path
    docx_path = r"D:\Notes\Loyalist College\StudyMaterial\AIP\Workspace\doc-analysis-tool\scripts\extracted_text.docx"  # Replace with your desired output DOCX path
    
    extract_text_to_docx(image_path, docx_path)
