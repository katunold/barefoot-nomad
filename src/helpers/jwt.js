import * as JWT from 'jsonwebtoken';
import expressJwt from 'express-jwt';

export default class Jwt {
  static signToken = (userId, userRole) => {
    const iat = new Date().getTime();
    const exp = new Date().setDate(new Date().getDate() + 1);
    const { JWT_SECRET, JWT_ISSUER } = process.env;
    const token = JWT.sign(
      {
        iss: JWT_ISSUER,
        sub: userId,
        userRole,
        iat,
        exp,
      },
      JWT_SECRET,
    );

    return { token, exp, iat };
  };

  static requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    requestProperty: 'auth',
  });
}
