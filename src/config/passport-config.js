import passport from 'passport';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import dotenv from 'dotenv';
import Actions from '../helpers/actions';
import db from '../models';

// Google OAUTH strategy
dotenv.config();
passport.use(
  'googleToken',
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      await newSocialAccount(profile, done);
    },
  ),
);

// Facebook OAUTH strategy
passport.use(
  'facebookToken',
  new FacebookTokenStrategy(
    {
      clientID: process.env.facebookClientID,
      clientSecret: process.env.facebookClientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      await newSocialAccount(profile, done);
    },
  ),
);

const newSocialAccount = async (profile, done) => {
  const data = {
    socialId: profile.id,
    firstName: profile.name.familyName,
    lastName: profile.name.givenName,
    email: profile.emails[0].value,
    profilePic: profile.photos[0].value,
    verified: true,
    strategy: profile.provider,
  };
  try {
    const user = await Actions.findOrCreate(
      db.User,
      { id: data.socialId, strategy: data.strategy },
      data,
    );
    done(null, user[0]);
  } catch (error) {
    done(error, false);
  }
};

export default passport;
