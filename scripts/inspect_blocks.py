import fitz

doc = fitz.open("docs/source/BOGO-Profile.pdf")

pages_to_check = [6, 7, 8, 9, 25, 26, 27, 28, 29, 30]

for p_num in pages_to_check:
    page = doc[p_num - 1]
    blocks = page.get_text("blocks")
    print(f"=== PAGE {p_num} (blocks: {len(blocks)}) ===")
    for b in blocks:
        text = b[4].strip().replace("\n", " ")
        if text:
            print(f"  [{b[0]:.0f},{b[1]:.0f}] {text[:100]}")
