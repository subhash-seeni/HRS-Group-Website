import json

with open("docs/bogo_extracted_text.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

with open("docs/bogo_summary.txt", "w", encoding="utf-8") as out:
    for p, txt in pages.items():
        out.write(f"\n==================== PAGE {p} ====================\n")
        lines = [l.strip() for l in txt.split("\n") if l.strip()]
        for l in lines:
            out.write(f"{l}\n")

print("Wrote docs/bogo_summary.txt successfully")
