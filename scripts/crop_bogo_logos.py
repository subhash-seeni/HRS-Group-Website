import fitz
from PIL import Image
import os

doc = fitz.open("docs/source/BOGO-Profile.pdf")
os.makedirs("public/bogo/logos", exist_ok=True)

# Function to make white background transparent
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

# Let's inspect Page 8 at 300 dpi (3508 x 2481)
img8 = Image.open("public/bogo/page_8_300dpi.png")
w, h = img8.size

# Master BOGO:
# Box around middle top: x: 1300 to 2200, y: 500 to 750
master = img8.crop((1400, 500, 2100, 750))
master = make_white_transparent(master)
master.save("public/bogo/logos/bogo-master.png")

# Formats:
# BOGO Square: p8 around x: 380-750, y: 1100-1400
sq = img8.crop((380, 1100, 770, 1400))
sq = make_white_transparent(sq)
sq.save("public/bogo/logos/bogo-square.png")

# BOGO Bazaar: p8 around x: 880-1280, y: 1100-1400
bz = img8.crop((880, 1100, 1280, 1400))
bz = make_white_transparent(bz)
bz.save("public/bogo/logos/bogo-bazaar.png")

# BOGO Mini: p8 around x: 1380-1780, y: 1100-1400
mn = img8.crop((1380, 1100, 1780, 1400))
mn = make_white_transparent(mn)
mn.save("public/bogo/logos/bogo-mini.png")

# BOGO Go: p8 around x: 2300-2800, y: 1100-1400
go = img8.crop((2300, 1100, 2760, 1400))
go = make_white_transparent(go)
go.save("public/bogo/logos/bogo-go.png")

# Also on individual pages (10, 11, 12, 13-23), we can get the large primary logos!
# Let's render individual pages 10 to 28 at 300 DPI to get the high-res standalone logos
brands = [
    (10, "bogo-square-large", (140, 1000, 700, 1350)),
    (11, "bogo-bazaar-large", (140, 1000, 700, 1350)),
    (12, "bogo-mini-large", (140, 1000, 700, 1350)),
    (13, "bogo-essentials", (140, 1000, 800, 1350)),
    (14, "bogo-daily", (140, 1000, 800, 1350)),
    (15, "bogo-farms", (140, 1000, 800, 1350)),
    (16, "bogo-superfoods", (140, 1000, 800, 1350)),
    (17, "bogo-health", (140, 1000, 800, 1350)),
    (18, "bogo-beauty", (140, 1000, 800, 1350)),
    (19, "bogo-luxe", (140, 1000, 800, 1350)),
    (20, "bogo-divine", (140, 1000, 800, 1350)),
    (21, "bogo-paws", (140, 1000, 800, 1350)),
    (22, "bogo-play", (140, 1000, 800, 1350)),
    (23, "bogo-classroom", (140, 1000, 800, 1350)),
    (24, "bogo-go-large", (140, 950, 800, 1350)),
    (25, "bogo-life", (140, 950, 800, 1350)),
    (26, "bogo-partner", (140, 950, 800, 1350)),
    (27, "bogo-companion", (80, 80, 1000, 500)),
    (28, "bogo-affairs", (80, 80, 1000, 500)),
]

for p_num, b_name, crop_box in brands:
    p = doc[p_num - 1]
    pix = p.get_pixmap(dpi=300)
    img = Image.open(fitz.io.BytesIO(pix.tobytes()))
    # Let's check bbox
    cropped = img.crop(crop_box)
    cropped = make_white_transparent(cropped)
    # Autocrop transparent borders
    bbox = cropped.getbbox()
    if bbox:
        cropped = cropped.crop(bbox)
        # Add 10px padding
        pad = 12
        new_im = Image.new("RGBA", (cropped.width + pad*2, cropped.height + pad*2), (255, 255, 255, 0))
        new_im.paste(cropped, (pad, pad))
        new_im.save(f"public/bogo/logos/{b_name}.png")
        print(f"Saved logo: public/bogo/logos/{b_name}.png ({new_im.size})")

print("Done extracting logos!")
