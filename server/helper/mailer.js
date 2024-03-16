const nodeMailer = require('nodemailer');

class SendEmail {
  static transPorter() {
    let transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'farrel.mailer@gmail.com',
        pass: 'zduhdobniyrfxrsm',
      },
    });
    return transporter;
  }

  static message(emailSend, id,token) {
    let mailOption = {
      from: 'farrel.mailer@gmail.com',
      to: emailSend,
      subject: 'Forget Password',
      text: `http://localhost:5173/new-password/${id}/${token}`,
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