"""Executable JavaScript sandbox checks, without localhost or Supabase.
This verifies console, errors, interactive DOM, worker timeouts and data containment.
Separate full-journey E2E tests verify the real sandboxed iframe in GitHub Actions.
"""
import unittest
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]


class JavaScriptSandboxBrowser(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pw = sync_playwright().start()
        opts = {'headless': True}
        if os.getenv('BEE_CHROMIUM_EXECUTABLE'):
            opts['executable_path'] = os.environ['BEE_CHROMIUM_EXECUTABLE']
        cls.browser = cls.pw.chromium.launch(**opts)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.pw.stop()

    def setUp(self):
        self.page = self.browser.new_page()
        self.page.set_content((ROOT / 'sandbox.html').read_text(encoding='utf-8'))
        self.page.evaluate('''() => {
          window.beeOutput = [];
          addEventListener('message', e => {
            if (e.data?.type === 'bee-js-result') window.beeOutput.push(e.data);
          });
        }''')

    def tearDown(self):
        self.page.close()

    def run_code(self, js, mode='worker', html='<h1>Oefening</h1>'):
        self.page.evaluate('''data => window.postMessage(data,'*')''', {
            'type': 'bee-run', 'id': 'test-run', 'mode': mode,
            'html': html, 'css': '', 'js': js,
        })

    def wait_for(self, kind):
        self.page.wait_for_function(
            '(kind) => window.beeOutput.some(item => item.kind === kind)', arg=kind, timeout=7000)
        return self.page.evaluate('window.beeOutput')

    def test_console_value_visible(self):
        self.run_code('const som = 2 + 3; console.log("som:", som)')
        logs = self.wait_for('done')
        self.assertTrue(any(o['kind']=='log' and o['text']=='som: 5' for o in logs), logs)

    def test_syntax_error_visible(self):
        self.run_code('const = ;')
        logs = self.wait_for('done')
        self.assertTrue(any(o['kind']=='error' and 'SyntaxError' in o['text'] for o in logs),logs)

    def test_infinite_loop_worker_is_stopped(self):
        self.run_code('while(true) {}')
        logs = self.wait_for('done')
        self.assertTrue(any(o['kind']=='error' and '3 seconden' in o['text'] for o in logs),logs)

    def test_dom_event_click(self):
        self.run_code('''const knop=document.querySelector("button");
          knop.addEventListener("click",()=>console.log("Geklikt!"));''',mode='dom',html='<button>Klik</button>')
        self.wait_for('done')
        self.page.locator('button').click()
        self.page.wait_for_function('window.beeOutput.some(o=>o.text==="Geklikt!")')

    def test_script_tag_in_html_does_not_run(self):
        self.run_code('console.log("veilig")',mode='dom',html='<script>document.body.dataset.injected="yes"</script><h1>Hoi</h1>')
        self.wait_for('done')
        self.assertIsNone(self.page.locator('body').get_attribute('data-injected'))


if __name__ == '__main__':
    unittest.main()
