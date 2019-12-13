import { validationResult } from 'express-validator';
import db from '../models/index';
import Actions from '../helpers/actions';
import Validations from '../middlewares/validation';
import Mailer from '../helpers/mailer';
import Verification from '../helpers';

export default class RegisterController {
  static register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }

    const checkUser = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (checkUser) {
      return res.status(400).send({
        message: 'User with that email exists, sign up with a different email',
      });
    }

    const user = await Actions.addData(db.User, req.body, [
      'userId',
      'firstName',
      'lastName',
      'email',
      'password',
    ]);

    RegisterController.send(user, res);
  };

  static accountVerification = async (req, res) => {
    await Verification.validateCode(res, req.query.code);
  };

  static resendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }
    const user = await db.User.findOne({
      where: {
        email,
        verified: false,
      },
    });
    if (user) {
      return RegisterController.send(user, res);
    }

    return res.status(400).send({
      message: `email ${email} not found, kindly sign-up to get started`,
    });
  };

  static send = (user, res) => {
    const token = Verification.generateVerificationCode(user);
    const emailBody = Mailer.verificationEmail(user, token);
    return Mailer.sendMail(emailBody, 'Verification', res);
  };
}
