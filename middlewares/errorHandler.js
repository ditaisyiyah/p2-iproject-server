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
    case 'FailedNews':
      code = 400;
      message = 'Failed To Load News';
      break;
    default:
      code = 500;
      message = 'Internal Server Error';
      break;
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;