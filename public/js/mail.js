const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


const auth = {
	auth: {
		api_key: '',
		domain: ''
	}
};

const mailgunner = require('mailgun-js')({apiKey: auth.auth.api_key, domain: auth.auth.domain});



const transporter = nodemailer.createTransport(mailGun(auth));


const sendingMail = (email, subject, text, cb) => {
	
	const mailOptions = {
		from: email,
		to: 'indiewindoe@gmail.com',
		subject,
		text
	};

	const recievedMessage = {
  		from: 'Daniel@thealmighty.digital',
  		to: email,
  		subject,
  		text: 'Thanks for Reaching out to The Almight Digital. We will get back to you soon!'
	};

	transporter.sendMail(mailOptions, function (err, data) {
		if(err){
			cb(err, null);
		} else {
				cb(null, data);
		}	
	});
	mailgunner.messages().send(recievedMessage, function (error, body) {
  		console.log(body);
  		console.log("We have sent an email to User");
	});
}

module.exports = sendingMail;