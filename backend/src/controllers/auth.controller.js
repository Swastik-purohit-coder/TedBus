const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const loginDemo = async (req, res) => {

  try {

    let user = await User.findOne({
      email: 'demo@tedbus.com'
    });

    if (!user) {

      user = await User.create({

        name: 'Demo User',

        email: 'demo@tedbus.com'

      });

    }

    const token = generateToken(user._id);

    res.status(200).json({

      success: true,

      user,

      token

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const googleSuccess = async (req, res) => {

  const token =
    generateToken(req.user._id);

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:4200';

  res.redirect(
    `${clientUrl}/login-success?token=${token}`
  );

};

module.exports = {
  loginDemo,
  googleSuccess
};