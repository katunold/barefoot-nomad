import { Router } from 'express';
import passport from 'passport';
import RegisterController from '../controllers/register.controller';
import LoginController from '../controllers/login.controller';
import ResetController from '../controllers/reset.controller';
import SocialAuthController from '../controllers/social-auth.controller';
import Jwt from '../helpers/jwt';
import UserProfileController from '../controllers/user-profile.controller';
import { userRegisterValidation } from '../middlewares/validations/user-register.validation';
import { userLoginValidation } from '../middlewares/validations/user-login.validation';
import { userProfileUpdateValidation } from '../middlewares/validations/user-profile-update.validation';
import { userPasswordValidation } from '../middlewares/validations/user-password.validation';

const router = Router();
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', {
  session: false,
});

router.post('/register', userRegisterValidation(), RegisterController.register);
router.get('/verify-email', RegisterController.accountVerification);
router.post(
  '/resend',
  userPasswordValidation('resend-email'),
  RegisterController.resendVerificationEmail,
);
router.post('/login', userLoginValidation(), LoginController.login);
router.post(
  '/reset-password',
  userPasswordValidation('reset-password'),
  ResetController.passwordReset,
);
router.put(
  '/new-password',
  userPasswordValidation('new-password'),
  ResetController.newPassword,
);
router.post('/google', passportGoogle, SocialAuthController.googleAuth);
router.post('/facebook', passportFacebook, SocialAuthController.facebookAuth);
router.get('/profile', Jwt.requireSignIn, UserProfileController.getUserProfile);
router.put(
  '/profile',
  Jwt.requireSignIn,
  userProfileUpdateValidation(),
  UserProfileController.updateUserProfile,
);

export default router;
