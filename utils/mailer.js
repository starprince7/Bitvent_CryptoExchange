const path = require('path');
const ejs = require("ejs");
const Mailgun = require('mailgun.js')
const formData = require('form-data')
// require('dotenv').config()

const mailgun = new Mailgun(formData)
const MY_DOMAIN = process.env.DOMAIN

const auth_credentials = {
  username: 'api',
  key: process.env.MAILGUN_PRIVATE_KEY,
  url: 'https://api.eu.mailgun.net'
}
const client = mailgun.client(auth_credentials)


// Emailing Functions
// To new customer
async function sendEmailVerificationCode(customer, cB) {
  
  // Send The Reg. Mail Here
  const mail_options = {
    from: "Bitvent.io <no-reply@zenithbrokers.co.uk>",
    to: customer.email,
    subject: "Verify your Email",
    text: `Hello please use this code [ ${customer.verification_code} ] to verify your email address`,
  };   

  try {
    const mailSuccess = await client.messages.create(MY_DOMAIN, mail_options);
    mailSuccess && cB(null, mailSuccess)    /* call The Callback here on SUCCESS */
  } catch (e) {
    cB(e, null)   /* call The Callback here on ERROR */
  }
    
}

const sendEmailToAdmin = async (customer, cB) => {
  const mail_options = {
    from: "Coinvent <no-reply@zenithbrokers.co.uk>",
    to: 'princeagezinweke@gmail.com',
    subject: "New Transaction",
    text: `New SignUp\n
    \nEmail: ${customer.email}
    \nName: ${customer.firstname}
    \nCountry: ${customer.country}`
  };   

  
  try {
    const mailSuccess = await client.messages.create(MY_DOMAIN, mail_options);
    mailSuccess && cB(null, mailSuccess)    /* call The Callback here on SUCCESS */
  } catch (e) {
    cB(e, null)   /* call The Callback here on ERROR */
  }
     
}
  

module.exports = { sendEmailVerificationCode, sendEmailToAdmin };