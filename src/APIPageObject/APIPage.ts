import { request, APIRequestContext, APIResponse } from '@playwright/test';
import {config} from '../config/env'

export class APIPage {
  private apiContext!: APIRequestContext;
  private apiBaseURL: string;

  constructor(apiBaseURL: string) {
    this.apiBaseURL = apiBaseURL;
  }
  
  async init() {
    this.apiContext = await request.newContext({baseURL: this.apiBaseURL});
  }

  // Generic method for GET request
  async get(endpoint: string): Promise<APIResponse> {
    return this.apiContext.get(endpoint);
  }

  // Generic method for POST request with JSON body
  async post(endpoint: string, body: object): Promise<APIResponse> {
    return this.apiContext.post(endpoint, {
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Generic PUT method
  async put(endpoint: string, body: object): Promise<APIResponse> {
    return this.apiContext.put(endpoint, {
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Generic DELETE method
  async delete(endpoint: string): Promise<APIResponse> {
    return this.apiContext.delete(endpoint);
  }

}
