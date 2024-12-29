const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        maxlength: [50, 'Name can not be more than 50 chars']
    },
    workerId: {
        type: Number,
        required: [true, 'Please add a worker ID'],
        maxlength: [10, 'Name can not be more than 10 chars']
    },
    vehiclePlate: {
        type: String,
        required: [true, 'Please add a vehicle plate number'],
        maxlength: [20, 'Vehicle plate number can not be more than 20 chars']
    },
    drivingHistory: [
        {
            dateInit: {
                type: Date,
                required: [true, 'Please add a start trip date']
            },
            dateEnd: {
                type: Date,
                required: [true, 'Please add a end trip date']
            },
            startMileage: {
                type: Number,
                required: [true, 'Please add a starting mileage']
            },
            endMileage: {
                type: Number,
                required: [true, 'Please add a ending mileage']
            }
        }
    ]
});

module.exports = mongoose.model('Driver', DriverSchema);
