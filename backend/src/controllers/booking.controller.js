const Booking = require('../models/Booking');
const Bus = require('../models/Bus');

const createBooking = async (req, res) => {

  try {

    const {
      busId,
      passengerName,
      age,
      gender,
      phone,
      seats,
      amount
    } = req.body;

    const bus = await Bus.findById(busId);

    if (!bus) {

      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });

    }

    const alreadyBooked = seats.some(
      seat => bus.bookedSeats.includes(seat)
    );

    if (alreadyBooked) {

      return res.status(400).json({
        success: false,
        message: 'One or more seats already booked'
      });

    }

    bus.bookedSeats.push(...seats);

    bus.availableSeats =
      bus.totalSeats - bus.bookedSeats.length;

    await bus.save();

    const booking = await Booking.create({

      user: req.user._id,

      bus: busId,

      passengerName,

      age,

      gender,

      phone,

      seats,

      amount

    });

    res.status(201).json({

      success: true,

      booking

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const getMyBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({

      user: req.user._id

    }).populate('bus');

    res.status(200).json({

      success: true,

      count: bookings.length,

      bookings

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
const cancelBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });

    }

    if (
      booking.user.toString() !==
      req.user._id.toString()
    ) {

      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });

    }

    const bus = await Bus.findById(
      booking.bus
    );

    if (bus) {

      bus.bookedSeats =
        bus.bookedSeats.filter(

          seat =>
            !booking.seats.includes(seat)

        );

      bus.availableSeats =
        bus.totalSeats -
        bus.bookedSeats.length;

      await bus.save();

    }

    await Booking.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
        'Booking cancelled successfully'

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking
};