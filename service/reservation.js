'use strict';

const ReservationSchema = require('../model/ReservationSchema.js');

module.exports = {
    create: (aReservation) => {
        const bookingId = aReservation.bookingId;
        const name = aReservation.name;
        const lastname = aReservation.lastname;
        const email = aReservation.email;
        const dateFrom = new Date(aReservation.dateFrom);
        const dateTo = new Date(aReservation.dateTo);

        const reservation = new ReservationSchema({
            bookingId,
            name,
            lastname,
            email,
            dateFrom,
            dateTo
        });
        console.log("Reservation is created");
        return reservation.save();
    },

    count: (from, to) => {
        from = from.format('YYYY-MM-DD');
        to = to.format('YYYY-MM-DD');
        
        return ReservationSchema.find({
            "dateFrom": 
                {$gt: new Date(from)},
            "dateTo":
                {$lt: new Date(to)}
        }).count();
    },
 
    all: () => {
        return ReservationSchema.find();
    },

    findByBookingId: (bookingId) => {
        return ReservationSchema.findOne({bookingId: bookingId});
    },

    update: (aReservation) => {
        let dateFrom = new Date(aReservation.dateFrom.format());
        let dateTo = new Date(aReservation.dateTo.format())
        return ReservationSchema.updateOne({ bookingId: aReservation.bookingId }, 
            {
                $set: {
                    name: aReservation.name,
                    lastname: aReservation.lastname,
                    email: aReservation.email,
                    dateFrom: dateFrom,
                    dateTo: dateTo
                }
            }
        );
    },

    delete: (id) => {
        return ReservationSchema.findByIdAndDelete({
            _id: id
        });
    }

}