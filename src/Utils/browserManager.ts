import { chromium, Browser, Page ,BrowserContext} from '@playwright/test';

let browser: Browser;
let page: Page;
let context: BrowserContext;

export async function launchBrowser() {
  browser = await chromium.launch({ headless: true});
  context = await browser.newContext({
    recordVideo: { dir: 'reports/videos/' },
  });
  page = await context.newPage();
}

export async function closeBrowser() {
  await browser.close();
}

export { page };
