import Actions from '../helpers/actions';
import db from '../models';

export default class UsersController {
  static fetchAllUsers = async (req, res) => {
    const { userRole } = req.auth;
    const roleArray = ['super-admin-user', 'travel_admin', 'manager'];
    if (roleArray.includes(userRole)) {
      const response = await Actions.fetchAll(db.User, {}, [
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
        'strategy',
        'verified',
      ]);

      return res.status(200).send(response);
    }

    return res
      .status(401)
      .send({ message: 'You are not authorised to view all users ❌' });
  };

  static assignUserANewRole = async (req, res) => {
    const { auth, params, body } = req;

    if (auth.sub !== 'super-admin-user') {
      return res
        .status(401)
        .send({ message: 'You are not authorised to assign a role ❌' });
    }

    const user = await Actions.findData(db.User, { id: params.id });
    if (user) {
      const update = await Actions.updateData(db.User, body, ['role'], {
        id: params.id,
      });
      return res.status(200).send(update);
    }

    return res
      .status(404)
      .send({ message: `user with id ${params.id} not found` });
  };
}
