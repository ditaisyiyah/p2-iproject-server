const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { access_token: accessToken } = req.headers;
    const payload = verifyToken(accessToken);
    if(!payload) throw ({ name: 'InvalidToken' })

    req.user = {
      id: payload.id,
      email: payload.email,
    }

    next();

  } catch (err) {
    next(err)
  }
}

module.exports = authentication;