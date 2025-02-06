const express = require('express');
const app = express();

// Map status codes to their descriptions
const statusCodes = {
  200: "OK: The request has succeeded. The meaning of this status depends on the HTTP method used.",
  201: "Created: The resource has been successfully created.",
  204: "No Content: The request was successful, but there is no content to return.",
  400: "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax).",
  401: "Unauthorized: The request requires user authentication.",
  403: "Forbidden: The server refuses to authorize the request.",
  404: "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource.",
  405: "Method Not Allowed: The method specified in the request is not allowed for the resource identified by the request URI.",
  429: "Too Many Requests: The user has sent too many requests in a given amount of time.",
  500: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.",
  502: "Bad Gateway: The server received an invalid response from the upstream server.",
  503: "Service Unavailable: The server is temporarily unable to handle the request due to a temporary overloading or maintenance of the server.",
  504: "Gateway Timeout: The server did not receive a timely response from the upstream server."
};

// Create the '/status-info' GET endpoint
app.get("/status-info", (req, res) => {
  const code = req.query.code; // Get the status code from the query parameter
  
  // Check if the code is provided and valid
  if (!code || isNaN(code)) {
    return res.status(400).json({ error: "Invalid or missing status code" });
  }

  const statusCode = parseInt(code); // Convert code to an integer
  const message = statusCodes[statusCode]; // Get message based on the status code

  if (message) {
    res.json({ status: statusCode, message });
  } else {
    res.status(404).json({ error: "Status code not found" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Status Code API is running on http://localhost:${PORT}`);
});
