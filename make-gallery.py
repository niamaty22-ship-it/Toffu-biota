
from pathlib import Path
import json

assets_dir = Path("assets")
output_file = Path("asset-list.json")

images = sorted(
    path.as_posix()
    for path in assets_dir.rglob("*")
    if path.is_file() and path.suffix.lower() == ".png"
)

output_file.write_text(
    json.dumps(images, indent=2),
    encoding="utf-8"
)

print(f"Found {len(images)} PNG images.")
print(f"Created {output_file}")
