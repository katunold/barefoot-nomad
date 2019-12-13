import * as JWT from 'jsonwebtoken';

export default class Jwt {
  static signToken = (userId) => {
    const iat = new Date().getTime();
    const exp = new Date().setDate(new Date().getDate() + 1);
    const { JWT_SECRET, JWT_ISSUER } = process.env;
    const token = JWT.sign(
      {
        iss: JWT_ISSUER,
        sub: userId,
        iat,
        exp,
      },
      JWT_SECRET,
    );

    return { token, exp, iat };
  };
}
