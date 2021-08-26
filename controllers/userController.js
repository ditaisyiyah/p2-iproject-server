const { checkPassword } = require('../helpers/bcrypt');
const getMessage = require('../helpers/email');
const { generateToken } = require('../helpers/jwt');
const transporter = require('../helpers/nodemailer');
const { User } = require('../models');

class userController{
  static async register(req, res, next){
    try {
      const { email, password } = req.body;
      const isAlreadyRegistered = await User.findOne({ where: { email } })
      if(isAlreadyRegistered) throw ({ name: 'AlreadyRegistered' })

      const user = await User.create({ email, password })

      const access_token = generateToken({ 
        id: user.id,
        email: user.email, 
        password: user.password 
      });

      console.log('---------asteroid siap dikirim ke email user', asteroid);
      const payload = { email: user.email, asteroid }
      const message = getMessage(payload)

      transporter.sendMail(message, (err, info) => {
        // console.log('----------err send email', err, info);
        if(err) {
          throw ({ name: 'FailedSendEmail' }) // TODO cari library utk auth email
      });

      res.status(201).json({ access_token });
      
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next){
    try {
      const { email, password, asteroid } = req.body;
      const user = await User.findOne({ where: { email } });
      if(!user) throw ({ name: 'InvalidLogin' });

      const isPasswordValid = checkPassword(password, user.password);
      if(!isPasswordValid) throw ({ name: 'InvalidLogin' });

      const access_token = generateToken({ 
        id: user.id,
        email: user.email, 
        password: user.password 
      });

      console.log('---------asteroid siap dikirim ke email user', asteroid);
      const payload = { email: user.email, asteroid }
      const message = getMessage(payload)

      transporter.sendMail(message, (err, info) => {
        // console.log('----------err send email', err, info);
        if(err) {
          throw ({ name: 'FailedSendEmail' }) // TODO cari library utk auth email
        }
      });
      
      res.status(200).json({ access_token });
      
    } catch (err) {
      console.log(err.message);
      next(err)
    }
  }

  static async getProfile(req, res, next){
    try {
      const { id, email } = req.user;
      res.status(200).json({ id, email });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;