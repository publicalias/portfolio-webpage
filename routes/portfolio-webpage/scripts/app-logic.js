"use strict";

//node modules

const nodemailer = require("nodemailer");

//send email

const sendEmail = (req, res) => (err, status, body) => {

  const contact = process.env.EMAIL_USER;
  const success = JSON.parse(body).success;

  const transport = {
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: contact,
      pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 3000
  };

  const message = {
    from: `Ethan Frost <${contact}>`,
    to: req.body.email,
    cc: contact,
    subject: req.body.subject,
    text: `Your message to ${contact}:\n\n${req.body.body}`
  };

  if (err) {
    res.sendStatus(502);
  } else if (success === false) {
    res.sendStatus(403);
  } else {
    nodemailer.createTransport(transport).sendMail(message, (err) => {
      res.sendStatus(err ? 500 : 202);
    });
  }

};

//exports

module.exports = { sendEmail };
