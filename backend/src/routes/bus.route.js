const express = require('express');

const router = express.Router();

const {
  getAllBuses,
  createBus,
  searchBuses,
  getBusById
} = require('../controllers/bus.controller');

router.get('/search', searchBuses);

router.get('/:id', getBusById);

router.get('/', getAllBuses);

router.post('/', createBus);

module.exports = router;