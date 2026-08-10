import { ENV } from './config/env.js';
import sendEmail from './utils/sendEmail.js';

(async () => {
  console.log("Testing email with:");
  console.log("Host:", ENV.SMTP_HOST);
  console.log("Port:", ENV.SMTP_PORT);
  console.log("User:", ENV.SMTP_USER ? 'Set' : 'Not Set');
  
  const result = await sendEmail({
    email: 'codelyte0@gmail.com',
    subject: 'Test Email Admin Alert',
    html: '<h1>Test from server</h1>'
  });
  console.log("SendEmail returned:", result);
})();
