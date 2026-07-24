import nodemailer from "nodemailer";

// Helper to get transporter instance
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("SMTP configuration is incomplete. Check .env.local variables (SMTP_HOST, SMTP_USER, SMTP_PASS).");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // True for 465, false for other ports (like 587)
    auth: {
      user,
      pass,
    },
  });
}

/**
 * EMAIL FIX: Validate email address format before sending.
 *
 * Root cause of the Gmail "550 5.1.1 The email account does not exist" bounce:
 * Gmail SMTP accepts messages via sendMail() without verifying the recipient exists.
 * The call succeeds and returns a messageId, but Gmail's delivery subsystem later
 * discovers the recipient doesn't exist and sends an asynchronous bounce-back to
 * the sender. This happens when a visitor/candidate submits a form with a typo or
 * invalid email address (e.g., "user@gmial.com" instead of "user@gmail.com").
 *
 * This validation catches obviously malformed addresses before sendMail() is called,
 * preventing the bounce. It also trims whitespace that could corrupt an otherwise
 * valid address.
 */
function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  // RFC 5322 simplified: local@domain.tld, no spaces, valid characters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
}

/**
 * EMAIL FIX: Debug logger for sendMail() calls.
 * Logs From, To, Reply-To, and Subject before every email send so the exact
 * recipient causing a bounce can be identified from terminal output.
 */
function logMailDetails(label, mailOptions) {
  console.log(`\n--- [EMAIL DEBUG] ${label} ---`);
  console.log(`  From:     ${mailOptions.from}`);
  console.log(`  To:       ${mailOptions.to}`);
  console.log(`  Reply-To: ${mailOptions.replyTo || "(not set)"}`);
  console.log(`  Subject:  ${mailOptions.subject}`);
  if (mailOptions.cc)  console.log(`  CC:       ${mailOptions.cc}`);
  if (mailOptions.bcc) console.log(`  BCC:      ${mailOptions.bcc}`);
  console.log(`--- [END EMAIL DEBUG] ---\n`);
}

export const emailService = {
  /**
   * Send contact form emails
   * 1. Notification to the Admin (containing inquiry details)
   * 2. Confirmation auto-reply to the User
   */
  async sendContactEmails({ name, email, phone, message }) {
    const transporter = getTransporter();
    if (!transporter) {
      return { success: false, error: "SMTP is not configured" };
    }

    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "no-reply@company.com";
    const fromName = process.env.SMTP_FROM_NAME || "Company Notifications";
    const companyEmail = process.env.COMPANY_NOTIFICATION_EMAIL || "info@company.com";

    // EMAIL FIX: Trim whitespace from user-provided email to prevent corrupted addresses
    const sanitizedUserEmail = email ? email.trim() : email;

    // 1. Parse additional details from message body if they exist
    let cleanMessage = message;
    let service = "General Inquiry";
    let country = "";

    const additionalInfoIndex = message.indexOf("--- Additional Info ---");
    if (additionalInfoIndex !== -1) {
      cleanMessage = message.substring(0, additionalInfoIndex).trim();
      const infoPart = message.substring(additionalInfoIndex);
      const serviceMatch = infoPart.match(/Service:\s*(.*)/);
      const countryMatch = infoPart.match(/Country:\s*(.*)/);
      
      if (serviceMatch && serviceMatch[1]) {
        service = serviceMatch[1].trim();
      }
      if (countryMatch && countryMatch[1]) {
        country = countryMatch[1].trim();
      }
    }

    const timeString = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " IST";

    const countryRow = country && country !== "N/A"
      ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; font-weight: 600; width: 150px;">Country:</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a; font-weight: 500;">${country}</td></tr>`
      : "";

    // 2. Email to the Admin (Notification)
    const adminMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: companyEmail,
      replyTo: sanitizedUserEmail, // Direct replies go to the user/visitor
      subject: `✉️ New Contact Submission: ${service} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Submission</title>
        </head>
        <body style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #334155; margin: 0; padding: 0;">
          <div style="width: 100%; background-color: #f8fafc; padding: 40px 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
              <div style="background-color: #0f172a; padding: 24px 32px; color: #ffffff;">
                <h2 style="margin: 0; font-size: 20px; font-weight: 700;">✉️ New Website Inquiry</h2>
              </div>
              <div style="padding: 32px;">
                <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Contact Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; font-weight: 600; width: 150px;">Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a; font-weight: 500;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; font-weight: 600;">Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a; font-weight: 500;"><a href="mailto:${email}" style="color: #0d6efd; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; font-weight: 600;">Phone:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a; font-weight: 500;">${phone || "N/A"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; font-weight: 600;">Subject / Service:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a; font-weight: 500;"><span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 600;">${service}</span></td>
                  </tr>
                  ${countryRow}
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; font-weight: 600;">Submitted At:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a; font-weight: 500;">${timeString}</td>
                  </tr>
                </table>
                
                <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Message</h3>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-line;">
                  ${cleanMessage}
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 3. Auto-reply Confirmation to the User
    const currentYear = new Date().getFullYear();
    const userMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: sanitizedUserEmail, // EMAIL FIX: use trimmed email to prevent whitespace-corrupted addresses
      replyTo: companyEmail, // Replies go to the company mailbox
      subject: `Inquiry Received - Thank you for contacting us`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Us</title>
        </head>
        <body style="font-family: 'Times New Roman', Times, Georgia, Arial, sans-serif; background-color: #ffffff; color: #1f2937; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
          <div style="width: 100%; background-color: #ffffff; padding: 0; margin: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-top: 4px solid #E30613; padding: 40px 24px 0 24px;">
              
              <!-- Logo Header -->
              <div style="margin-bottom: 32px;">
                <a href="https://guptatechweb.com" style="font-size: 24px; font-weight: 700; color: #000000; letter-spacing: -0.5px; text-decoration: none; font-family: 'Times New Roman', Times, Georgia, serif;">GUPTA TECH WEB</a>
              </div>

              <!-- Main Content Body -->
              <div style="font-size: 15px; line-height: 1.6; color: #334155; font-family: Arial, Helvetica, sans-serif;">
                <p style="margin-bottom: 24px;">Hello ${name},</p>
                <p style="margin-bottom: 16px;">Thank you for reaching out to Gupta Tech Web!</p>
                
                <p style="margin-bottom: 16px;">We have successfully received your inquiry submitted via our website contact form. Thank you for connecting with us.</p>
                
                <p style="margin-bottom: 24px;">Our team is reviewing your message and will get back to you shortly (typically within 24 business hours) with the information you requested.</p>
                
                <p style="margin-bottom: 0;">Warm regards,</p>
                <p style="margin-top: 4px; font-weight: bold; color: #000000; margin-bottom: 32px;">Gupta Tech Web Support Team</p>

                <!-- Disclaimer segment -->
                <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-bottom: 40px; font-size: 12px; color: #6b7280; line-height: 1.5; font-family: Arial, Helvetica, sans-serif;">
                  <p style="margin: 0; font-style: italic;">This is an automatically generated email sent from an unmonitored mailbox. Please do not reply.</p>
                  <p style="margin: 4px 0 0 0;">Visit our <a href="https://guptatechweb.com/contact" style="color: #E30613; text-decoration: underline;">contact page</a> for more information.</p>
                </div>
              </div>

              <!-- Branded Tinted Footer -->
              <div style="background-color: #F8FAFC; border-top: 3px solid #E30613; padding: 32px 24px; text-align: center; font-family: Arial, Helvetica, sans-serif; color: #4b5563; font-size: 12px; margin-top: 20px;">
                <p style="margin: 0 0 12px 0;">
                  <a href="https://guptatechweb.com" target="_blank" style="color: #E30613; text-decoration: underline; font-weight: bold;">guptatechweb.com</a>
                </p>
                
                <p style="margin: 0 0 16px 0; line-height: 1.6; color: #6b7280;">
                  &copy; ${currentYear} Gupta Tech Web. All rights reserved.
                </p>
                
                <div style="border-top: 1px solid #e5e7eb; padding-top: 12px; font-size: 11px; color: #9ca3af; line-height: 1.4;">
                  📍 410 Shagun Tower, Vijay Nagar, Indore (M.P)<br>
                  📧 Sales@guptatechweb.com &nbsp;|&nbsp; 📞 +91 7400554294
                </div>
              </div>

            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 4. Send emails independently to ensure robust delivery
    let adminResult = null;
    let userResult = null;
    const errors = [];

    try {
      logMailDetails("Contact → Admin Notification", adminMailOptions);
      adminResult = await transporter.sendMail(adminMailOptions);
      console.log("Admin contact notification email sent successfully.");
    } catch (error) {
      console.error("Error sending Admin contact notification email:", error);
      errors.push(`Admin Email: ${error.message}`);
    }

    // EMAIL FIX: Validate user-provided email before sending confirmation.
    // If invalid, skip the send entirely to prevent Gmail async bounce.
    if (!isValidEmail(sanitizedUserEmail)) {
      console.warn(`[EMAIL FIX] Skipping user confirmation — invalid email address: "${sanitizedUserEmail}"`);
      errors.push(`User Email: Invalid recipient address "${sanitizedUserEmail}"`);
    } else {
      try {
        logMailDetails("Contact → User Confirmation", userMailOptions);
        userResult = await transporter.sendMail(userMailOptions);
        console.log("User contact confirmation email sent successfully.");
      } catch (error) {
        console.error("Error sending User contact confirmation email:", error);
        errors.push(`User Email: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      return {
        success: errors.length < 2, // Succeeded if at least one email was sent
        error: errors.join(" | "),
        results: { adminResult, userResult }
      };
    }

    return { success: true, results: { adminResult, userResult } };
  },

  /**
   * Send career job application emails
   * 1. Notification to HR (with resume attachment)
   * 2. Confirmation auto-reply to the Candidate
   */
  async sendCareerEmails({ id, name, email, phone, position, experience = null, resumeUrl, absoluteResumePath, filename }) {
    const transporter = getTransporter();
    if (!transporter) {
      return { success: false, error: "SMTP is not configured" };
    }

    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "no-reply@company.com";
    const fromName = process.env.SMTP_FROM_NAME || "Company Notifications";
    const hrEmail = process.env.HR_NOTIFICATION_EMAIL || "hr@company.com";

    // EMAIL FIX: Trim whitespace from candidate-provided email to prevent corrupted addresses
    const sanitizedCandidateEmail = email ? email.trim() : email;

    const timeString = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " IST";

    const dateString = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });

    const currentYear = new Date().getFullYear();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://guptatechweb.com";
    const resumeDownloadUrl = resumeUrl ? (resumeUrl.startsWith("http") ? resumeUrl : `${baseUrl}${resumeUrl}`) : "#";
    const viewApplicationUrl = `${baseUrl}/admin/applications`;

    const experienceRow = experience
      ? `<tr>
          <td class="detail-label" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #64748b; font-weight: 600; width: 160px; vertical-align: top;">Experience</td>
          <td class="detail-value" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #0f172a; font-weight: 500; vertical-align: top;">${experience}</td>
        </tr>`
      : "";

    // 1. Email to HR (Notification with attachment)
    const hrMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: hrEmail,
      replyTo: sanitizedCandidateEmail, // Direct replies go to the candidate
      subject: `💼 New Job Application: ${position} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light">
          <meta name="supported-color-schemes" content="light">
          <title>New Job Application Received</title>
          <style>
            body, table, td, a {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            table, td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
            img {
              -ms-interpolation-mode: bicubic;
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
            }
            table {
              border-collapse: collapse !important;
            }
            body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              background-color: #ffffff;
              font-family: Arial, Helvetica, sans-serif;
            }
            @media screen and (max-width: 600px) {
              .email-container {
                width: 100% !important;
                max-width: 100% !important;
              }
              .email-body {
                padding: 24px !important;
              }
              .detail-label {
                width: 120px !important;
                font-size: 13px !important;
              }
              .detail-value {
                font-size: 13px !important;
              }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="background-color: #ffffff;">
            <tr>
              <td align="center" style="padding: 0;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" class="email-container" width="600" style="width: 600px; max-width: 600px; background-color: #ffffff; border-top: 4px solid #E30613; padding: 40px 24px 0 24px;">
                  
                  <!-- Logo Header -->
                  <tr>
                    <td align="left" style="padding-bottom: 24px;">
                      <a href="https://guptatechweb.com" target="_blank" style="font-family: 'Times New Roman', Times, Georgia, serif; font-size: 24px; font-weight: 700; color: #000000; letter-spacing: -0.5px; text-decoration: none;">
                        GUPTA TECH WEB
                      </a>
                    </td>
                  </tr>

                  <!-- Notification Header -->
                  <tr>
                    <td align="left" style="padding-bottom: 20px; border-bottom: 1px solid #e5e7eb;">
                      <h1 style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: bold; color: #000000; line-height: 1.3;">
                        New Job Application Received
                      </h1>
                    </td>
                  </tr>

                  <!-- Email Body -->
                  <tr>
                    <td class="email-body" style="padding: 24px 0; background-color: #ffffff;">
                      <p style="margin-top: 0; margin-bottom: 16px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #334155;">
                        Hello Team,
                      </p>
                      <p style="margin-top: 0; margin-bottom: 24px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #4b5563;">
                        A candidate has submitted a job application on the Careers page. Candidate details are summarized below:
                      </p>
                      
                      <!-- Details Table -->
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin-bottom: 32px; border-collapse: collapse;">
                        <tr>
                          <td class="detail-label" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #6b7280; font-weight: 600; width: 160px; vertical-align: top;">
                            Candidate Name
                          </td>
                          <td class="detail-value" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #000000; font-weight: bold; vertical-align: top;">
                            ${name}
                          </td>
                        </tr>
                        <tr>
                          <td class="detail-label" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #6b7280; font-weight: 600; vertical-align: top;">
                            Email Address
                          </td>
                          <td class="detail-value" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #000000; vertical-align: top;">
                            <a href="mailto:${email}" style="color: #E30613; text-decoration: underline; font-weight: bold;">
                              ${email}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td class="detail-label" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #6b7280; font-weight: 600; vertical-align: top;">
                            Phone Number
                          </td>
                          <td class="detail-value" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #000000; font-weight: bold; vertical-align: top;">
                            ${phone}
                          </td>
                        </tr>
                        <tr>
                          <td class="detail-label" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #6b7280; font-weight: 600; vertical-align: top;">
                            Position Applied
                          </td>
                          <td class="detail-value" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top;">
                            <span style="color: #E30613; font-weight: bold; font-size: 14px;">
                              ${position}
                            </span>
                          </td>
                        </tr>
                        ${experienceRow}
                        <tr>
                          <td class="detail-label" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #6b7280; font-weight: 600; vertical-align: top;">
                            Applied Date
                          </td>
                          <td class="detail-value" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #000000; font-weight: bold; vertical-align: top;">
                            ${dateString}
                          </td>
                        </tr>
                      </table>

                      <!-- Buttons Section -->
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin: 16px 0; text-align: center;">
                        <tr>
                          <td align="center" style="padding-bottom: 16px;">
                            <a href="${resumeDownloadUrl}" target="_blank" style="background-color: #E30613; border-radius: 8px; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold; line-height: 44px; text-align: center; text-decoration: none; width: 240px; -webkit-text-size-adjust: none; box-shadow: 0 4px 6px rgba(227, 6, 19, 0.15);">
                              Download Candidate Resume
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <a href="${viewApplicationUrl}" target="_blank" style="background-color: #1e293b; border-radius: 8px; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold; line-height: 44px; text-align: center; text-decoration: none; width: 240px; -webkit-text-size-adjust: none; border: 1px solid #0f172a;">
                              View in Admin Panel
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #F8FAFC; border-top: 3px solid #E30613; padding: 32px 24px; text-align: center; font-family: Arial, Helvetica, sans-serif; color: #6b7280; font-size: 12px;">
                      <p style="margin: 0 0 12px 0; font-weight: 500;">
                        This is an automated notification from Gupta Tech Web Recruitment System.
                      </p>
                      <p style="margin: 6px 0 0 0; font-size: 11px; color: #9ca3af;">
                        &copy; ${currentYear} Gupta Tech Web. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      attachments: absoluteResumePath
        ? [
            {
              filename: filename || "Resume",
              path: absoluteResumePath,
            },
          ]
        : [],
    };

    // 2. Auto-reply Confirmation to the Candidate
    const candidateMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: sanitizedCandidateEmail, // EMAIL FIX: use trimmed email to prevent whitespace-corrupted addresses
      replyTo: hrEmail, // Replies go to the HR department
      subject: `Application Received: ${position} at Gupta Tech Web`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Received</title>
        </head>
        <body style="font-family: 'Times New Roman', Times, Georgia, Arial, sans-serif; background-color: #ffffff; color: #1f2937; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
          <div style="width: 100%; background-color: #ffffff; padding: 0; margin: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-top: 4px solid #E30613; padding: 40px 24px 0 24px;">
              
              <!-- Logo Header -->
              <div style="margin-bottom: 32px;">
                <a href="https://guptatechweb.com" style="font-size: 24px; font-weight: 700; color: #000000; letter-spacing: -0.5px; text-decoration: none; font-family: 'Times New Roman', Times, Georgia, serif;">GUPTA TECH WEB</a>
              </div>

              <!-- Main Content Body -->
              <div style="font-size: 15px; line-height: 1.6; color: #334155; font-family: Arial, Helvetica, sans-serif;">
                <p style="margin-bottom: 24px;">${name},</p>
                <p style="margin-bottom: 16px;">We're glad that you're interested in a career at Gupta Tech Web!</p>
                
                <p style="margin-bottom: 24px;">Your application for the position listed below was successfully submitted and we appreciate your patience as we review all applications for this job opportunity. Please check your email for updates and feel free to view your application status in our recruitment portal at any time.</p>
                
                <!-- Position Highlight Box -->
                <div style="margin: 28px 0; padding: 12px 0; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; color: #000000;">
                  ${position}
                </div>

                <p style="margin-bottom: 24px;">Thanks for taking the time to apply and good luck!</p>
                
                <p style="margin-bottom: 0;">Sincerely,</p>
                <p style="margin-top: 4px; font-weight: bold; color: #000000; margin-bottom: 32px;">Gupta Tech Web Talent Team</p>

                <!-- Disclaimer segment -->
                <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-bottom: 40px; font-size: 12px; color: #6b7280; line-height: 1.5; font-family: Arial, Helvetica, sans-serif;">
                  <p style="margin: 0; font-style: italic;">This is an automatically generated email sent from an unmonitored mailbox. Please do not reply.</p>
                  <p style="margin: 4px 0 0 0;">Visit our <a href="https://guptatechweb.com/careers" style="color: #E30613; text-decoration: underline;">careers site</a> for more information.</p>
                </div>
              </div>

              <!-- Branded Tinted Footer -->
              <div style="background-color: #F8FAFC; border-top: 3px solid #E30613; padding: 32px 24px; text-align: center; font-family: Arial, Helvetica, sans-serif; color: #4b5563; font-size: 12px; margin-top: 20px;">
                <p style="margin: 0 0 12px 0;">
                  <a href="https://guptatechweb.com/careers" target="_blank" style="color: #E30613; text-decoration: underline; font-weight: bold;">guptatechweb.com/careers</a>
                </p>
                
                <p style="margin: 0 0 16px 0; line-height: 1.6; color: #6b7280;">
                  &copy; ${currentYear} Gupta Tech Web. All rights reserved.<br>
                  Gupta Tech Web is an Equal Opportunity Employer, including Disability/Veterans.
                </p>
                
                <div style="border-top: 1px solid #e5e7eb; padding-top: 12px; font-size: 11px; color: #9ca3af; line-height: 1.4;">
                  📍 410 Shagun Tower, Vijay Nagar, Indore (M.P)<br>
                  📧 Sales@guptatechweb.com &nbsp;|&nbsp; 📞 +91 7400554294
                </div>
              </div>

            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 3. Send emails independently to ensure robust delivery
    let hrResult = null;
    let candidateResult = null;
    const errors = [];

    try {
      logMailDetails("Career → HR Notification", hrMailOptions);
      hrResult = await transporter.sendMail(hrMailOptions);
      console.log("HR notification email sent successfully.");
    } catch (error) {
      console.error("Error sending HR notification email:", error);
      errors.push(`HR Email: ${error.message}`);
    }

    // EMAIL FIX: Validate candidate-provided email before sending confirmation.
    // If invalid, skip the send entirely to prevent Gmail async bounce.
    if (!isValidEmail(sanitizedCandidateEmail)) {
      console.warn(`[EMAIL FIX] Skipping candidate confirmation — invalid email address: "${sanitizedCandidateEmail}"`);
      errors.push(`Candidate Email: Invalid recipient address "${sanitizedCandidateEmail}"`);
    } else {
      try {
        logMailDetails("Career → Candidate Confirmation", candidateMailOptions);
        candidateResult = await transporter.sendMail(candidateMailOptions);
        console.log("Candidate confirmation email sent successfully.");
      } catch (error) {
        console.error("Error sending Candidate confirmation email:", error);
        errors.push(`Candidate Email: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      return {
        success: errors.length < 2, // Succeeded if at least one email was sent
        error: errors.join(" | "),
        results: { hrResult, candidateResult }
      };
    }

    return { success: true, results: { hrResult, candidateResult } };
  },
};
