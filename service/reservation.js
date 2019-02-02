const Reservation = require('../model/reservation.js');

module.exports = {
    create: (aReservation) => {
        const bookingId = aReservation.bookingId;
        const name = aReservation.name;
        const lastname = aReservation.lastname;
        const email = aReservation.email;
        const dateFrom = aReservation.dateFrom;
        const dateTo = aReservation.dateTo;

        const reservation = new Reservation({
            bookingId,
            name,
            lastname,
            email,
            dateFrom,
            dateTo
        });
        reservation.save();
        console.log("Reservation is created");
    },

    all: () => {
        return Reservation.find();
    },

    findByBookingId: (bookingId) => {
        return Reservation.find({bookingId: bookingId});
    },

    update: (aReservation) => {
        return Reservation.updateOne({ bookingId: aReservation.bookingId }, 
            {
                $set: {
                    name: aReservation.name,
                    lastname: aReservation.lastname,
                    email: aReservation.email,
                    dateFrom: aReservation.dateFrom,
                    dateTo: aReservation.dateTo
                }
            }
        );
    },

    delete: (bookingId) => {
        return Reservation.findByIdAndDelete({
            bookingId: bookingId
        });
    }

}