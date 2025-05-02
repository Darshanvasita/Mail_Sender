
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

function sendEmail({ email, subject, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail as your email provider
      auth: {
        user: "akshay.codecrew@gmail.com", // Your email (the one you authenticate with)
        pass: "dvnajpxoelejhlil", // Your Gmail app password or OAuth2 token
      },
    });

    const mail_configs = {
      from: "email", // Send the email from your Gmail address
      to: "akshay.codecrew@gmail.com", // Your email address to receive the message
      subject: subject,
      text: message, // The message content entered by the user
      replyTo: email, // The user's email address will be used for replies
    };

    transporter.sendMail(mail_configs, (err, info) => {
      if (err) {
        console.log(err);
        return reject({ message: "Error sending email", error: err });
      } else {
        return resolve({ message: "Email sent successfully" });
      }
    });
  });
}

// Handle POST requests
app.post("/", (req, res) => {
  sendEmail(req.body) // Use body for POST request data
    .then((response) => {
      res.send(response.message);
    })
    .catch((err) => {
      res.send(err.message);
    });
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
