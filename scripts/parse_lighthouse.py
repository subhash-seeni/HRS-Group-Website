import json

with open('lighthouse_mobile.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

cats = data.get('categories', {})
print("=== LIGHTHOUSE MOBILE AUDIT RESULTS ===")
for k, v in cats.items():
    print(f"{v['title']}: {int(round(v['score'] * 100))}")

# Check specific audits
audits = data.get('audits', {})
print("\n--- Key Metrics ---")
for m in ['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time']:
    if m in audits:
        print(f"{audits[m]['title']}: {audits[m].get('displayValue', audits[m].get('score'))}")
