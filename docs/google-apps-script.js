/**
 * Google Apps Script for Portfolio Authentication
 *
 * This script handles two actions:
 * - "validate": Legacy code validation (if not using Cloudflare Worker)
 * - "log": Log login attempts (called by Cloudflare Worker after validation)
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet with two tabs:
 *    - "Codes" with headers: code, party_name, email, notes, active, created_date, expires_date
 *    - "Logins" with headers: timestamp, code_used, party_name, user_agent, referrer, success
 *
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire file into the script editor
 * 4. Click Deploy > New deployment
 * 5. Select "Web app"
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and copy the web app URL
 * 9. Add the URL to Cloudflare Worker as SHEETS_API_URL environment variable
 *
 * CLOUDFLARE WORKER INTEGRATION:
 * When using the Cloudflare Worker (see cloudflare-worker.js), this script
 * only handles logging. The Worker validates codes against KV storage for
 * fast (~50ms) responses, then fires an async request here to log the attempt.
 */

// Configuration
const CODES_SHEET_NAME = 'Codes';
const LOGINS_SHEET_NAME = 'Logins';

/**
 * Handle POST requests from the React app
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.action === 'validate') {
      return validateCode(data);
    }

    // Log-only action for Cloudflare Worker integration
    if (data.action === 'log') {
      return logLoginOnly(data);
    }

    return jsonResponse({ success: false, error: 'Unknown action' });
  } catch (error) {
    return jsonResponse({ success: false, error: 'Server error: ' + error.message });
  }
}

/**
 * Log a login attempt (called by Cloudflare Worker after validation)
 */
function logLoginOnly(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const loginsSheet = ss.getSheetByName(LOGINS_SHEET_NAME);

  if (!loginsSheet) {
    return jsonResponse({ success: false, error: 'Logins sheet not found' });
  }

  logLogin(
    loginsSheet,
    data.code || '',
    data.partyName || '',
    data.userAgent || '',
    data.referrer || '',
    data.success === true
  );

  return jsonResponse({ success: true });
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'Auth API is running' });
}

/**
 * Validate an access code against the Codes sheet
 */
function validateCode(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const codesSheet = ss.getSheetByName(CODES_SHEET_NAME);
  const loginsSheet = ss.getSheetByName(LOGINS_SHEET_NAME);

  if (!codesSheet || !loginsSheet) {
    return jsonResponse({ success: false, error: 'Sheet configuration error' });
  }

  const code = (data.code || '').toUpperCase().trim();
  const userAgent = data.userAgent || '';
  const referrer = data.referrer || '';

  if (!code) {
    return jsonResponse({ success: false, error: 'No code provided' });
  }

  // Get all codes from the sheet
  const codesData = codesSheet.getDataRange().getValues();
  const headers = codesData[0];

  // Find column indices
  const codeCol = headers.indexOf('code');
  const partyCol = headers.indexOf('party_name');
  const activeCol = headers.indexOf('active');
  const expiresCol = headers.indexOf('expires_date');

  if (codeCol === -1) {
    return jsonResponse({ success: false, error: 'Sheet missing code column' });
  }

  // Search for matching code
  let matchedRow = null;
  let partyName = '';

  for (let i = 1; i < codesData.length; i++) {
    const row = codesData[i];
    const rowCode = (row[codeCol] || '').toString().toUpperCase().trim();

    if (rowCode === code) {
      matchedRow = row;
      partyName = partyCol !== -1 ? row[partyCol] : '';
      break;
    }
  }

  // Check if code exists
  if (!matchedRow) {
    logLogin(loginsSheet, code, '', userAgent, referrer, false);
    return jsonResponse({ success: false, error: 'Invalid access code' });
  }

  // Check if code is active
  if (activeCol !== -1) {
    const isActive = matchedRow[activeCol];
    if (isActive === false || isActive === 'FALSE' || isActive === 'false' || isActive === 0) {
      logLogin(loginsSheet, code, partyName, userAgent, referrer, false);
      return jsonResponse({ success: false, error: 'This code has been deactivated' });
    }
  }

  // Check expiration date
  if (expiresCol !== -1 && matchedRow[expiresCol]) {
    const expiresDate = new Date(matchedRow[expiresCol]);
    const now = new Date();

    if (expiresDate < now) {
      logLogin(loginsSheet, code, partyName, userAgent, referrer, false);
      return jsonResponse({ success: false, error: 'This code has expired' });
    }
  }

  // Success! Log the login
  logLogin(loginsSheet, code, partyName, userAgent, referrer, true);

  return jsonResponse({
    success: true,
    partyName: partyName
  });
}

/**
 * Log a login attempt to the Logins sheet
 */
function logLogin(sheet, code, partyName, userAgent, referrer, success) {
  const timestamp = new Date().toISOString();

  sheet.appendRow([
    timestamp,
    code,
    partyName,
    userAgent,
    referrer,
    success ? 'TRUE' : 'FALSE'
  ]);
}

/**
 * Helper to return JSON response with CORS headers
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
