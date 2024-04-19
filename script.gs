// Function to handle GET requests
function doGet(e) {
  // Access the active spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Get the specific sheet by name, adjust "Sheet1" to your sheet's name
  const sheet = ss.getSheetByName("Sheet1");
  // Get the range that includes all data in the sheet
  const range = sheet.getDataRange();
  // Retrieve the values in the range as a 2D array
  const values = range.getValues();

  // Convert the 2D array into a JSON string
  const output = JSON.stringify(values);
  // Return the JSON string with the appropriate MIME type for JSON
  return ContentService.createTextOutput(output)
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to handle POST requests
function doPost(e) {
  // Access the active spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Get the specific sheet by name, adjust "Sheet1" to your sheet's name
  const sheet = ss.getSheetByName("Sheet1");

  try {
    // Attempt to parse the JSON payload from the request
    const data = JSON.parse(e.postData.contents);

    // Check if the 'data' key contains an array with at least one element
    if (Array.isArray(data.data) && data.data.length > 0) {
      // Append the data as a new row to the sheet
      sheet.appendRow(data.data);
      // Return a success status in JSON format
      return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      // Return an error status if the data format is invalid
      return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": "Invalid data format" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    // Catch and handle any errors that occur during parsing or processing
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
