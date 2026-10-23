from PIL import Image
import os

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

cat_img = Image.open("public/bogo/cat_bar.png")
# We only want the logos below the top banner (y from 100 to 290)
# Let's inspect vertical lines
w, h = cat_img.size

# Names in order:
cat_names = [
    "bogo-essentials",
    "bogo-daily",
    "bogo-farms",
    "bogo-superfoods",
    "bogo-paws",
    "bogo-beauty",
    "bogo-luxe",
    "bogo-play",
    "bogo-classroom",
    "bogo-divine",
    "bogo-health"
]

# Total width 2860. The outer border starts around x: 50, ends around x: 2810.
# Let's calculate slot width: (2810 - 50) / 11 = 250.9px
start_x = 50
slot_w = (2810 - 50) / 11

for i, name in enumerate(cat_names):
    x1 = int(start_x + i * slot_w + 5)
    x2 = int(start_x + (i + 1) * slot_w - 5)
    y1 = 90
    y2 = h - 10
    crop = cat_img.crop((x1, y1, x2, y2))
    crop = make_white_transparent(crop)
    bbox = crop.getbbox()
    if bbox:
        crop = crop.crop(bbox)
        # Pad 10px
        pad = 12
        new_im = Image.new("RGBA", (crop.width + pad*2, crop.height + pad*2), (255, 255, 255, 0))
        new_im.paste(crop, (pad, pad))
        new_im.save(f"public/bogo/logos/{name}.png")
        print(f"Saved {name}.png ({new_im.size})")

# Programs
prog_img = Image.open("public/bogo/prog_bar.png")
pw, ph = prog_img.size
prog_names = [
    "bogo-life",
    "bogo-companion",
    "bogo-affairs",
    "bogo-partner"
]

p_start_x = 100
p_slot_w = (pw - 200) / 4

for i, name in enumerate(prog_names):
    x1 = int(p_start_x + i * p_slot_w + 10)
    x2 = int(p_start_x + (i + 1) * p_slot_w - 10)
    y1 = 80
    y2 = ph - 10
    crop = prog_img.crop((x1, y1, x2, y2))
    crop = make_white_transparent(crop)
    bbox = crop.getbbox()
    if bbox:
        crop = crop.crop(bbox)
        pad = 12
        new_im = Image.new("RGBA", (crop.width + pad*2, crop.height + pad*2), (255, 255, 255, 0))
        new_im.paste(crop, (pad, pad))
        new_im.save(f"public/bogo/logos/{name}.png")
        print(f"Saved {name}.png ({new_im.size})")
