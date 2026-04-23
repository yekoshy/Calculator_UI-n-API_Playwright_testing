import { test, expect } from '@playwright/test';

test.describe('Calculator API Tests', () => {

  test('POST /calculate - should handle whitespace in right operand', async ({ request }) => {
    
    // 1. Define the API endpoint
    const url = 'https://testpages.eviltester.com/apps/api/calculator/calculate';

    // 2. Execute the POST request (Translating the cURL)
    const response = await request.post(url, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        "operation": "plus",
        "left": "1",
        "right": "  "
      }
    });

    // 3. Parse the JSON response body
    const responseBody = await response.json();
    console.log('API Response:', responseBody);

    // 4. Assertions
    // Since "right" is just whitespace, we expect this to fail validation.
    // (Adjust the expected status code depending on actual API behavior, usually 400 Bad Request or a 200 with an error object)
    
    // Example Assertion 1: Check status code (e.g., expecting a 400 series error)
     expect(response.status()).toBe(400); 
    // Example Assertion 2: Verify the response body contains an error message or handles it safely
     expect(responseBody).toEqual({
            "type": "INPUT_ERROR",
            "value": "Empty input"
    });
    });

});