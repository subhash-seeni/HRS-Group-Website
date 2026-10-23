import os
import shutil

# Remove old files in src
if os.path.exists("src"):
    shutil.rmtree("src")
os.makedirs("src", exist_ok=True)

# Remove old test/verify scripts
for f in ["capture_phase3a.js", "verify_phase3b.js", "verify_phase4.js", "verify_phase5_qa.js"]:
    if os.path.exists(f):
        os.remove(f)

# Ensure public/brand exists
os.makedirs("public/brand", exist_ok=True)
os.makedirs("public/logos", exist_ok=True)
os.makedirs("public/bogo", exist_ok=True)

print("Cleaned up old source. src/ is fresh and ready.")
