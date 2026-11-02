"""Restricted-environment-only UI harness.

Loads the real BEE UI and curriculum from disk into a browser page without network
navigation, replacing IndexedDB/localStorage with a volatile in-memory shim.
This can check DOM interactions, but NOT real browser persistence, HTTP or security.
Normal user/CI E2E must run against the real localhost server instead.
"""
from pathlib import Path
import base64
import re

FAKE_STORAGE = '''const drafts = new Map(); let progress = {lessons: [],checks: []};
export async function getDraft(scope,id) { return drafts.get(scope+':'+id)||null; }
export async function putDraft(scope,id,files,remoteVersion=0) {
  drafts.set(scope+':'+id,{files:{...files},remoteVersion}); return true;
}
export function getDemoProgress() { return structuredClone(progress); }
export function putDemoProgress(value) { progress=structuredClone(value); }
export async function removeDraft(scope,id) { drafts.delete(scope+':'+id); }
'''


def attach_inline_app(page, root: Path):
    module_cache = {}

    def module_data_url(filepath):
        filepath = filepath.resolve()
        if filepath in module_cache:
            return module_cache[filepath]
        source = FAKE_STORAGE if filepath.name == 'storage.js' else filepath.read_text(encoding='utf-8')
        if filepath.name == 'main.js':
            # Browser navigation is blocked in this execution environment,
            # including about:srcdoc. Replace ONLY the iframe element in this
            # temporary in-memory copy; never alter the distributed app code.
            source = re.sub(
                r'<iframe id="preview-frame".*?</iframe>',
                '<div id="preview-frame" aria-label="Offline test placeholder"></div>',
                source,
                flags=re.DOTALL,
            )
        def update_import(match):
            target = (filepath.parent / match.group(2)).resolve()
            if not target.is_relative_to(root.resolve()):
                raise ValueError('Import buiten projectmap')
            return match.group(1) + module_data_url(target) + match.group(3)
        source = re.sub(r'''(from\s+['"])(\.{1,2}/[^'"\n]+)(['"])''',update_import,source)
        value = 'data:text/javascript;base64,' + base64.b64encode(source.encode()).decode()
        module_cache[filepath] = value
        return value

    main = module_data_url(root / 'src/main.js')
    css = (root / 'assets/styles.css').read_text(encoding='utf-8')
    page.set_content(f'<!doctype html><html lang="nl"><head><style>{css}</style></head><body><div id="app"></div></body></html>')
    page.add_script_tag(type='module', content=f'import "{main}";')
