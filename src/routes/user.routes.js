import { Router } from 'express';
import RegisterController from '../controllers/register.controller';
import Validations from '../middlewares/validation';
import LoginController from '../controllers/login.controller';
import ResetController from '../controllers/reset.controller';

const router = Router();

router.post(
  '/register',
  Validations.validityCheck('register'),
  RegisterController.register,
);
router.get('/verify-email', RegisterController.accountVerification);
router.post(
  '/resend',
  Validations.validityCheck('resend'),
  RegisterController.resendVerificationEmail,
);
router.post(
  '/login',
  Validations.validityCheck('login'),
  LoginController.login,
);
router.post(
  '/reset-password',
  Validations.validityCheck('reset-password'),
  ResetController.passwordReset,
);
router.put(
  '/new-password',
  Validations.validityCheck('new-password'),
  ResetController.newPassword,
);

export default router;
