import { Router } from 'express';
import Jwt from '../helpers/jwt';
import NotificationsController from '../controllers/notifications.controller';
import { notificationValidation } from '../middlewares/validations/notifications.validation';

const router = Router();

router.put(
  '/',
  Jwt.requireSignIn,
  notificationValidation(),
  NotificationsController.updateNotifications,
);

router.get(
  '/',
  Jwt.requireSignIn,
  NotificationsController.getNotificationSettings,
);

export default router;
