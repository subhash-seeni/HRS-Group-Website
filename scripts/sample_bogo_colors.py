import fitz
from PIL import Image
import os
import json

doc = fitz.open("docs/source/BOGO-Profile.pdf")

# We can find the drawings or sample pixels from each page render
# In PyMuPDF, page.get_drawings() gives exact RGB stroke and fill colors!
page_colors = {}

for p_num in range(10, 29):
    page = doc[p_num - 1]
    drawings = page.get_drawings()
    colors = set()
    for d in drawings:
        fill = d.get("fill")
        if fill and isinstance(fill, (list, tuple)) and len(fill) == 3:
            # ignore pure white, black, grey
            r, g, b = int(fill[0]*255), int(fill[1]*255), int(fill[2]*255)
            if not (r > 240 and g > 240 and b > 240) and not (r < 20 and g < 20 and b < 20) and not (abs(r-g) < 5 and abs(g-b) < 5):
                colors.add(f"#{r:02X}{g:02X}{b:02X}")
        color = d.get("color")
        if color and isinstance(color, (list, tuple)) and len(color) == 3:
            r, g, b = int(color[0]*255), int(color[1]*255), int(color[2]*255)
            if not (r > 240 and g > 240 and b > 240) and not (r < 20 and g < 20 and b < 20) and not (abs(r-g) < 5 and abs(g-b) < 5):
                colors.add(f"#{r:02X}{g:02X}{b:02X}")
    page_colors[p_num] = list(colors)

for p, cols in page_colors.items():
    print(f"Page {p}: {cols}")
