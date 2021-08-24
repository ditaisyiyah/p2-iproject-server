const { checkPassword } = require('../helpers/bcrypt');
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
        email: user.email, 
        password: user.password 
      });

      transporter.sendMail({
        from: '"UNIVERSE CODE" <no-reply@universecode.com>',
        to: user.email,
        subject: "An Asteroid Close Approach You! ",
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }, (err, info) => {
        // console.log('----------err send email', err, info);
        if(err) {
          throw ({ name: 'FailedSendEmail' })
        }
      });

      res.status(201).json({ access_token });
      
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next){
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if(!user) throw ({ name: 'InvalidLogin' });

      const isPasswordValid = checkPassword(password, user.password);
      if(!isPasswordValid) throw ({ name: 'InvalidLogin' });

      const access_token = generateToken({ 
        email: user.email, 
        password: user.password 
      });

      transporter.sendMail({
        from: '"UNIVERSE CODE" <no-reply@universecode.com>',
        to: user.email,
        subject: "An Asteroid Close Approach You! ",
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }, (err, info) => {
        // console.log('----------err send email', err, info);
        if(err) {
          throw ({ name: 'FailedSendEmail' })
        }
      });
      
      res.status(200).json({ access_token });
      
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController;