const nodeMailer = require('nodemailer');

class SendEmail {
  static transPorter() {
    let transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'farrel.mailer@gmail.com',
        pass: process.env.MAILER_PASS,
      },
    });
    return transporter;
  }

  static message(emailSend, id,token) {
    let mailOption = {
      from: 'farrel.mailer@gmail.com',
      to: emailSend,
      subject: 'Forget Password',
      text: `https://client-iproject.farreldevara.online/new-password/${id}/${token}`,
    };
    this.transPorter().sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info.response);
      }
    });
  }

  static afterPayment(emailSend, movieName) {
    let mailOption = {
      from: 'farrel.mailer@gmail.com',
      to: emailSend,
      subject: 'Wadidaw Theater Payment',
      text: `Thank you for purchasing tickets for the film ${movieName}`,
    };
    this.transPorter().sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info.response);
      }
    });
  }

}


module.exports = SendEmail;