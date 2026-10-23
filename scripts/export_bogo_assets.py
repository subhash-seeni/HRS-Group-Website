import fitz
from PIL import Image
import os

doc = fitz.open("docs/source/BOGO-Profile.pdf")
os.makedirs("public/bogo/logos", exist_ok=True)
os.makedirs("public/bogo/stores", exist_ok=True)

# 1. Save store renders as webp
stores_map = {
    10: "bogo-square",
    11: "bogo-bazaar",
    12: "bogo-mini",
    13: "bogo-essentials",
    14: "bogo-daily",
    15: "bogo-farms",
    16: "bogo-superfoods",
    17: "bogo-health",
    18: "bogo-beauty",
    19: "bogo-luxe",
    20: "bogo-divine",
    21: "bogo-paws",
    22: "bogo-play",
    23: "bogo-classroom",
}

for p_num, name in stores_map.items():
    page = doc[p_num - 1]
    img_list = page.get_images()
    if img_list:
        xref = img_list[0][0]
        base_img = doc.extract_image(xref)
        img_bytes = base_img["image"]
        img = Image.open(fitz.io.BytesIO(img_bytes))
        dest = f"public/bogo/stores/{name}-concept.webp"
        img.save(dest, "WEBP", quality=85)
        print(f"Saved store render: {dest} ({img.size})")

# 2. Render Page 8 at 300 DPI (approx 3300x2300) to crop individual crisp logos
p8 = doc[7]
pix8 = p8.get_pixmap(dpi=300)
img8 = Image.open(fitz.io.BytesIO(pix8.tobytes()))
img8.save("public/bogo/page_8_300dpi.png")
print("Rendered Page 8 at 300 DPI:", img8.size)

# Also let's check Page 1 / Page 5 / Page 8 for Master BOGO logo
