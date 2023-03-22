import {google} from "googleapis";
import nodemailer from "nodemailer";

const CLIENT_ID =  "978827148256-p2c928abp5gck3t1a4t0vsbi8rivnrcc.apps.googleusercontent.com"
const CILENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN ="1//0489-2Q6n4HIcCgYIARAAGAQSNwF-L9IrUs-f98Vg82_PLFa76HF7KeRtwvR0UF8N9UAgLy5A7uZKJ3NY5g7L-w8xFS8Eo4Vckkw"

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CILENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export default async function sendMail(data) {
  try {
    const {email,token}=data
    const accessToken = await oAuth2Client.getAccessToken()

        const transport=nodemailer.createTransport({
            service:'gmail',
      auth: {
        type: "OAuth2",
        user: "dhanashripatil505@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CILENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      form: "dhanashripatil205@gmail.com",
      to: email,
      subject: "Reset Password",
      text: "Reset Password",
      html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/api/v1/users/resetPassword/${token}">click here</a></h1>`,
    };

       const result = await transport.sendMail(mailOptions);
    return result;
  } catch{
    throw new Error("Failed to send Email")
  }
}

  
