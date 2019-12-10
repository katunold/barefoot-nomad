import sendGrid from '@sendgrid/mail';

export default class Mailer {
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
}
