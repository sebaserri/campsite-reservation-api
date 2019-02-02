const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    bookingId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateFrom: {
        type: Date,
        required: true
    },
    dateTo: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);