from PIL import Image

img8 = Image.open("public/bogo/page_8_300dpi.png")
w, h = img8.size
print(f"Page 8 dimensions: {w} x {h}")

# The category brands row is in the box titled "CATEGORY BRANDS"
# Around y: 1750 to 2050 (out of 2481)
# Across x: 350 to 3150
# Let's crop the category brands container to inspect it
cat_bar = img8.crop((320, 1720, 3180, 2020))
cat_bar.save("public/bogo/cat_bar.png")
print("Saved cat_bar.png")

# Also programs bar
prog_bar = img8.crop((320, 2080, 3180, 2330))
prog_bar.save("public/bogo/prog_bar.png")
print("Saved prog_bar.png")
