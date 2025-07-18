import { Given, When, Then } from '@cucumber/cucumber';
import { APIPage } from '../../../src/APIPageObject/APIPage';
import { APIResponse, expect } from '@playwright/test';
import { config } from '../../../src/config/env';
import * as fs from 'fs';
import * as path from 'path';
import assert from 'assert';

let apiClient: APIPage;
let response: APIResponse;
const dataFilePath = path.resolve(__dirname, '../../../testData/createPost.json');
const patchFilePath = path.resolve(__dirname, '../../../testData/updatePostValid.json');
const testData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
const testDataPut = JSON.parse(fs.readFileSync(patchFilePath, 'utf-8'));

/**
 * Step: API is initialized
 * Description: This step initializes the API client with the base URL defined in config.
 *               It ensures the client is ready for sending requests in subsequent steps.
 */
Given('API is initialized', async () => {
  apiClient = new APIPage(config.apiBaseURL);
  await apiClient.init();
});

/**
 * Step: the user sends GET request to post endpoint
 * Description:
 *   This step sends a GET request to the specified API endpoint
 *
 * @param endpoint - send the GET request to (e.g., "/posts").
 */

When('the user send GET request to {string}', async (endpoint: string) => {
  response = await apiClient.get(endpoint);
});

/**
 * Step: the user sends a POST request to enpoint with json body
 * Description:
 *   Sends a POST request to the specified endpoint
 * @param endpoint - The target API endpoint (e.g., "/posts")
 * @param requestBody - A JSON string representing the body to be sent in the POST request
 */
When('the user send a POST request to {string} with body {string}', async function (endpoint: string, requestBody: string) {
    apiClient = new APIPage(config.apiBaseURL);
    await apiClient.init();
    const jsonBody = testData[requestBody];
  response = await apiClient.post(endpoint, jsonBody);
});


/**
 * Step: the user sends DELETE request to post endpoint
 * Description:
 *   This step sends a DELETE request to the specified API endpoint
 *
 * @param endpoint - send the DELETE request to (e.g., "/posts/id").
 */
When('the user sends a DELETE request to {string}', async (endpoint: string) => {
  response = await apiClient.delete(endpoint);
});


/**
 * Step: the user sends a PUT request to post/id with the json body
 * Description:
 *   Sends a PUT request to the specified endpoint using the initialized API client
 * @param endpoint - The API endpoint to which the PUT request is sent (e.g., "/posts/1")
 * @param requestBody - A JSON string containing the request payload
 */
When('the user sends a PUT request to {string} with the body {string}',  async function (endpoint: string, requestBody: string) {
  apiClient = new APIPage(config.apiBaseURL);
  await apiClient.init();
  const jsonBody = testDataPut[requestBody];
response = await apiClient.put(endpoint, jsonBody);
});


/**
 * Step: the response status code should be {int}
 * Description:
 *   Validates that the HTTP status code returned from the API matches the expected value.
 *
 * @param statusCode - The expected HTTP status code
 */

Then('the response status code should be {int}', async (statusCode: number) => {
  expect(response.status()).toBe(statusCode);
});

/**
 * Step: the response body verification
 * Description:
 *
 * @param fieldname 
 * @param expectedvalue
 */
Then('response body should have {string} equal to {string}', async (fieldName: string, expectedValue: string) => {
  const json = await response.json();
  expect(json[fieldName]).toBe(expectedValue);
});

Then('response body should have {string} equal to {int}', async (key: string, expectedValue: number) => {
  const json = await response.json();
  expect(json[key]).toBe(expectedValue);
});

Then('the response JSON should have non-empty {string} and {string} fields', async function (title: string, body: string) {
  const json = await response.json();
  expect(json[title].trim().length).toBeGreaterThan(0);
  expect(json[body].trim().length).toBeGreaterThan(0);
});


Then('the response body {string} should be match from {string} json file',async function (fieldName: string, responseBody: string) {
  const expectedValue = testData[responseBody]?.[fieldName];
  const responseJson = await response.json();
  const actualValue = responseJson[fieldName];
  assert.strictEqual(actualValue, expectedValue, `Expected response ${fieldName} to be '${expectedValue}', but got '${actualValue}'`);
});

Then('the response body should be empty', async function () {
  console.log('verify response',this.response.text)
  const text = await this.response.text();
  if (text.trim() === '') {
    expect(text.trim()).toBe('');
  } else {
    const json = JSON.parse(text);
    expect(Object.keys(json).length).toBe(0);
  }
});


Then('the response should contain a list of 100 posts', async() => {
 const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBe(100);
});

Then('each post should have an id and a title', async () => {
  const responseBody = await response.json();
  for (const post of responseBody) {
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
  }
});