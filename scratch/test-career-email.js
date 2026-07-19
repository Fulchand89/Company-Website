const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

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

if (!host || !user || !pass) {
  console.error('Error: SMTP_HOST, SMTP_USER, or SMTP_PASS is missing in environment variables.');
  process.exit(1);
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

const candidateEmail = process.argv[2];
const hrEmailAddress = process.argv[3] || process.env.HR_NOTIFICATION_EMAIL || 'hr@company.com';

if (!candidateEmail) {
  console.log('\nUsage: node scratch/test-career-email.js <candidate-email> [hr-email]');
  process.exit(0);
}

const fromEmail = process.env.SMTP_USER || process.env.SMTP_FROM_EMAIL || "no-reply@company.com";
const fromName = process.env.SMTP_FROM_NAME || "Company Notifications";

const hrMailOptions = {
  from: `"${fromName}" <${fromEmail}>`,
  to: hrEmailAddress,
  replyTo: candidateEmail,
  subject: `💼 New Job Application: Software Engineer - Test Candidate`,
  html: `<h3>New Application Details</h3><p>Candidate Name: Test Candidate</p><p>Position: Software Engineer</p>`,
};

const candidateMailOptions = {
  from: `"${fromName}" <${fromEmail}>`,
  to: candidateEmail,
  replyTo: hrEmailAddress,
  subject: `Application Received: Software Engineer at Gupta Tech Web`,
  html: `<h3>Hello Test Candidate,</h3><p>Thank you for applying. We have received your application.</p>`,
};

async function sendTest() {
  console.log('Sending emails...');
  try {
    console.log(`\n1. Sending notification to HR (${hrEmailAddress})...`);
    const hrResult = await transporter.sendMail(hrMailOptions);
    console.log('HR Email Sent Successfully!');
    console.log('Response:', hrResult.response);
  } catch (err) {
    console.error('HR Email Failed:', err.message);
  }

  try {
    console.log(`\n2. Sending confirmation to Candidate (${candidateEmail})...`);
    const candidateResult = await transporter.sendMail(candidateMailOptions);
    console.log('Candidate Email Sent Successfully!');
    console.log('Response:', candidateResult.response);
  } catch (err) {
    console.error('Candidate Email Failed:', err.message);
  }
}

sendTest();
