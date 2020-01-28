import Actions from '../helpers/actions';
import db from '../models';
import { validationResult } from 'express-validator';
import { errorDisplay } from '../middlewares/validations';

export default class NotificationsController {
  static updateNotifications = async (req, res) => {
    const { auth, body } = req;
    const values = Object.keys(body);
    const permit = ['isInAppNotification', 'isEmailNotification'];
    let validInputFields;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorDisplay(req, res, errors);
    }

    validInputFields = values.every((item) => permit.includes(item));

    if (validInputFields) {
      const response = await Actions.updateData(
        db.NotificationPreference,
        body,
        permit,
        { userId: auth.sub },
      );

      return res.status(200).send(response);
    }

    return res.status(400).send({
      message: 'You used invalid input fields',
      acceptedInputFields: permit,
    });
  };

  static getNotificationSettings = async (req, res) => {
    const { sub } = req.auth;

    // const response = await Actions.findData(db.NotificationPreference, {
    //   userId: sub,
    // });

    const resp = await db.NotificationPreference.findOne({
      where: {
        userId: sub,
      },
      include: [
        {
          model: db.Notification,
          foreignKey: 'notificationPreferenceId',
        },
      ],
    });

    return res.status(200).send(resp);
  };
}
