export default class Verification {
  static generateVerificationCode = (user) => {
    const now = new Date();

    const timeHash = Buffer.from(now.toISOString()).toString('base64');

    const userString = this.getUserString(user);

    return `${timeHash}-${userString}`;
  };

  static getUserString = (user) => `${user.id}`;

  static validateCode = async (res, code) => {
    const [timeHash, reqUserHash] = code.split('-');
    const timestamp = Buffer.from(timeHash, 'base64').toString('ascii');

    const diff = new Date(timestamp) - new Date();
    if (Math.abs(diff) > 3600000) {
      return [false];
    }

    return [true, reqUserHash];
  };
}
