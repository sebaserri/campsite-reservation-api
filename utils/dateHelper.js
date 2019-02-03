'use strict';

const moment = require('moment');

module.exports = {

  upToOneMonthValidation: (from) => {
    return new Promise((resolve, reject) => {
      let now = moment();
      const diff = from.diff(now, 'months', true);
      if (diff > 1) {
        reject({
          status: 400,
          message: 'The campsite can be reserved up to 1 month in advance'
        });
      }
      resolve();
    });
  },
  maxTimeReservedValidation: (from, to) => {
    return new Promise((resolve, reject) => {
      const diff = to.diff(from, 'days');
      if (diff > 3) {
        reject({
          status: 400,
          message: 'The campsite can be reserved for max 3 days'
        });
      }
      resolve();
    });
  },
  sameDateValidation: (from, to) => {
    return new Promise((resolve, reject) => {
      const diff = to.diff(from, 'days');
      if (diff === 0) {
        reject({
          status: 400,
          message: 'The dates should not be equals'
        });
      }
      resolve();
    });
  },
  oneDayBeforeValidation: (dateFrom) => {
    return new Promise((resolve, reject) => {
      let now = moment().format("YYYY-MM-DD");
      now = moment(now, 'YYYY-MM-DD', true);
      let diff = now.diff(dateFrom, 'days', true);
      if (diff >= 0) {
        reject({
          status: 400,
          message: 'The campsite can be reserved minimum 1 day(s) ahead of arrival'
        });
      }
      resolve();
    })
  },
  fromGreaterThanTo: (dateFrom, dateTo) => {
    return new Promise((resolve, reject) => {
      let diff = dateTo.diff(dateFrom, 'days');
      if (diff <= 0) {
        reject({
          status: 400,
          message: 'The date from should be greater than date to'
        });
      }
      resolve();
    })
  }
};