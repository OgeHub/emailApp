require('dotenv').config();
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const transporter = require('./createTransporter');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const attachmentUpload = multer({
  storage,
}).single('attachment');

app.get('/', (req, res) => {
  res.sendFile('/public/index.html');
});

app.post('/sendEmail', (req, res) => {
  attachmentUpload(req, res, async (error) => {
    if (error) {
      console.log(err);
      return res.send('Error uploading file');
    } else {
      const recipient = req.body.email;
      const subject = req.body.subject;
      const message = req.body.message;
      const attachmentPath = req.file.path;

      // e-mail option
      let mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: recipient,
        subject,
        text: message,
        attachments: [
          {
            path: attachmentPath,
          },
        ],
      };

      try {
        // Method to send e-mail out
        let emailTransporter = await transporter();
        emailTransporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            // failed block
            console.log(error);
          } else {
            // Success block
            console.log('Email sent: ' + info.response);
            fs.unlink(attachmentPath, (err) => {
              if (err) {
                res.end(err);
              } else {
                console.log(`${attachmentPath} has been deleted`);
                return res.redirect('/success.html');
              }
            });
          }
        });
      } catch (err) {
        return console.log(error);
      }
    }
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
