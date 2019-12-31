import Actions from '../helpers/actions';
import db from '../models';
import { validationResult } from 'express-validator';
import { errorDisplay } from '../middlewares/validations';

export default class UserProfileController {
  static getUserProfile = async (req, res, next) => {
    const { sub } = req.auth;
    try {
      const userProfile = await Actions.findData(db.User, { userId: sub }, [
        'userId',
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
      ]);
      return res.status(200).send(userProfile);
    } catch (error) {
      next(error);
    }
  };

  static updateUserProfile = async (req, res, next) => {
    const { auth, body } = req;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorDisplay(req, res, errors);
    }
    try {
      const response = await Actions.updateData(db.User, body, [
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
        ],
        { userId: auth.sub},
        [
          'userId',
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
        ]
        );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  };
}
