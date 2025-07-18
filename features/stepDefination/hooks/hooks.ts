import { Before,After,Status, context } from '@cucumber/cucumber';
import { closeBrowser, launchBrowser, page } from '../../../src/Utils/browserManager';
import path from 'path';

/**
 * Before Hook: Runs before any scenario tagged with @ui
 * Description:
 *   Launches the browser before executing UI-based test scenarios.
 */
Before({ tags: "@ui" }, async function () {
  await launchBrowser();
});


/**
 * After Hook: Runs after any scenario tagged with @ui
 * Description:
 *   Take screenshot and video and attached it to html report
 *   Close the browser after executing UI-based test scenarios.
 *   This ensures a clean browser session for each relevant test.
 */
After({ tags: "@ui" },async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await page.screenshot();
    await this.attach(screenshot, 'image/png'); 
  }
  const video = page?.video();
  if (page) await page.close();
  await closeBrowser()

  if (video) {
    const videoPath = await video.path();
    const videoFileName = path.basename(videoPath);
    const correctRelativePath = `videos/${videoFileName}`;
    await this.attach(
      `<a href="${correctRelativePath}" target="_blank">🎬 Watch Video</a>`,
      'text/html'
    );
  }
});