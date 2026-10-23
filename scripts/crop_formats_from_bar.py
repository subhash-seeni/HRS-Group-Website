from PIL import Image

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

fb = Image.open("public/bogo/formats_bar.png")

format_crops = [
    ("bogo-square", (120, 120, 520, 290)),
    ("bogo-bazaar", (620, 120, 930, 290)),
    ("bogo-mini", (1140, 120, 1460, 290)),
    ("bogo-go", (2100, 110, 2550, 280)),
]

for name, box in format_crops:
    crop = fb.crop(box)
    crop = make_white_transparent(crop)
    bbox = crop.getbbox()
    if bbox:
        crop = crop.crop(bbox)
        pad = 14
        new_im = Image.new("RGBA", (crop.width + pad*2, crop.height + pad*2), (255, 255, 255, 0))
        new_im.paste(crop, (pad, pad))
        new_im.save(f"public/bogo/logos/{name}.png")
        print(f"Saved public/bogo/logos/{name}.png ({new_im.size})")
