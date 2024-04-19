# Google Apps Script: Spreadsheet Interaction

## By mewpk

This guide provides details on using a Google Apps Script to interact with a Google Sheet via web requests. The script handles `GET` requests to retrieve all data and `POST` requests to append new data.

## Setup Instructions

### 1. Prepare Your Google Sheet

- Open or create a Google Sheet.
- Note the name of the sheet you want to interact with.

### 2. Open the Script Editor

- In your Google Sheet, go to `Extensions` > `Apps Script`.

### 3. Insert the Script

Copy and paste the following script into the script editor, replacing `"Sheet1"` with your sheet's name if different.

```javascript
// Handles GET requests
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Sheet1");
  const range = sheet.getDataRange();
  const values = range.getValues();
  return ContentService.createTextOutput(JSON.stringify(values))
                       .setMimeType(ContentService.MimeType.JSON);
}

// Handles POST requests
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Sheet1");
  try {
    const data = JSON.parse(e.postData.contents);
    if (Array.isArray(data.data) && data.data.length > 0) {
      sheet.appendRow(data.data);
      return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
                           .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": "Invalid data format" }))
                           .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

# Deploying as a Web App

This section outlines how to deploy your Google Apps Script as a web app, allowing it to be accessed via HTTP requests.

## 1. Deployment Process

- **Navigate to Deployment Options**:
  - In the Apps Script editor, click on `Deploy` > `New deployment`.
- **Configure the Deployment**:
  - Choose `Web app` from the list of deployment types.
  - Set `Execute as` to `Me` to run the script as your account.
  - Choose who can access the web app. Select `Anyone` or `Anyone, even anonymous` if you want it to be publicly accessible.

## 2. Authorization

- **Review Permissions**:
  - Click on `Review Permissions`, choose your Google account, and accept the necessary permissions to allow the script to operate.

## 3. Obtain API URL

- **API Endpoint**:
  - After completing the deployment, you will be provided with a URL. This is your endpoint for API calls.

# API Usage

Interact with your Google Sheet through API by making HTTP requests to the endpoint provided after deployment.

## Making a GET Request

- **Retrieve Data**:
  - Send a GET request to the endpoint URL to fetch all data from the sheet. Use tools like Postman, curl, or write code in JavaScript using `fetch` to make these requests.

## Making a POST Request

- **Add Data**:
  - To append new data to your sheet, send a POST request with a JSON payload. Ensure your request content type is set to `application/json`.

### Example JSON Payload for POST Request

```json
{
  "data": ["Example Name", "Example Email", "Example Date"]
}
```

## Sample Code to Make a POST Request

- **Here is a simple example using JavaScript:**:

```javascript
function sendData() {
  const url = 'YOUR_API_ENDPOINT';  // Replace YOUR_API_ENDPOINT with the actual URL provided after deployment
  const data = {
    data: ["Example Name", "Example Email", "Example Date"]
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}
```
 - Replace YOUR_API_ENDPOINT with the actual URL to successfully send data to your Google Sheet.


