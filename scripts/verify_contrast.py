# Script to verify WCAG 2.1 Contrast Ratios for all Hero, BOGO brand, and Sector panel colors

def srgb_to_linear(c):
    c = c / 255.0
    if c <= 0.04045:
        return c / 12.92
    else:
        return ((c + 0.055) / 1.055) ** 2.4

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def relative_luminance(hex_str):
    r, g, b = hex_to_rgb(hex_str)
    r_lin = srgb_to_linear(r)
    g_lin = srgb_to_linear(g)
    b_lin = srgb_to_linear(b)
    return 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin

def contrast_ratio(hex1, hex2):
    l1 = relative_luminance(hex1)
    l2 = relative_luminance(hex2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

hero_slides = [
    ('facades', '#0E0E10', '#FFFFFF', '#F58220', '#D1D5DB'),
    ('homes', '#A84325', '#FFFFFF', '#FFF1EC', '#FCE4DC'),
    ('masalas', '#D99400', '#0E0E10', '#1A0B00', '#281300'),
    ('brands', '#154D28', '#FFFFFF', '#D2F8DD', '#E2FBEA'),
    ('stays', '#0D565C', '#FFFFFF', '#D8FAFC', '#E6FBFC'),
    ('skills', '#274B76', '#FFFFFF', '#DCEBFC', '#EDF5FD'),
    ('retail', '#0F2A5C', '#FFFFFF', '#F58A33', '#D8E4F8'),
]

print("=== HERO SLIDES CONTRAST ===")
for word, bg, text, rolling, sub in hero_slides:
    cr_text = contrast_ratio(bg, text)
    cr_rolling = contrast_ratio(bg, rolling)
    cr_sub = contrast_ratio(bg, sub)
    print(f"Hero '{word}' (bg {bg}):")
    print(f"  - Heading text {text}: {cr_text:.2f}:1 -> {'PASS (AAA)' if cr_text >= 7 else 'PASS (AA)' if cr_text >= 4.5 else 'PASS (AA Large)' if cr_text >= 3.0 else 'FAIL'}")
    print(f"  - Rolling word {rolling}: {cr_rolling:.2f}:1 -> {'PASS (AAA)' if cr_rolling >= 7 else 'PASS (AA)' if cr_rolling >= 4.5 else 'PASS (AA Large)' if cr_rolling >= 3.0 else 'FAIL'}")
    print(f"  - Subhead {sub}: {cr_sub:.2f}:1 -> {'PASS (AAA)' if cr_sub >= 7 else 'PASS (AA)' if cr_sub >= 4.5 else 'FAIL'}")

bogo_brands = [
    ('BOGO Essentials', '#149395', '#FFFFFF'),
    ('BOGO Daily', '#EB7C20', '#FFFFFF'),
    ('BOGO Farms', '#02A04A', '#FFFFFF'),
    ('BOGO Superfoods', '#1E345F', '#FFFFFF'),
    ('BOGO Health', '#5C6C7B', '#FFFFFF'),
    ('BOGO Beauty', '#9E2C37', '#FFFFFF'),
    ('BOGO Luxe', '#6F357C', '#FFFFFF'),
    ('BOGO Divine', '#8B8937', '#0E0E10'), # Olive -> Dark text
    ('BOGO Paws', '#EB9C03', '#0E0E10'),   # Amber -> Dark text
    ('BOGO Play', '#EA5735', '#FFFFFF'),
    ('BOGO Classroom', '#294189', '#FFFFFF'),
]

print("\n=== BOGO 11 BRAND EXPLORER CONTRAST ===")
for name, bg, text in bogo_brands:
    cr = contrast_ratio(bg, text)
    status = 'PASS (AAA)' if cr >= 7 else 'PASS (AA)' if cr >= 4.5 else 'PASS (AA Large)' if cr >= 3.0 else 'FAIL'
    print(f"{name:16} (bg {bg}, text {text}): {cr:.2f}:1 -> {status}")

sectors = [
    ('Built Environment', '#1B5E38', '#FFFFFF'),
    ('Retail', '#0F2A5C', '#FFFFFF'),
    ('Food and Consumer', '#B45309', '#FFFFFF'),
    ('Hospitality and Leasing', '#273043', '#FFFFFF'),
    ('Services', '#991B1B', '#FFFFFF'),
]

print("\n=== SECTOR EXPANDING PANELS CONTRAST ===")
for name, bg, text in sectors:
    cr = contrast_ratio(bg, text)
    status = 'PASS (AAA)' if cr >= 7 else 'PASS (AA)' if cr >= 4.5 else 'PASS (AA Large)' if cr >= 3.0 else 'FAIL'
    print(f"{name:24} (bg {bg}, text {text}): {cr:.2f}:1 -> {status}")
