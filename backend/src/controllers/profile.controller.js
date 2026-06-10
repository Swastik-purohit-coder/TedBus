const User = require('../models/User');
const Booking = require('../models/Booking');

const getProfile = async (req, res) => {

  try {

    const user = await User.findById(
      req.user._id
    );

    const bookingCount =
      await Booking.countDocuments({

        user: req.user._id

      });

    res.status(200).json({

      success: true,

      user,

      bookingCount

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {
  getProfile
};