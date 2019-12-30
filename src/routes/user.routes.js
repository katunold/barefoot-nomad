import { Router } from 'express';
import passport from 'passport';
import RegisterController from '../controllers/register.controller';
import Validations from '../middlewares/validation';
import LoginController from '../controllers/login.controller';
import ResetController from '../controllers/reset.controller';
import SocialAuthController from '../controllers/social-auth.controller';
import Jwt from '../helpers/jwt';
import UserProfileController from '../controllers/user-profile.controller';

const router = Router();
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', {
  session: false,
});

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
router.post('/google', passportGoogle, SocialAuthController.googleAuth);
router.post('/facebook', passportFacebook, SocialAuthController.facebookAuth);
router.get('/profile', Jwt.requireSignIn, UserProfileController.getUserProfile);
router.put(
  '/profile',
  Jwt.requireSignIn,
  Validations.validityCheck('profile-update'),
  UserProfileController.updateUserProfile,
);

export default router;
