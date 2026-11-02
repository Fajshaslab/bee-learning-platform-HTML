"""BEE Learning Platform — Playwright browser acceptance tests.

From the project root:
  python -m pip install -r requirements-e2e.txt
  python -m playwright install chromium
  python -m unittest discover -s tests/e2e -p 'test_*.py' -v

Tests run against a disposable local webserver and isolated browser profiles.
Only the DEMO mode is tested here: no Supabase credentials are required.
"""
import json
import os
from pathlib import Path
import re
import socket
import subprocess
import time
import unittest
import urllib.request

from playwright.sync_api import sync_playwright, expect
from inline_harness import attach_inline_app

ROOT = Path(__file__).resolve().parents[2]
RESULTS = ROOT / 'test-results'


def curriculum():
    script = "import {modules} from './data/curriculum.js';console.log(JSON.stringify(modules))"
    proc = subprocess.run(
        ['node', '--input-type=module', '-e', script],
        cwd=ROOT, capture_output=True, text=True, encoding='utf-8', check=True,
    )
    return json.loads(proc.stdout)


def solution_for(lesson):
    example = lesson['guide']['example']
    if lesson['rule'].startswith('css:'):
        return {'html': lesson['initial']['html'], 'css': example, 'js': ''}
    if lesson['rule'].startswith('js:'):
        return {'html': lesson['initial']['html'], 'css': '', 'js': example}
    return {'html': example, 'css': '', 'js': ''}


class BeeBrowserJourney(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        RESULTS.mkdir(exist_ok=True)
        cls.modules = curriculum()
        # The local server deliberately exposes only public app assets.
        with socket.socket() as sock:
            sock.bind(('127.0.0.1', 0))
            port = sock.getsockname()[1]
        cls.base = f'http://127.0.0.1:{port}/'
        if not os.getenv('BEE_BROWSER_INLINE'):
            cls.server_log = (RESULTS / 'e2e-server.log').open('w', encoding='utf-8')
            cls.server = subprocess.Popen(
                ['node', 'scripts/serve.mjs'], cwd=ROOT,
                env={**os.environ, 'PORT': str(port)},
                stdout=cls.server_log, stderr=subprocess.STDOUT,
            )
            for attempt in range(60):
                try:
                    urllib.request.urlopen(cls.base, timeout=0.3).close()
                    break
                except Exception:
                    if cls.server.poll() is not None:
                        raise RuntimeError('BEE-webserver gestopt; zie test-results/e2e-server.log')
                    time.sleep(0.1)
            else:
                raise RuntimeError('Lokale BEE-webserver kon niet starten')
        cls.pw = sync_playwright().start()
        opts = {'headless': True}
        if os.getenv('BEE_CHROMIUM_EXECUTABLE'):
            opts['executable_path'] = os.environ['BEE_CHROMIUM_EXECUTABLE']
        cls.browser = cls.pw.chromium.launch(**opts)

    @classmethod
    def tearDownClass(cls):
        if hasattr(cls, 'browser'): cls.browser.close()
        if hasattr(cls, 'pw'): cls.pw.stop()
        if hasattr(cls, 'server'):
            cls.server.terminate()
            try: cls.server.wait(timeout=3)
            except subprocess.TimeoutExpired: cls.server.kill()
        if hasattr(cls, 'server_log'): cls.server_log.close()

    def setUp(self):
        self.context = self.browser.new_context(accept_downloads=True, viewport={'width': 1365, 'height': 900})
        self.page = self.context.new_page()
        self.errors = []
        self.page.on('pageerror', lambda exc: self.errors.append(str(exc)))
        if os.getenv('BEE_BROWSER_INLINE'):
            attach_inline_app(self.page, ROOT)
        else:
            self.page.goto(self.base + '#/login', wait_until='domcontentloaded')
        expect(self.page.locator('h1')).to_have_text('Inloggen')

    def tearDown(self):
        if self._outcome and self._outcome.result and any(error for _, error in self._outcome.result.errors + self._outcome.result.failures):
            try: self.page.screenshot(path=str(RESULTS / f'{self._testMethodName}.png'), full_page=True)
            except Exception: pass
        self.context.close()

    def start_demo(self):
        self.page.locator('[data-action="start-demo"]').click()
        expect(self.page.locator('h1')).to_have_text('Dashboard')

    def open_hash(self, route):
        self.page.evaluate('(route) => { location.hash = route }', f'#/{route}')

    def test_01_guest_cannot_open_dashboard_or_locked_lesson(self):
        self.open_hash('dashboard')
        expect(self.page.locator('h1')).to_have_text('Inloggen')
        self.start_demo()
        self.open_hash('lesson/m8-l1')
        expect(self.page.locator('h1')).to_have_text('Les vergrendeld')
        self.open_hash('check/m1')
        expect(self.page.locator('h1')).to_have_text('Modulecheck nog niet beschikbaar')
        self.open_hash('complete')
        expect(self.page.get_by_role('heading', name='Je bent nog onderweg')).to_be_visible()

    def test_02_html_preview_blocks_javascript_and_code_is_local(self):
        self.start_demo()
        self.open_hash('lesson/m1-l1')
        expect(self.page.get_by_role('heading', name='Hoe werkt een website?')).to_be_visible()
        expect(self.page.get_by_text('EERST BEGRIJPEN, DAN OEFENEN')).to_be_visible()
        self.page.locator('#editor').fill('<h1>Hallo</h1><p>Ik leer HTML</p><script>parent.document.body.dataset.hacked="yes"</script>')
        expect(self.page.locator('#preview-frame')).to_be_visible()
        self.page.wait_for_timeout(400)
        self.assertIsNone(self.page.locator('body').get_attribute('data-hacked'))
        if not os.getenv('BEE_BROWSER_INLINE'):
            self.assertEqual(self.page.locator('#preview-frame').get_attribute('sandbox'), '')
        self.page.locator('[data-action="check-code"]').click()
        expect(self.page.locator('#feedback')).to_contain_text('De vereiste code-onderdelen zijn gevonden.')
        self.page.locator('[data-action="save-draft"]').click()
        expect(self.page.locator('#save-indicator')).to_contain_text('lokaal opgeslagen', ignore_case=True)
        if os.getenv('BEE_BROWSER_INLINE'):
            # Volatile shim supports route changes, not real browser persistence.
            self.open_hash('modules')
        else:
            self.page.reload()
            self.page.locator('[data-action="start-demo"]').click()
        self.open_hash('lesson/m1-l1')
        expect(self.page.locator('#editor')).to_have_value(re.compile('Ik leer HTML'))
        self.assertFalse(self.errors, self.errors)

    def test_03_draft_export_reset_and_import(self):
        self.start_demo()
        self.open_hash('lesson/m1-l1')
        expect(self.page.locator('#editor')).to_be_visible()
        self.page.locator('#editor').fill('<h1>Bewaar mij</h1><p>Exporttest</p>')
        with self.page.expect_download() as info:
            self.page.locator('[data-action="export"]').click()
        download = info.value
        export_path = RESULTS / 'bee-example-export.json'
        download.save_as(export_path)
        data = json.loads(export_path.read_text(encoding='utf-8'))
        self.assertEqual(data['lessonId'], 'm1-l1')
        self.assertEqual(data['html'], '<h1>Bewaar mij</h1><p>Exporttest</p>')
        self.page.on('dialog', lambda dialog: dialog.accept())
        self.page.locator('[data-action="reset-draft"]').click()
        expect(self.page.locator('#editor')).not_to_have_value(re.compile('Bewaar mij'))
        self.page.locator('#import-file').set_input_files(str(export_path))
        expect(self.page.locator('#editor')).to_have_value(re.compile('Bewaar mij'))
        self.assertFalse(self.errors, self.errors)

    def test_04_full_40_lessons_and_8_module_checks(self):
        self.start_demo()
        completed_lessons = 0
        for mod in self.modules:
            for lesson in mod['lessons']:
                self.open_hash(f'lesson/{lesson["id"]}')
                expect(self.page.locator('h1')).to_have_text(lesson['title'], timeout=10000)
                expect(self.page.locator('.guide-code')).to_be_visible()
                self.assertTrue(self.page.evaluate("document.querySelector('.guided-learning').compareDocumentPosition(document.querySelector('.assignment')) & Node.DOCUMENT_POSITION_FOLLOWING ? true : false"), f'Uitleg volgt na opdracht: {lesson["id"]}')
                self.assertGreaterEqual(self.page.locator('.guide-steps li').count(), 3)
                code = solution_for(lesson)
                if lesson['rule'].startswith('css:'): file_type='css'
                elif lesson['rule'].startswith('js:'): file_type='js'
                else: file_type='html'
                # Een beginner landt direct in het juiste bestand.
                expect(self.page.locator(f'[data-action="tab"][data-tab="{file_type}"]')).to_have_attribute('aria-pressed', 'true')
                self.page.locator(f'[data-action="tab"][data-tab="{file_type}"]').click()
                self.page.locator('#editor').fill(code[file_type])
                self.page.locator('[data-action="check-code"]').click()
                expect(self.page.locator('#feedback')).to_contain_text('De vereiste code-onderdelen zijn gevonden.')
                self.page.locator('[data-action="complete-lesson"]').click()
                expect(self.page.locator('.status.completed')).to_contain_text('Les afgerond')
                completed_lessons += 1
            self.open_hash(f'check/{mod["id"]}')
            expect(self.page.locator('h1')).to_contain_text('Modulecheck')
            self.assertEqual(self.page.locator('#check-form fieldset').count(), 5)
            # A complete but incorrect submission must not grant progress.
            if mod['number'] == 1:
                for q in mod['check']:
                    wrong = (q['answer'] + 1) % len(q['options'])
                    self.page.locator(f'input[name="{q["id"]}"][value="{wrong}"]').check()
                self.page.locator('#check-form button[type="submit"]').click()
                expect(self.page.locator('#global-message')).to_contain_text('Nog niet alle antwoorden')
                expect(self.page.locator('#check-form')).to_be_visible()
            for q in mod['check']:
                self.page.locator(f'input[name="{q["id"]}"][value="{q["answer"]}"]').check()
            self.page.locator('#check-form button[type="submit"]').click()
            expect(self.page.get_by_text('Deze modulecheck is al afgerond.')).to_be_visible()
        self.assertEqual(completed_lessons, 40)
        self.open_hash('dashboard')
        expect(self.page.locator('[role="progressbar"]')).to_have_attribute('aria-valuenow','100')
        self.open_hash('complete')
        expect(self.page.get_by_role('heading', name='Alle acht modules afgerond')).to_be_visible()
        self.assertFalse(self.errors, self.errors)

    def test_06_beginners_navigatie_feedback_en_reset_blijft_opgeslagen(self):
        self.start_demo()
        self.open_hash('lesson/m1-l1')
        expect(self.page.locator('.lesson-intro-bar')).to_contain_text('Les 1 van 40')
        expect(self.page.locator('#practice-assignment')).to_contain_text('index.html')
        self.page.locator('[data-action="go-practice"]').click()
        expect(self.page.locator('#practice-assignment')).to_be_focused()
        self.page.locator('#editor').fill('<h1>Hallo</h1>')
        self.page.locator('[data-action="check-code"]').click()
        expect(self.page.locator('#feedback')).to_contain_text('<p>')
        expect(self.page.locator('#feedback')).to_have_class(re.compile('error'))
        self.page.locator('#editor').fill('<h1>Gewijzigde kop</h1><p>Gewijzigde tekst</p>')
        self.page.on('dialog', lambda dialog: dialog.accept())
        self.page.locator('[data-action="reset-draft"]').click()
        expect(self.page.locator('#editor')).to_have_value('<h1>Mijn eerste website</h1>')
        expect(self.page.locator('#global-message')).to_contain_text('Begincode lokaal opgeslagen')
        self.open_hash('modules')
        expect(self.page.locator('h1')).to_have_text('Moduleoverzicht')
        self.open_hash('lesson/m1-l1')
        expect(self.page.locator('#editor')).to_have_value('<h1>Mijn eerste website</h1>')
        self.assertFalse(self.errors, self.errors)

    def test_05_mobile_has_no_document_overflow(self):
        self.context.close()
        self.context = self.browser.new_context(viewport={'width': 320, 'height': 720})
        self.page = self.context.new_page()
        if os.getenv('BEE_BROWSER_INLINE'):
            attach_inline_app(self.page, ROOT)
        else:
            self.page.goto(self.base + '#/login')
        self.start_demo()
        for route in ['dashboard', 'modules', 'lesson/m1-l1']:
            self.open_hash(route)
            expect(self.page.locator('h1')).to_be_visible()
            if route.startswith('lesson/'): expect(self.page.locator('#editor')).to_be_visible()
            size = self.page.evaluate('({width:document.documentElement.scrollWidth, viewport:innerWidth})')
            self.assertLessEqual(size['width'],size['viewport']+1,f'Overflow op {route}: {size}')


if __name__ == '__main__':
    unittest.main(verbosity=2)
