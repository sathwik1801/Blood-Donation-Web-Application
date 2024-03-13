
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bloodbud896@gmail.com',
    pass: 'liawviqwuhlklebb'
  }
});

var mailOptions = {
  from: 'bloodbud896@gmail.com',
  to: 'sathwikrachuri007@gmail.com',
  subject: 'Welcome to RAKTABīJ',
  text: `HI!
  Welcome to RAKTABīJ an online web application that will save many lives.
  WE congratulate you for taking part in a nobal deed.`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});