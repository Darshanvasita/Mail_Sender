// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// const app = express();
// const port = 4000;

// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   next();
// });

// function sendEmail({ email, subject, message }) {
//   return new Promise((resolve, reject) => {
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       //   secure: false, // true for port 465, false for other ports
//       auth: {
//         user: "akshay.codecrew@gmail.com",
//         pass: "dvnajpxoelejhlil",
//       },
//     });

//     const mail_configs = {
//       from: email, // sender address
//       to: "akshay.codecrew@gmail.com", // list of receivers
//       subject: subject,
//       text: message, // plain text body
//     };

//     transporter.sendMail(mail_configs, (err, info) => {
//       if (err) {
//         console.log(err);
//         return reject({ message: "Error sending email", error: err });
//       } else {
//         return resolve({
//           message: "Email sent successfully",
//         });
//       }
//     });
//   });
// }

// app.post("/", (req, res) => {
//   sendEmail(req.body) // Use `req.body` instead of `req.query` for POST data
//     .then((response) => {
//       res.send(response.message);
//     })
//     .catch((err) => {
//       res.send(err.message);
//     });
// });

// app.listen(port, () => {
//   console.log(`nodemailer is listening on http://localhost:${port}`);
// });

// second try
// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();
// const port = 4000;

// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// function sendEmail({ email, subject, message }) {
//   return new Promise((resolve, reject) => {
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "akshay.codecrew@gmail.com", // Your email address
//         pass: "dvnajpxoelejhlil", // Your email app password or OAuth2 token
//       },
//     });

//     const mail_configs = {
//       from: "akshay.codecrew@gmail.com", // This should be your email address
//       to: "akshay.codecrew@gmail.com", // Your email address where you want to receive the email
//       subject: subject,
//       text: message, // User's message
//       replyTo: email, // This is where the user’s email will be placed
//     };

//     transporter.sendMail(mail_configs, (err, info) => {
//       if (err) {
//         console.log(err);
//         return reject({ message: "Error sending email", error: err });
//       } else {
//         return resolve({ message: "Email sent successfully" });
//       }
//     });
//   });
// }

// // Handle POST requests
// app.post("/", (req, res) => {
//   sendEmail(req.body) // Use body for POST request data
//     .then((response) => {
//       res.send(response.message);
//     })
//     .catch((err) => {
//       res.send(err.message);
//     });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// third try

// Got it! You want to set the email's from field to the user's email (in this case, palakshay3091@gmail.com) while ensuring that replies go back to your email (akshay.codecrew@gmail.com).

// Unfortunately, most email providers, including Gmail, will not allow you to send an email from an address you don't own (like palakshay3091@gmail.com), because it could lead to email spoofing. This is a security measure to prevent malicious activity.

// However, you can work around this limitation by doing the following:

// Use your email (the one you authenticate with) as the from address.
// Set the replyTo to the user's email address, so any replies are sent to their email.
// But if you really need to send the email from the user's email address, one approach is to use a service that allows you to send emails as another person with proper authentication (like SendGrid, Mailgun, or Amazon SES), which would allow you to "send as" another email address, provided the service is configured for that.

// For Now: Sending Email With Your Email as the "From" Address
// You’ll have to send the email from your email (as previously mentioned), but set the replyTo to the user's email address. This way, the user will get replies, even though the email is technically coming from you.

// Here’s how to set this up:

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
// Expected Outcome:
// From: akshay.codecrew@gmail.com (your email address)
// Reply-To: palakshay3091@gmail.com (user's email address)
// To: akshay.codecrew@gmail.com (your email address, where the email is being sent)
// Subject: Whatever the user enters
// Message: The message content the user provided
// Why Can't We Send From the User's Email Directly?
// Again, this is a security restriction that prevents "email spoofing." If you wanted to send the email from the user’s email address, you’d need to either:

// Use SMTP services (like SendGrid, Mailgun, or Amazon SES) to configure the ability to send as a user, with proper authentication in place.
// Or, you could have the user send an email directly using their email provider’s SMTP service, but that would require their email credentials.
// Using a Service Like SendGrid (Optional Advanced Setup)
// If you're serious about sending emails from users' email addresses (with proper authentication), you could use a service like SendGrid, which allows you to configure email sending on behalf of another user. It requires setting up the user’s domain or email address as an authorized sender, which is a bit more complex but feasible.

// If you'd like more information on that or need help setting it up, let me know!

// Let me know if this works for you or if you’d like to explore a different solution!
