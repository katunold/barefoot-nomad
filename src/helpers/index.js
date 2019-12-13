import db from '../models';
import Jwt from './jwt';

export default class Verification {
  static generateVerificationCode = (user) => {
    const now = new Date();

    const timeHash = Buffer.from(now.toISOString()).toString('base64');

    const userString = this.getUserString(user);

    return `${timeHash}-${userString}`;
  };

  static getUserString = (user) => `${user.userId}`;

  static validateCode = async (res, code) => {
    const [timeHash, reqUserHash] = code.split('-');
    const timestamp = Buffer.from(timeHash, 'base64').toString('ascii');

    const diff = new Date(timestamp) - new Date();
    if (Math.abs(diff) > 3600000) {
      return res.status(404).send({ message: 'Token expired 😕' });
    }

    try {
      const verifyAccount = await db.User.update(
        {
          verified: true,
        },
        {
          returning: true,
          where: {
            userId: reqUserHash,
          },
          attributes: ['userId', 'firstName', 'lastName', 'email'],
        },
      );
      if (verifyAccount) {
        const { dataValues } = verifyAccount[1][0];
        const { token, exp, iat } = await Jwt.signToken(dataValues.userId);
        delete dataValues.userId;
        return res.status(200).send({
          message: `Your account has been verified 🎊`,
          user_data: dataValues,
          accessToken: token,
          expiresIn: exp - iat,
        });
      }

      return res.status(404).send({
        message: `Sorry, user not found. Kindly register to have a new account 🥺`,
      });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };
}
