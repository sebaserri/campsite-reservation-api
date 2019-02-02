'use strict';
const _ = require('lodash');
const moment = require('moment');

class ReservationReq {

  constructor(bookingId, name, lastname, email, dateFrom, dateTo) {
    this.bookingId = bookingId;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }

  static formatDate(date) {
    if (!date) {
      return {
        status: 400,
        message: 'Invalid date'
      };
    } else {
      let date = moment(date, 'MM-DD-YYYY HH-MI', true);
      if (date.isValid()) {
        return {
          status: 0,
          value: date.format()
        };
      } else {
        return {
          status: 400,
          message: 'Invalid Format for date'
        };
      }
    }
  }

  static validateDates(dateFrom, dateTo) {
    return new Promise((resolve, reject) => {
      const from = formatDate(dateFrom);
      const to = formatDate(dateTo);


      let from = formatDate(req.body.dateFrom);
      if (from.status === 400) {
        reject({
          status: from.status,
          message: from.message
        });
      }

      let to = formatDate(req.body.dateTo);
      if (to.status === 400) {
        reject({
          status: from.status,
          message: to.message
        });
      }

      resolve({
        from: from.value,
        to: to.value
      });
    });
  }

  static validateRequest(req, bookingId) {
    return new Promise((resolve, reject) => {

      if (!_.isString(bookingId)) {
        reject({
          status: 400,
          message: 'Invalid BookingId'
        });
        return;
      }

      if (!_.isString(req.body.name)) {
        reject({
          status: 400,
          message: 'Invalid name'
        });
        return;
      }

      if (!_.isString(req.body.lastname)) {
        reject({
          status: 400,
          message: 'Invalid lastname'
        });
        return;
      }

      if (!_.isString(req.body.email)) {
        reject({
          status: 400,
          message: 'Invalid email'
        });
        return;
      }

      let from = formatDate(req.body.dateFrom);
      if (from.status === 400) {
        reject({
          status: from.status,
          message: from.message
        });
        return;
      }

      let to = formatDate(req.body.dateTo);
      if (to.status === 400) {
        reject({
          status: from.status,
          message: to.message
        });
        return;
      }

      resolve(new ReservationReq(bookingId, req.body.name, req.body.lastname, req.body.email, from.value, to.value));
    });
  }
}

module.exports = {
  ReservationReq
};