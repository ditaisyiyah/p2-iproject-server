"use strict";
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'ditahacktiv@gmail.com',
    pass: process.env.NODEMAILER_SENDER_PASSWORD,
  },
});

module.exports = transporter;