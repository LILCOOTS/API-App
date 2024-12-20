// Import SendGrid module
const sendGrid = require("@sendgrid/mail");

// Set SendGrid API key from environment variable
const sendGridApiKey = process.env.SGMAIL_API_KEY;
sendGrid.setApiKey(sendGridApiKey);

// Function to send a welcome email
const sendWelcomeEmail = async (
  recipientEmail,
  recipientUsername,
  confirmationLink,
) => {
  try {
    const emailMessage = {
      to: recipientEmail,
      from: "omasanani02@gmail.com",
      subject: "Confirmation of the signup request",
      html: `
        <h1>Welcome, ${recipientUsername}!</h1>
        <p>Thank you for signing up. Please confirm your email by clicking the link below:</p>
        <a href="${confirmationLink}" style="color: blue; text-decoration: underline;">
          Confirm Your Email
        </a>
        <p>If you did not request this signup, please ignore this email.</p>
      `,
    };

    const response = await sendGrid.send(emailMessage);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error.response);
  }
};

module.exports = sendWelcomeEmail;
