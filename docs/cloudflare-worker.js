/**
 * Cloudflare Worker for Portfolio Authentication
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a KV namespace in Cloudflare Dashboard:
 *    - Workers & Pages → KV → Create namespace
 *    - Name: "portfolio-codes"
 *
 * 2. Create the Worker:
 *    - Workers & Pages → Create → Create Worker
 *    - Name: "portfolio-auth"
 *    - Paste this code and deploy
 *
 * 3. Bind KV to Worker:
 *    - Worker → Settings → Bindings
 *    - Add KV binding: Variable name "CODES" → namespace "portfolio-codes"
 *
 * 4. Add Environment Variable:
 *    - Worker → Settings → Variables
 *    - Add: SHEETS_API_URL = (your Apps Script URL)
 *
 * 5. Add codes to KV:
 *    - KV namespace → Add entry
 *    - Key: HONEYBADGER (the access code)
 *    - Value: {"party": "John Smith", "active": true}
 *
 * MANAGING CODES:
 * - Add code: Create KV entry with key=code, value={"party": "Name", "active": true}
 * - Disable code: Edit entry, change "active" to false
 * - Delete code: Delete the KV entry
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Handle GET (health check)
    if (request.method === 'GET') {
      return jsonResponse({ status: 'ok', message: 'Auth API is running' });
    }

    // Handle POST (validation)
    if (request.method === 'POST') {
      try {
        const data = await request.json();
        const code = (data.code || '').toUpperCase().trim();

        if (!code) {
          return jsonResponse({ success: false, error: 'No code provided' });
        }

        // Lookup in KV
        const entry = await env.CODES.get(code);

        if (!entry) {
          // Fire-and-forget logging for failed attempt
          logToSheets(env, code, '', false, data);
          return jsonResponse({ success: false, error: 'Invalid access code' });
        }

        const codeData = JSON.parse(entry);

        if (!codeData.active) {
          logToSheets(env, code, codeData.party, false, data);
          return jsonResponse({ success: false, error: 'This code has been deactivated' });
        }

        // Success - log async (don't await)
        logToSheets(env, code, codeData.party, true, data);

        return jsonResponse({ success: true, partyName: codeData.party });
      } catch (error) {
        return jsonResponse({ success: false, error: 'Server error' });
      }
    }

    return jsonResponse({ success: false, error: 'Method not allowed' });
  }
};

/**
 * Fire-and-forget logging to Google Apps Script
 * This doesn't block the user - logging is best-effort
 */
function logToSheets(env, code, party, success, data) {
  if (!env.SHEETS_API_URL) {
    return; // Skip logging if URL not configured
  }

  fetch(env.SHEETS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
      action: 'log',
      code: code,
      partyName: party,
      success: success,
      userAgent: data.userAgent || '',
      referrer: data.referrer || ''
    })
  }).catch(() => {}); // Ignore errors - logging is best-effort
}

/**
 * Helper to return JSON response with CORS headers
 */
function jsonResponse(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
