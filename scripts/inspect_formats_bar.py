from PIL import Image

img8 = Image.open("public/bogo/page_8_300dpi.png")
# Formats row on page 8
formats_bar = img8.crop((300, 1050, 3200, 1500))
formats_bar.save("public/bogo/formats_bar.png")
print("Saved formats_bar.png")
