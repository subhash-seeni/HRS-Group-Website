import os

os.makedirs("public/logos", exist_ok=True)

logos = {
    "hrs-group": ("HRS", "GROUP", "#F58220"),
    "hrishikesh-ventures": ("HRISHIKESH", "VENTURES", "#207543"),
    "hrs-aluglaze": ("HRS", "ALUGLAZE", "#15852C"),
    "geotrix": ("GEOTRIX", "FACADES", "#0E4EB8"),
    "school-of-facade-technologies": ("SoFT", "FACADE TECH", "#149395"),
    "hrishikesh-food-products": ("HRISHIKESH", "FOODS", "#EB7C20"),
    "hrishikesh-consumer-products": ("HRISHIKESH", "CONSUMER", "#DF2B6B"),
    "firstgen": ("FIRSTGEN", "HOLDINGS", "#13477A"),
    "firstgen-assets": ("FIRSTGEN", "ASSETS", "#1B2754"),
    "firstgen-hotels": ("FIRSTGEN", "HOTELS", "#BD5B21"),
    "firstgen-enterprises": ("FIRSTGEN", "ENTERPRISES", "#227B92"),
    "indian-brand-house": ("INDIAN", "BRAND HOUSE", "#EA5735"),
}

for slug, (primary, secondary, accent) in logos.items():
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="100%" height="100%" fill="none">
  <rect x="0" y="0" width="320" height="80" rx="8" fill="transparent" />
  <circle cx="24" cy="40" r="10" fill="{accent}" />
  <text x="44" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="800" letter-spacing="-0.03em" fill="currentColor">{primary}</text>
  <text x="44" y="62" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="600" letter-spacing="0.1em" fill="currentColor" opacity="0.65">{secondary}</text>
</svg>'''
    with open(f"public/logos/{slug}.svg", "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Generated public/logos/{slug}.svg")

print("All entity wordmark SVGs generated successfully.")
