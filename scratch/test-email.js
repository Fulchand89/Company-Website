// Test script to run locally to verify Nodemailer SMTP connection and credentials.
// Run this file using: node scratch/test-email.js
// Make sure to load environment variables. Since Next.js loads them automatically,
// you can run this with dotenv or load them manually.

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Simple dotenv parsing for local testing without installing dotenv
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('.env.local file not found at:', envPath);
    return;
  }
  
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    
    const parts = trimmed.split('=');
    const key = parts[0].trim();
    let value = parts.slice(1).join('=').trim();
    
    // Remove wrapping quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.substring(1, value.length - 1);
    }
    
    process.env[key] = value;
  });
}

loadEnv();

const host = process.env.SMTP_HOST;
const port = parseInt(process.env.SMTP_PORT || "587", 10);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

console.log('--- SMTP Diagnostic Info ---');
console.log('SMTP_HOST:', host);
console.log('SMTP_PORT:', port);
console.log('SMTP_USER:', user);
console.log('SMTP_PASS is set:', pass ? 'Yes (length: ' + pass.length + ')' : 'No');
console.log('-----------------------------');

if (!host || !user || !pass) {
  console.error('Error: SMTP_HOST, SMTP_USER, or SMTP_PASS is missing in environment variables.');
  process.exit(1);
}

if (user === 'your_smtp_email@gmail.com' || pass === 'your_smtp_app_password') {
  console.warn('Warning: You are still using the placeholder values in .env.local.');
  console.warn('Please update .env.local with your real Gmail address and App Password.');
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
});

console.log('Verifying connection config...');
transporter.verify(async function (error, success) {
  if (error) {
    console.error('Connection verification failed:', error);
    process.exit(1);
  }
  console.log('Connection verification succeeded! Transporter is ready.');

  const recipient = process.argv[2];
  if (!recipient) {
    console.log('\nTo send a test email, run: node scratch/test-email.js <recipient-email-address>');
    process.exit(0);
  }

  console.log(`\nAttempting to send a test email to: ${recipient}...`);
  try {
    const fromEmail = process.env.SMTP_USER;
    const info = await transporter.sendMail({
      from: `"Test Sender" <${fromEmail}>`,
      to: recipient,
      subject: "Test Email from Next.js App",
      text: "This is a test email to verify that SMTP is sending emails correctly to external addresses.",
      html: "<b>This is a test email to verify that SMTP is sending emails correctly to external addresses.</b>",
    });
    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
  } catch (sendError) {
    console.error("Failed to send email:", sendError);
  }
});

