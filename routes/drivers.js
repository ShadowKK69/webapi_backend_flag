const express = require('express');
const { getDrivers, getDriver, getDriverByDate, getDriverByVehiclePlate, updateDriver, createDriver, deleteDriver } = require('../controllers/drivers');

const router = express.Router();

router.route('/date').get(getDriverByDate);

router.route('/plate/:vehiclePlate').get(getDriverByVehiclePlate);

router.route('/:id').get(getDriver).put(updateDriver).delete(deleteDriver);

router.route('/').get(getDrivers).post(createDriver);




module.exports = router;