import { When, Given, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';
import { UploadPage } from '../../../src/UIHelper/PageObject/uploadPage';
import { config } from '../../../src/config/env'
import {page} from '../../../src/Utils/browserManager'
import { isParameter } from 'typescript';


// let browser: Browser;
// let page: Page;
let uploadPage: UploadPage;

Given('the user load the application',{ timeout: 20000 }, async function() {
  uploadPage = new UploadPage(page);
  await uploadPage.navigate(config.uiBaseURL);
});

Given('user is on the file upload page', async function () {
  expect(await uploadPage.verifyPageHeader())
  // await browser.close();
});

Then('the page title should contain {string}', async (titlePart: string) => {
  const title = await uploadPage.getTitle();
  expect(title).toContain(titlePart);
  // await browser.close();
});

When('the user upload the file {string}', async function (fileName: string) {
 await uploadPage.uploadFile(fileName)
});

When('the user upload the file {string} using drag and drop', async function (fileName: string) {
  await uploadPage.uploadFileDragAndDrop(fileName)
 });

Then('the user should see the message {string}', async function (expectedMessage: string) {
  await uploadPage.fileUploadedSuccessMessage(expectedMessage);
});

Then('the user should see the file name {string}',async function (fileName) {
  await uploadPage.verifyFileUploaded(fileName);
});

Then('the user should see the error message', async function () {
 await uploadPage.verifyErrorMessage();
});

When('the user click on the upload button', async function () {
  await uploadPage.userClickOnUploadButton();
});
Then('the user close the application',  ()=> {
  //  browser.close();
});

