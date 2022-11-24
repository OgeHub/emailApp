# emailApp

**Description**: This is simple emailing application.

### How it works: 
 1. Enter the email address you want to send email to.
 2. Enter  the email subject
 3. Enter the email
 4. Attach a single file
 5  Click on the send button.
 
### Major technologies:
 - NodeJS
 - Express.js
 - Nodemailer
 - Googleapis
 - Multer
 
 ### To use the app locally on your PC:
 - Clone the repo
 - Install all the packages (run `npm install` on your terminal)
 - Create a .env file
 - Set all the environment variables as seen in .env.example file
      1. Choose any port (e.g 3000)
      2. Register on [Google Cloud Platform](https://console.cloud.google.com)
      3. Create a project, and obtain your client ID and client secret.
      4. Goto the [Google playground](https://developers.google.com/oauthplayground) to generate your refresh token
 - Run `npm run dev` on your terminal
 
 
 ### Upcoming updates:
 1. Sending email without attachment
 2. Sending email with multiple attachments (not more than 5).
  

