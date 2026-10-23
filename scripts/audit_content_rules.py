import os
import re

banned_words = [
    'unlock', 'elevate', 'empower', 'seamless', 'cutting-edge', 'state-of-the-art',
    'innovative', 'leverage', 'robust', 'holistic', 'synergy', 'journey',
    'world-class', 'next-generation', 'end-to-end', 'passionate'
]
banned_phrases = ['not just', 'where .* meets']
forbidden_entities = ['firstgen qsr', 'quantum build', 'redevelopment']

hits = []
src_dir = 'src'

# Regex for string literals containing ! or em dash
string_pattern = re.compile(r'(["\'`])(?:(?=(\\?))\2.)*?\1')

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.ts', '.tsx', '.css')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()

            # Check full content for em dashes
            if '—' in content:
                for idx, line in enumerate(content.splitlines(), 1):
                    if '—' in line:
                        hits.append((path, idx, 'Em dash detected', line.strip()))

            # Check string literals for exclamation marks and banned words
            for match in string_pattern.finditer(content):
                val = match.group(0)
                # Ignore tailwind !important like !important or !isHydrated or className="... !opacity-100 ..."
                if '!' in val and not re.search(r'!\s*[a-zA-Z0-9_\-\[\]]+', val):
                    # compute line number
                    line_no = content[:match.start()].count('\n') + 1
                    hits.append((path, line_no, f'Exclamation in literal: {val}', val))

                for bw in banned_words:
                    if re.search(r'\b' + re.escape(bw) + r'\b', val, re.IGNORECASE):
                        line_no = content[:match.start()].count('\n') + 1
                        hits.append((path, line_no, f'Banned word "{bw}" in literal: {val}', val))

                for bp in banned_phrases:
                    if re.search(bp, val, re.IGNORECASE):
                        line_no = content[:match.start()].count('\n') + 1
                        hits.append((path, line_no, f'Banned phrase "{bp}" in literal: {val}', val))

                for fe in forbidden_entities:
                    if re.search(r'\b' + re.escape(fe) + r'\b', val, re.IGNORECASE):
                        line_no = content[:match.start()].count('\n') + 1
                        hits.append((path, line_no, f'Forbidden entity "{fe}" in literal: {val}', val))

print(f"Total violations found: {len(hits)}")
for h in hits:
    print(f"{h[0]}:{h[1]} [{h[2]}] -> {h[3][:80]}")
