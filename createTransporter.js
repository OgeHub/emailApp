const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Pull out OAuth2 from googleapis
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  // 1
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  // 2
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Failed to create access token :( ' + err);
      }
      resolve(token);
    });
  });

  // 3
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.SENDER_EMAIL,
      accessToken,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });

  // 4
  return transporter;
};

module.exports = createTransporter;
