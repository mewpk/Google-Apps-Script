function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Sheet1");  // Ensure this matches the name of your sheet
  const range = sheet.getDataRange();
  const values = range.getValues();

  const output = JSON.stringify(values);
  return ContentService.createTextOutput(output)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Sheet1");  // Ensure this matches the name of your sheet

  try {
    // Parse the incoming JSON payload
    const data = JSON.parse(e.postData.contents);

    // Check if the data is an array and has elements
    if (Array.isArray(data.data) && data.data.length > 0) {
      // Append the data as a new row in the sheet
      sheet.appendRow(data.data);
      return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": "Invalid data format" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    // Handle parsing error or other exceptions
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
