import sys
from pdf2docx import Converter

def convert_pdf_to_word(pdf_path, word_path):
    # Convert PDF to Word
    cv = Converter(pdf_path)
    cv.convert(word_path, start=0, end=None)
    cv.close()

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    word_path = sys.argv[2]
    convert_pdf_to_word(pdf_path, word_path)
