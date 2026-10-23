import fitz  # PyMuPDF
import os
import json
from PIL import Image
import io

doc = fitz.open("docs/source/BOGO-Profile.pdf")
print(f"Total pages: {len(doc)}")

text_by_page = {}
for i, page in enumerate(doc):
    text = page.get_text()
    text_by_page[i + 1] = text.strip()

with open("docs/bogo_extracted_text.json", "w", encoding="utf-8") as f:
    json.dump(text_by_page, f, indent=2, ensure_ascii=False)

print("Dumped extracted text to docs/bogo_extracted_text.json")

# Let's inspect page 1 to 31 summaries
for page_num in range(1, len(doc) + 1):
    first_line = text_by_page[page_num].split('\n')[0] if text_by_page[page_num] else "(empty)"
    print(f"Page {page_num}: {first_line[:80]}")
