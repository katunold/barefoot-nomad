import Actions from '../helpers/actions';
import db from '../models';
import { validationResult } from 'express-validator';
import { errorDisplay } from '../middlewares/validations';

export default class UserProfileController {
  static getUserProfile = async (req, res, next) => {
    const { sub } = req.auth;
    try {
      const userProfile = await Actions.findData(db.User, { id: sub }, [
        'id',
        'profilePic',
        'firstName',
        'lastName',
        'email',
        'gender',
        'birthDate',
        'residence',
        'role',
        'department',
        'lineManagerId',
        'preferredLanguage',
        'preferredCurrency',
        'createdAt',
        'updatedAt',
      ]);
      return res.status(200).send(userProfile);
    } catch (error) {
      next(error);
    }
  };

  static updateUserProfile = async (req, res, next) => {
    const { auth, body } = req;
    const keyArray = Object.keys(body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorDisplay(req, res, errors);
    }
    if (keyArray.includes('gender')) {
      body.gender = body.gender.toUpperCase();
    }
    if (keyArray.includes('role')) {
      body.role = body.role.toLowerCase();
    }

    try {
      const response = await Actions.updateData(
        db.User,
        body,
        [
          'profilePic',
          'firstName',
          'lastName',
          'email',
          'gender',
          'birthDate',
          'residence',
          'department',
          'lineManagerId',
          'preferredLanguage',
          'preferredCurrency',
        ],
        { id: auth.sub },
        [
          'id',
          'profilePic',
          'firstName',
          'lastName',
          'email',
          'gender',
          'birthDate',
          'residence',
          'role',
          'department',
          'lineManager',
          'preferredLanguage',
          'preferredCurrency',
          'createdAt',
          'updatedAt',
        ],
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };
}
