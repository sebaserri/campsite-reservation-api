'use strict';
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const moment = require('moment');

const Reservation = require('../service/reservation');
const ReservationReq = require('../utils/ReservationRequest');
const DateHelper = require('../utils/dateHelper');

router.get('/', async (req, res, next) => {
  try {
    let reservations = await Reservation.all();
    res.status(200).json({
      'result': reservations
    });
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({
      'message': e.message
    });
  }
});

router.get('/available', async (req, res, next) => {
  if (!req.query.dateFrom || !req.query.dateTo) {
    let dateFrom = moment().format('YYYY-MM-DD');
    let dateTo = moment().add(1, 'months').format('YYYY-MM-DD');
    res.status(200).json({result: {dateFrom, dateTo}});
  } else {
    try {
      let {from, to} = await ReservationReq.validateDates(req.query.dateFrom, req.query.dateTo);
      await DateHelper.fromGreaterThanTo(from, to);
      await DateHelper.sameDateValidation(from, to);
      await DateHelper.maxTimeReservedValidation(from, to);
      await DateHelper.upToOneMonthValidation(from, to);
      await DateHelper.oneDayBeforeValidation(from, to);

      try {
        let qty = await Reservation.count(from, to);
        let result = {available: false};
        if (qty < 10) {
          result = {'available': true}
        }
        res.status(200).json({result});
      } catch (e) {
        console.error(e);
        res.status(e.status || 500).json({'message': e.message});
      }
    }catch (e) {
      console.error(e);
      res.status(e.status || 500).json({'message': e.message});
    }
  }
});

router.post('/', async (req, res, next) => {
  try {
    const reservation = await ReservationReq.validateRequest(req, uuidv4());
    await DateHelper.fromGreaterThanTo(reservation.dateFrom, reservation.dateTo);
    await DateHelper.sameDateValidation(reservation.dateFrom, reservation.dateTo);
    await DateHelper.maxTimeReservedValidation(reservation.dateFrom, reservation.dateTo);
    await DateHelper.upToOneMonthValidation(reservation.dateFrom, reservation.dateTo);
    await DateHelper.oneDayBeforeValidation(reservation.dateFrom, reservation.dateTo);

    const booking = await Reservation.create(reservation);
    res.status(201).json({
      'result': {
        'bookingId': booking.bookingId
      }
    });
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({
      'message': e.message
    });
  }
});

router.get('/:bookingId', async (req, res, next) => {
  try {
    if (!_.isString(req.params.bookingId)) {
      res.status(400).json({
        'error': 'Invalid BookingId'
      });
    }
    let reservation = await Reservation.findByBookingId(req.params.bookingId);
    res.status(200).json({
      'result': reservation
    });
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({
      'message': e.message
    });
  }
});

router.put('/', async (req, res, next) => {
  try {
    let {from, to} = await ReservationReq.validateDates(req.body.dateFrom, req.body.dateTo);
    await DateHelper.fromGreaterThanTo(from, to);
    await DateHelper.sameDateValidation(from, to);
    await DateHelper.maxTimeReservedValidation(from, to);
    await DateHelper.upToOneMonthValidation(from, to);
    await DateHelper.oneDayBeforeValidation(from, to);

    const reservation = await ReservationReq.validateBooking(req);
    let r = await Reservation.update(reservation);
    res.status(200).json({
      'result': {'bookingId': reservation.bookingId, 'modified': r.ok}
    });
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({
      'message': e.message
    });
  }
});

router.delete('/', async (req, res, next) => {
  try {
    await ReservationReq.bookingIdValidation(req.body.bookingId);
    const row = await Reservation.findByBookingId(req.body.bookingId);
    if (!row) {
      console.error('BookingId not found');
      res.status(500).json({
        'message': 'BookingId not found'
      });
      next('BookingId not found');
      return;
    }
    let reservation = await Reservation.delete(row._id);
      res.status(200).json({
        'result': reservation
      });
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({
      'message': e.message
    });
  }
});

module.exports = router;