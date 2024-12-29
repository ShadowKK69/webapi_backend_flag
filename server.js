const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const drivers = require('./routes/drivers');

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/drivers', drivers);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Hanle unhandle promises rejections w/o all the messages
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
})
