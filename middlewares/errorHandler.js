function errorHandler(err, req, res, next) {
  let code = 0;
  let message = '';
  
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      code = 400;
      message = err.errors[0].message;
      break;
    case 'SequelizeValidationError':
      code = 400;
      message = err.errors[0].message;
      break;
    case 'AlreadyRegistered':
      code = 400;
      message = 'You already registered';
      break;
    case 'FailedPicture':
      code = 400;
      message = 'Failed to get astronomy picture data';
      break;
    case 'FailedAsteroid':
      code = 400;
      message = 'Failed to get asteroid data';
      break;
    case 'FailedNews':
      code = 400;
      message = 'Failed to get news data';
      break;
    case 'FailedSendEmail':
      code = 400;
      message = 'Ensure Your Email Is Valid/Active';
      break;
    case 'InvalidToken':
      code = 401;
      message = 'Invalid token';
      break;
    case 'InvalidLogin':
      code = 401;
      message = 'Invalid email and/or password';
      break;
    default:
      code = 500;
      message = 'Internal server error';
      break;
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;