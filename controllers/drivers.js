const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Driver = require('../models/Driver');


// Get all drivers
exports.getDrivers = asyncHandler(async (req, res, next) => {
    const drivers = await Driver.find();

    res.status(200).json({
        success: true,
        count: drivers.length,
        data: drivers
    });
});


// Get driver by id
exports.getDriver = asyncHandler(async (req, res, next) => {
    const driver = await Driver.findById(req.params.id)

    if(!driver) {
        return next(new ErrorResponse(`Driver not found with id of ${req.params.id}`, 404));      
    }

    res.status(200).json({
        success: true,
        data: driver
    });
});


// Get drivers by date
exports.getDriverByDate = asyncHandler(async (req, res, next) => {

    const { dateInit, dateEnd } = req.query;
    const startDate = new Date(dateInit);
    const endDate = new Date(dateEnd);

    const driver = await Driver.find({
        'drivingHistory.dateInit': {$gte: startDate},
        'drivingHistory.dateEnd': {$lte: endDate},
    });

    if (isNaN(startDate) || isNaN(endDate)) {
        return next(new ErrorResponse('Invalid date format. Please provide valid start and end dates.', 400));
    }

    if(driver.length === 0) {
        return next(new ErrorResponse(`No drivers found with trips within the date range ${startDate} to ${endDate}`, 404));      
    }

    res.status(200).json({
        success: true,
        count: driver.length,
        data: driver
    });
});


// Get drivers by vehicle plate number
exports.getDriverByVehiclePlate = asyncHandler(async (req, res, next) => {
    
    const vehiclePlate = req.params.vehiclePlate;
    const driver = await Driver.find({vehiclePlate: vehiclePlate});

    if(driver.length === 0) {
        return next(new ErrorResponse(`The ${vehiclePlate} vehicle plate does not exist!`, 404));      
    }

    res.status(200).json({
        success: true,
        count: driver.length,
        data: driver
    });
});


// Create new driver
exports.createDriver = asyncHandler(async (req, res, next) => {
    const driver = await Driver.create(req.body);

    res.status(201).json({
        success: true,
        data: driver
    })
});



// Create new driver
exports.createDriver = asyncHandler(async (req, res, next) => {
    const driver = await Driver.create(req.body);

    res.status(201).json({
        success: true,
        data: driver
    })
});


// Update driver by id
exports.updateDriver = asyncHandler(async (req, res, next) => {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!driver) {
        return next(new ErrorResponse(`Driver not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: driver
    })
});


// Delete driver
exports.deleteDriver = asyncHandler(async (req, res, next) => {
        const driver = await Driver.findByIdAndDelete(req.params.id);
    
        if(!driver) {
            return next(new ErrorResponse(`Driver not found with id of ${req.params.id}`, 404));
        }
    
        res.status(200).json({
            success: true,
            data: {}
        })
});