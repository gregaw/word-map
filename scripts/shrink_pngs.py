"""Shrink the screenshots to a 256-colour palette.

The maps are flat colours plus anti-aliased text, so a 256-colour palette looks
the same and makes the files about 60% smaller. Needs Pillow.

    python3 scripts/shrink_pngs.py screenshots
"""
import sys
from pathlib import Path

from PIL import Image


def shrink(path: Path) -> tuple[int, int]:
    """Re-save one PNG with a 256-colour palette; returns (bytes before, after)."""
    before = path.stat().st_size
    with Image.open(path) as im:
        if im.mode == "P":  # already shrunk
            return before, before
        small = im.convert("RGB").quantize(
            colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE
        )
    small.save(path, optimize=True)
    return before, path.stat().st_size


def main(folder: str) -> None:
    total_before = total_after = 0
    for png in sorted(Path(folder).rglob("*.png")):
        before, after = shrink(png)
        total_before += before
        total_after += after
    print(f"{total_before / 1e6:.1f} MB -> {total_after / 1e6:.1f} MB")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "screenshots")
