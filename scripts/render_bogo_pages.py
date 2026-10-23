import fitz
import os
from PIL import Image

doc = fitz.open("docs/source/BOGO-Profile.pdf")
os.makedirs("public/bogo/page_renders", exist_ok=True)

# Render each page to an image so we can inspect layout, colors, and logos accurately
for i in range(len(doc)):
    page = doc[i]
    pix = page.get_pixmap(dpi=150)
    pix.save(f"public/bogo/page_renders/page_{i+1:02d}.png")

print("Rendered all 31 pages to public/bogo/page_renders/")
