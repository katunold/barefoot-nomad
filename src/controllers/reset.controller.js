import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Actions from '../helpers/actions';
import db from '../models';
import Validations from '../middlewares/validation';
import Mailer from '../helpers/mailer';
import Verification from '../helpers';

export default class ResetController {
  static passwordReset = async (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }

    const user = await Actions.findData(db.User, { email });

    if (!user) {
      return res
        .status(404)
        .send({ errors: [{ error: "User doesn't exist." }] });
    }
    return user.verified
      ? Mailer.sendPasswordReset(user, res)
      : res.status(403).json({
          errors: [
            {
              error: 'Please verify your email. Check your inbox for the link.',
            },
          ],
        });
  };

  static newPassword = async (req, res) => {
    const { password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }
    const newPassword = await bcrypt.hashSync(password, 8);
    const valid = await Verification.validateCode(res, req.query.code);
    if (valid[0]) {
      const updatedRecord = await Actions.updateData(
        db.User,
        { password: newPassword },
        ['password'],
        { userId: valid[1] },
        null,
        false,
      );

      return updatedRecord
        ? res.status(200).send({
            message:
              'Password Successfully updated 🎊, You can login with you new password',
          })
        : res.status(404).send({
            message: 'User not found 🥺, Kindly sign-up and login',
          });
    }

    return res.status(400).send({ message: 'Token expired 😕' });
  };
}
