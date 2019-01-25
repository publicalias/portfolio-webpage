"use strict";

//global imports

const { toPromise } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const nodemailer = require("nodemailer");

//send email

const sendEmail = (req) => () => {

  const contact = process.env.EMAIL_USER;

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

  const sender = nodemailer.createTransport(transport);

  return toPromise(sender, "sendMail", message);

};

//send res

const sendRes = (res) => () => {
  res.sendStatus(202);
};

//validate user

const validateUser = (body) => {

  const { success } = JSON.parse(body);

  if (!success) {
    throw Error("401 Unauthorized");
  }

};

//exports

module.exports = {
  sendEmail,
  sendRes,
  validateUser
};
