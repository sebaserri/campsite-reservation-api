'use strict';
const _ = require('lodash');
const moment = require('moment');
const Reservation = require('../model/Reservation');

const formatDate = (date) => {
    date = moment(date, 'YYYY-MM-DD', true);
    if (date.isValid()) {
      return {
        status: 0,
        value: date
      };
    } else {
      return {
        status: 400,
        message: 'Invalid Format for date'
      };
    }
  
}

module.exports = {

  validateDates: (dateFrom, dateTo) => {
    return new Promise((resolve, reject) => {
      const from = formatDate(dateFrom);
      const to = formatDate(dateTo);

      if (from.status === 400) {
        reject({
          status: from.status,
          message: from.message
        });
      }

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
  },

  validateBookingId: (bookingId) => {
    return new Promise((resolve, reject) => {
      if (!bookingId) {
        reject({
          status: 400,
          message: 'Invalid BookingId'
        });
      }
      resolve();
    });
  }, 

  validateBooking: (req) => {
    return new Promise((resolve, reject) => {
      if (!_.isString(req.body.bookingId)) {
        reject({
          status: 400,
          message: 'Invalid BookingId'
        });
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

      resolve(new Reservation(req.body.bookingId, req.body.name, req.body.lastname, req.body.email, from.value, to.value))
    });
  },

  existsReservation: (reservation) => {
    return new Promise((resolve, reject) => {
      if (!reservation) {
        reject({
          status: 400,
          message: 'Reservation by BookingId not found'
        });
        return;
      }
      resolve();
    });
  },

  validateRequest: (req, bookingId) => {
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

      resolve(new Reservation(bookingId, req.body.name, req.body.lastname, req.body.email, from.value, to.value));
    });
  }
};
