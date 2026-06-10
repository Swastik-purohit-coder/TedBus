const Bus = require('../models/Bus');

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();

    res.status(200).json({
      success: true,
      count: buses.length,
      buses
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const searchBuses = async (req, res) => {
  try {

    const { source, destination } = req.query;

    const buses = await Bus.find({
      source: {
        $regex: source,
        $options: 'i'
      },
      destination: {
        $regex: destination,
        $options: 'i'
      }
    });

    res.status(200).json({
      success: true,
      count: buses.length,
      buses
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const createBus = async (req, res) => {
  try {

    const bus = await Bus.create(req.body);

    res.status(201).json({
      success: true,
      bus
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
const getBusById = async (req, res) => {
  try {

    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    res.status(200).json({
      success: true,
      bus
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getAllBuses,
  createBus,
  searchBuses,
  getBusById
};