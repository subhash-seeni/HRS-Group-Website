import fitz
from PIL import Image
import os

doc = fitz.open("docs/source/BOGO-Profile.pdf")
os.makedirs("public/bogo/logos", exist_ok=True)

def make_white_transparent(img, threshold=245):
    img = img.convert("RGBA")
    datas = img.getdata()
    newData = []
    for item in datas:
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    img.putdata(newData)
    return img

# 1. Master BOGO from Page 31
p31 = doc[30]
pix31 = p31.get_pixmap(dpi=300)
img31 = Image.open(fitz.io.BytesIO(pix31.tobytes()))
# Center logo is around x: 1000-2500, y: 900-1400
w31, h31 = img31.size
crop31 = img31.crop((w31*0.3, h31*0.35, w31*0.7, h31*0.55))
crop31 = make_white_transparent(crop31)
bbox = crop31.getbbox()
if bbox:
    crop31 = crop31.crop(bbox)
    pad = 16
    master = Image.new("RGBA", (crop31.width + pad*2, crop31.height + pad*2), (255, 255, 255, 0))
    master.paste(crop31, (pad, pad))
    master.save("public/bogo/logos/bogo-master.png")
    print(f"Saved bogo-master.png ({master.size})")

# 2. Formats: Square, Bazaar, Mini, Go
# In Page 10, the logo is located between y: 1050 and 1280, x: 150 and 670 (at 300 dpi)
formats = [
    (10, "bogo-square", (150, 1050, 700, 1280)),
    (11, "bogo-bazaar", (150, 1050, 700, 1280)),
    (12, "bogo-mini", (150, 1050, 700, 1280)),
    (24, "bogo-go", (120, 950, 700, 1260)),
]

for p_num, name, box in formats:
    p = doc[p_num - 1]
    pix = p.get_pixmap(dpi=300)
    img = Image.open(fitz.io.BytesIO(pix.tobytes()))
    crop = img.crop(box)
    crop = make_white_transparent(crop)
    bbox = crop.getbbox()
    if bbox:
        crop = crop.crop(bbox)
        pad = 16
        new_im = Image.new("RGBA", (crop.width + pad*2, crop.height + pad*2), (255, 255, 255, 0))
        new_im.paste(crop, (pad, pad))
        new_im.save(f"public/bogo/logos/{name}.png")
        print(f"Saved {name}.png ({new_im.size})")
