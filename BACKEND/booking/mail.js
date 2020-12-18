require('dotenv').config();

const nodemailer = require('nodemailer');

//step 1
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

//step 2
let mailOptions = {
  from: 'blah@gmail.com',
  to: 'blah@gmail.com',
  subject: 'Booking Done Successfully via INDIAN RAILWAYS',
  text: "FOLLOW SAFETY NORMS WHILE TRAVELLING, DON'T FORGET TO GET YOUR TICKET"
};

//step 3
const sendMail = (err)=> {
  transporter.sendMail(mailOptions, (err, data) => {
    if(err){
      console.log(err);
      return 'error';
    }
    else{
      return "email sent";
    }
  });
};


// transporter.sendMail(mailOptions, (err, data) => {
//   if(err){
//     return console.log('error',err);
//   }
//   else{
//     return console.log("email send");
//   }
// });

module.exports = { sendMail };
