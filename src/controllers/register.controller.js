import { validationResult } from 'express-validator';
import db from '../models/index';
import Actions from '../helpers/actions';
import Mailer from '../helpers/mailer';
import Verification from '../helpers';
import Jwt from '../helpers/jwt';
import { errorDisplay } from '../middlewares/validations';

export default class RegisterController {
  static register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorDisplay(req, res, errors);
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
    const user = await Actions.addData(
      db.User,
      Object.assign(req.body, { strategy: 'local' }),
      ['id', 'firstName', 'lastName', 'email', 'role', 'strategy', 'password'],
    );
    Actions.addData(db.NotificationPreference, { userId: user.dataValues.id }, [
      'userId',
    ]);
    Mailer.sendVerification(user, res);
  };

  static accountVerification = async (req, res) => {
    const valid = await Verification.validateCode(res, req.query.code);
    if (valid[0]) {
      try {
        const verifyAccount = await db.User.update(
          {
            verified: true,
          },
          {
            returning: true,
            where: {
              id: valid[1],
            },
            attributes: [
              'id',
              'firstName',
              'lastName',
              'email',
              'role',
              'lineManagerId',
            ],
          },
        );
        if (verifyAccount) {
          const { dataValues } = verifyAccount[1][0];
          const { token, exp, iat } = await Jwt.signToken(
            dataValues.id,
            dataValues.role,
            dataValues.lineManagerId,
          );
          delete dataValues.id;
          return res.status(200).send({
            message: `Your account has been verified 🎊`,
            user_data: dataValues,
            accessToken: token,
            expiresIn: exp - iat,
          });
        }

        return res.status(404).send({
          message: `Sorry, user not found. Kindly register to have a new account 🥺`,
        });
      } catch (error) {
        return res.status(500).send({ message: error });
      }
    }
    return res.status(400).send({ message: 'Token expired 😕' });
  };

  static resendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorDisplay(req, res, errors);
    }
    const user = await Actions.findData(db.User, {
      email,
      verified: false,
    });
    if (user) {
      return Mailer.sendVerification(user, res);
    }

    return res.status(400).send({
      message: `email ${email} not found, kindly sign-up to get started`,
    });
  };
}
