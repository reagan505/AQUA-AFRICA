const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
require("dotenv").config();

admin.initializeApp();
const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
})

// FUNCTION TO SEND EMAILS TO USERS BOOKING FOR A LOCATION/STAY

exports.sendEmailToUsers = functions.firestore.document("usersBooking/{docId}").onCreate(async (snapshot) =>{
  const tourData = snapshot.data()
  const userEmail = tourData.email()

  const mailoptions = {
    from: process.env.USER_EMAIL,
    to: userEmail,
    subject: "WELCOME TO AQUA AFRICA TOURISM",
    text : "explore options at aqua africa",
  };

  try {
      await transporter.sendMail(mailoptions);
  } catch (error) {
      console.log("Error sending email", error)
  }
});



exports.sendEmailToUsersLogin = functions.firestore.document("userRegistrations{docId}").onCreate(async (snapshot) =>{
  const tourData = snapshot.data()
  const userEmail = tourData.email()

  const mailoptions = {
    from: process.env.USER_EMAIL,
    to: userEmail,
    subject: "WELCOME TO AQUA AFRICA TOURISM",
    text : "explore options at aqua africa",
  };

  try {
      await transporter.sendMail(mailoptions);
  } catch (error) {
      console.log("Error sending email", error)
  }
});