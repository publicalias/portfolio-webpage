"use strict";

//global imports

const { toPromise } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const nodemailer = require("nodemailer");
const request = require("request-promise-native");

//handle form

const sendEmail = ({ email, subject, body }) => {

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
    to: email,
    cc: contact,
    subject,
    text: `Your message to ${contact}:\n\n${body}`
  };

  const sender = nodemailer.createTransport(transport);

  return toPromise(sender, "sendMail", message);

};

const handleForm = async (req, res) => {
  try {

    const data = await request({
      method: "POST",
      uri: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.API_RC_KEY}&response=${req.body.verify}&remoteip=${req.ip}`
    });

    const { success } = JSON.parse(data);

    if (success) {

      await sendEmail(req.body);

      res.sendStatus(202);

    } else {
      res.sendStatus(403);
    }

  } catch {
    res.sendStatus(502);
  }
};

//exports

module.exports = { handleForm };
