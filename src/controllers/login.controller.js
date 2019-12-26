import { validationResult } from 'express-validator';
import db from '../models';
import Actions from '../helpers/actions';
import Jwt from '../helpers/jwt';
import Validations from '../middlewares/validation';

export default class LoginController {
  static login = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }

    const user = await Actions.findData(db.User, { email }, [
      'userId',
      'firstName',
      'lastName',
      'email',
      'verified',
      'password',
    ]);

    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ error: "User doesn't exist." }] });
    }
    if (!user.verified) {
      return res.status(403).json({
        errors: [
          { error: 'Please verify your email. Check your inbox for the link.' },
        ],
      });
    }
    const validPassword = await user.validatePassword(password);
    delete user.dataValues.password;

    return validPassword
      ? res.status(200).send({
          success: 'Successfully logged in',
          userData: user,
          access_token: Jwt.signToken(user.userId).token,
        })
      : res
          .status(400)
          .json({ errors: [{ error: 'Email or Password is invalid.' }] });
  };
}
