import Actions from '../helpers/actions';
import db from '../models';

export default class UsersController {
  static fetchAllUsers = async (req, res) => {
    const { userRole } = req.auth;
    const roleArray = ['super_admin', 'travel_admin', 'manager'];
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
}
