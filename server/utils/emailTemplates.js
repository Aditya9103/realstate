const baseEmailTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f4f7f6;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .header {
      background-color: #1a2b3c;
      padding: 30px 40px;
      text-align: center;
    }
    .header h1 {
      color: #D29F54;
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .content {
      padding: 40px;
      color: #4a5568;
      line-height: 1.6;
      font-size: 16px;
    }
    .content h2 {
      color: #1a2b3c;
      margin-top: 0;
      font-size: 20px;
    }
    .highlight-box {
      background-color: #f8fafc;
      border-left: 4px solid #D29F54;
      padding: 15px 20px;
      margin: 25px 0;
      border-radius: 0 8px 8px 0;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 40px;
      text-align: center;
      font-size: 14px;
      color: #718096;
      border-top: 1px solid #e2e8f0;
    }
    .btn {
      display: inline-block;
      background-color: #D29F54;
      color: #ffffff;
      padding: 12px 25px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin-top: 20px;
    }
    .btn:hover {
      background-color: #b88a44;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>REAL ESTATE PORTAL</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Real Estate Portal. All rights reserved.<br>
      If you have any questions, simply reply to this email.
    </div>
  </div>
</body>
</html>
`;

export const contactMessageReceivedTemplate = (name, subject) => {
  const content = `
    <h2>Hi ${name},</h2>
    <p>Thank you for reaching out to us. We have received your message regarding:</p>
    <div class="highlight-box">
      <strong>${subject}</strong>
    </div>
    <p>Our team is currently reviewing your inquiry and will get back to you as soon as possible.</p>
    <p>We appreciate your interest in our properties!</p>
    <br/>
    <p>Best regards,<br><strong>The Real Estate Team</strong></p>
  `;
  return baseEmailTemplate('We received your message', content);
};

export const visitRequestReceivedTemplate = (name, date, time) => {
  const content = `
    <h2>Hi ${name},</h2>
    <p>Thank you for your interest! We have successfully received your request to schedule a property visit.</p>
    <div class="highlight-box">
      <p style="margin: 0 0 10px 0;"><strong>Requested Date:</strong> ${date}</p>
      <p style="margin: 0;"><strong>Requested Time:</strong> ${time}</p>
    </div>
    <p>Our team will review availability for this time slot and send you a confirmation email shortly.</p>
    <br/>
    <p>Best regards,<br><strong>The Real Estate Team</strong></p>
  `;
  return baseEmailTemplate('Visit Request Received', content);
};

export const visitRequestConfirmedTemplate = (name, propertyTitle, date, time) => {
  const content = `
    <h2>Great news, ${name}!</h2>
    <p>Your property visit has been officially <strong>confirmed</strong>. We are excited to show you around!</p>
    <div class="highlight-box">
      <p style="margin: 0 0 10px 0;"><strong>Property:</strong> ${propertyTitle}</p>
      <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${date}</p>
      <p style="margin: 0;"><strong>Time:</strong> ${time}</p>
    </div>
    <p>Please arrive a few minutes early. Our agent will be waiting for you at the property.</p>
    <br/>
    <p>Best regards,<br><strong>The Real Estate Team</strong></p>
  `;
  return baseEmailTemplate('Your Visit is Confirmed', content);
};

export const adminNewVisitTemplate = (userName, propertyTitle, date, time) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #D29F54;">New Property Visit Request</h2>
      <p>A new user has scheduled a visit request for one of your properties.</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1a2b3c;">Details:</h3>
        <p><strong>Property:</strong> ${propertyTitle}</p>
        <p><strong>User:</strong> ${userName}</p>
        <p><strong>Requested Date:</strong> ${date}</p>
        <p><strong>Requested Time:</strong> ${time}</p>
      </div>
      
      <p>Please log in to the Admin Portal to review and confirm this request.</p>
      <a href="${process.env.CLIENT_URL}/admin/visits" style="display: inline-block; background-color: #1a2b3c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Request</a>
    </div>
  `;
};

export const adminNewMessageTemplate = (userName, subject, message) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #D29F54;">New Contact Message Received</h2>
      <p>A user has just submitted a new message via the contact form.</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1a2b3c;">Message Details:</h3>
        <p><strong>From:</strong> ${userName}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
          <p style="white-space: pre-wrap; font-style: italic; color: #555;">"${message}"</p>
        </div>
      </div>
      
      <p>Please log in to the Admin Portal to reply to this message.</p>
      <a href="${process.env.CLIENT_URL}/admin/messages" style="display: inline-block; background-color: #1a2b3c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Message</a>
    </div>
  `;
};
