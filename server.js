const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const QRCode = require('qrcode');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Added support for JSON request bodies

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to generate a random password including symbols
function generatePasswordWithSymbols(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:\'",.<>/?';
  
  // Ensure length is within a reasonable range to prevent resource exhaustion
  if (length > 100) {
    throw new Error('Password length exceeds maximum allowed value');
  }

  const password = Array.from(crypto.randomBytes(length))
    .map(byte => charset[byte % charset.length])
    .join('');
  return password;
}

// Route to display the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission
app.post('/generate-password', (req, res) => {
  try {
    const length = parseInt(req.body.bytes, 10);
    if (isNaN(length) || length <= 0) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const password = generatePasswordWithSymbols(length);
    QRCode.toDataURL(password, (err, url) => {
      if (err) {
        console.error('Error generating QR code:', err);
        return res.status(500).json({ error: 'Error generating QR code' });
      }
      res.json({ password, qrCode: url });
    });
  } catch (error) {
    console.error('Error generating password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the app for use in Electron
module.exports = app;
