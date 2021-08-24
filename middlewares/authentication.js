const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { access_token: accessToken } = req.headers;
    const payload = verifyToken(accessToken);
    if(!payload) throw ({ name: 'InvalidToken' })

    req.user = {
      email: payload.email,
      password: payload.password
    }

    next();

  } catch (err) {
    next(err)
  }
}

module.exports = authentication;