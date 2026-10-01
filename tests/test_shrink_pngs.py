"""Run with: python3 -m pytest tests/test_shrink_pngs.py (needs Pillow)."""
import sys
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
from shrink_pngs import shrink  # noqa: E402


def test_shrink_palettises_and_keeps_colours(tmp_path):
    png = tmp_path / "map.png"
    im = Image.new("RGB", (200, 100), (223, 233, 240))
    im.paste((215, 48, 31), (20, 20, 120, 80))  # a "red" country
    im.save(png)
    before, after = shrink(png)
    with Image.open(png) as out:
        assert out.mode == "P"
        assert out.size == (200, 100)
        assert out.convert("RGB").getpixel((50, 50)) == (215, 48, 31)
        assert out.convert("RGB").getpixel((5, 5)) == (223, 233, 240)
    assert after <= before


def test_shrink_is_idempotent(tmp_path):
    png = tmp_path / "map.png"
    Image.new("RGB", (10, 10), (1, 2, 3)).save(png)
    shrink(png)
    size = png.stat().st_size
    assert shrink(png) == (size, size)
