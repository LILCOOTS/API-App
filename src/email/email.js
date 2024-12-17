const sendGrid = require("@sendgrid/mail");
const sendgrid_api_key = process.env.SGMAIL_API_KEY;
sendGrid.setApiKey(sendgrid_api_key);

const sendWelcomeMail = async (toEmail, username, confirmationLink) => {
  try {
    msg = {
      to: toEmail,
      from: "omasanani02@gmail.com",
      subject: "Confirmation of the signup request",
      html: `
        <h1>Welcome, ${username}!</h1>
        <p>Thank you for signing up. Please confirm your email by clicking the link below:</p>
        <a href="${confirmationLink}" style="color: blue; text-decoration: underline;">
          Confirm Your Email
        </a>
        <p>If you did not request this signup, please ignore this email.</p>
      `,
    };

    const response = await sendGrid.send(msg);
    console.log(response);
  } catch (e) {
    console.log(e.response);
  }
};

module.exports = sendWelcomeMail;
