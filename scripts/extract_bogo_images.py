import fitz  # PyMuPDF
import os
import io
from PIL import Image

output_dir = "public/bogo"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open("docs/source/BOGO-Profile.pdf")

image_inventory = []

for page_idx, page in enumerate(doc):
    page_num = page_idx + 1
    image_list = page.get_images(full=True)
    print(f"Page {page_num}: {len(image_list)} images")
    
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        width = base_image["width"]
        height = base_image["height"]
        
        # Save raw image
        filename = f"p{page_num}_{img_idx+1}_{width}x{height}.{image_ext}"
        filepath = os.path.join(output_dir, "raw", filename)
        os.makedirs(os.path.join(output_dir, "raw"), exist_ok=True)
        with open(filepath, "wb") as f:
            f.write(image_bytes)
            
        image_inventory.append({
            "page": page_num,
            "img_idx": img_idx,
            "width": width,
            "height": height,
            "ext": image_ext,
            "file": filename
        })

print(f"Extracted {len(image_inventory)} total raw images to public/bogo/raw/")
