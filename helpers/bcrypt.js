const bcrypt = require('bcrypt');

function hashPassword (plainPassword){
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPassword, salt);
}
function checkPassword (plainPassword, hashedPassword){
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = { hashPassword, checkPassword }