'use strict';

class Reservation {
  constructor(bookingId, name, lastname, email, dateFrom, dateTo) {
    this.bookingId = bookingId;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}

module.exports = Reservation;