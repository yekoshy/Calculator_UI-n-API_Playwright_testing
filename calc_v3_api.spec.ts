import testData from './testcases.json';
import { test, expect } from '@playwright/test';

for (const data of testData) {
  test(`API POST: ${data.id} - ${data.description}`, async ({ request }) => {
  // Execute the GET request
  const response = await request.get('https://testpages.eviltester.com/apps/api/calculator/calculate', {
    headers: {
      'accept': 'application/json'
    },
    params: {
      operation: data.operator,
      left: data.operand1,
      right: data.operand2
    }
  });

  const responseBody = await response.json();
      console.log(`API Response - ${data.id}: `, responseBody);
      console.log(`API Response Status - ${data.id}: `, response.status());
      // Example Assertion 1: Check status code (e.g., expecting a 400 series error)
       expect(response.status()).toBe(data.api.expectedStatus); 
      // Example Assertion 2: Verify the response body contains an error message or handles it safely
       expect(responseBody).toEqual({
              "type": data.api.expectedResponseType,
              "value": data.expectedResult
      });
      
    });
  }