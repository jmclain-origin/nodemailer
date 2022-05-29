if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(
    `nodemailerProject is listening at ${PORT} and running in ${process.env.NODE_ENV}mode`
  );
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

app.post("/send-email", (req, res) => {
  const mailOptions = {
    from: "joshmclain@no-reply.com",
    to: ["jrmclain85@gmail.com"],
    subject: "Nodemailer Project",
    text: "Hi from your nodemailer project",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    console.log(data);
    if (err) {
      console.log("Error " + err);
      throw err;
    } else {
      console.log("Email sent successfully");

      return;
    }
  });

  return res.json({ msg: 'email sent' }).status(200);
});
