"""Build the shareable, dependency-free index from editable local sources."""
from pathlib import Path
from urllib.parse import quote
import base64
import re

ROOT = Path(__file__).resolve().parent
ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>'
CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>'
MESSAGE = 'Hola Victoria, encontré tu página web y quisiera consultar por la atención psicológica.'
WHATSAPP = 'https://wa.me/5493515507202?text=' + quote(MESSAGE)

def data_uri(path: str) -> str:
    mime = {'.webp':'image/webp', '.svg':'image/svg+xml', '.ttf':'font/ttf'}[Path(path).suffix]
    return 'data:' + mime + ';base64,' + base64.b64encode((ROOT / path).read_bytes()).decode()

html = (ROOT / 'index.source.html').read_text()
html = html.replace('{{WHATSAPP}}', WHATSAPP).replace('{{ARROW}}', ARROW).replace('{{CLOSE}}', CLOSE)
css = (ROOT / 'styles.css').read_text()
css = re.sub(r"url\('(assets/[^']+)'\)", lambda m: "url('" + data_uri(m[1]) + "')", css)
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + css + '\n</style>')
html = html.replace('<script src="script.js"></script>', '<script>\n' + (ROOT / 'script.js').read_text() + '\n</script>')
# Keep OG URLs as relative web assets; embed visible images and favicon for local preview.
html = re.sub(r'(src|href)="(assets/[^\"]+)"', lambda m: m[1] + '="' + data_uri(m[2]) + '"', html)
(ROOT / 'index.html').write_text(html)
print(f'Built index.html ({len(html.encode()):,} bytes); no external runtime dependencies.')
