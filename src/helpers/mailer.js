import sendGrid from '@sendgrid/mail';
import Verification from './index';

export default class Mailer {
  static sendVerification = (user, res) => {
    const token = Verification.generateVerificationCode(user);
    const emailBody = Mailer.verificationEmail(user, token);
    return Mailer.sendMail(emailBody, 'Verification', res);
  };

  static sendPasswordReset = (user, res) => {
    const token = Verification.generateVerificationCode(user);
    const emailBody = Mailer.passwordResetEmail(user, token);
    return Mailer.sendMail(emailBody, 'Password Reset', res);
  };

  static sendMail = async (emailBody, linkType, res) => {
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

    try {
      await sendGrid.send(emailBody);
      return res.status(200).send({
        message: `${linkType} link sent successfully 🤗, kindly check your email`,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Sorry something went wrong, it's not your fault 🥺",
        details: error,
      });
    }
  };

  static verificationEmail = (user, hash) => ({
    to: user.email,
    from: process.env.AUTH_EMAIL,
    subject: 'Barefoot nomad account verification',
    text: 'Verify your email to complete registration.',
    html: `
<h1 
style="
background-color:black; color:white;
padding: 5px; text-align:center;
">Barefoot nomad</h1>
<hr />
<h2>Hello, ${user.firstName}</h2>
<h3>
Please verify your email by clicking the link below: <br />
<a href="${process.env.MAIL_RETURN_URL}/?code=${hash}">Verify your Email</a>
</h3>
`,
  });

  static passwordResetEmail = (user, hash) => ({
    to: user.email,
    from: process.env.AUTH_EMAIL,
    subject: 'Barefoot nomad Password Reset Link',
    text: 'confirm and reset your password',
    html: `
<h1 
style="
background-color:black; color:white;
padding: 5px; text-align:center;
">Barefoot nomad</h1>
<hr />
<h2>Hello, ${user.firstName}</h2>
<h3>
Kindly click this link and follow steps to reset your password: <br />
<a href="${process.env.MAIL_RETURN_PASSWORD_RESET}/?code=${hash}">Reset Password</a>
</h3>
`,
  });
}
