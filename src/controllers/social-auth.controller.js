import Jwt from '../helpers/jwt';

export default class SocialAuthController {

  static googleAuth = (req, res) => {
    this.auth(res, req.user);
  };

  static facebookAuth = (req, res) => {
    this.auth(res, req.user);
  };

  static auth = (res, data) => {
    const { id, firstName } = data;
    return res.status(200).send({
      firstName,
      access_token: Jwt.signToken(id).token,
    })
  }

}
