'use strict';
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const moment = require('moment');

const Reservation = require('../service/reservation');
const ReservationReq = require('../utils/ReservationRequest');
const DateHelper = require('../utils/dateHelper');

const MAX_CAPACITY = 10;
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
    res.status(200).json({'result': {dateFrom, dateTo}});
  } else {
    try {
      let {from, to} = await ReservationReq.validateDates(req.query.dateFrom, req.query.dateTo);
      await DateHelper.fromGreaterThanTo(from, to);
      await DateHelper.upToOneMonthValidation(from);
      await DateHelper.maxTimeReservedValidation(from, to);
      await DateHelper.oneDayBeforeValidation(from, to);

      try {
        let qty = await Reservation.count(from, to);
        let result = {'dateFrom': from, 'dateTo': to, 'available': false};
        if (qty < MAX_CAPACITY) {
          result = {'dateFrom': from, 'dateTo': to, 'available': true}
        }
        res.status(200).json({'result': result});
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
    await DateHelper.upToOneMonthValidation(reservation.dateFrom);
    await DateHelper.maxTimeReservedValidation(reservation.dateFrom, reservation.dateTo);
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
    await ReservationReq.validateBookingId(req.params.bookingId);
    let reservation = await Reservation.findByBookingId(req.params.bookingId);
    await ReservationReq.existsReservation(reservation);
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
    await DateHelper.upToOneMonthValidation(from);
    await DateHelper.maxTimeReservedValidation(from, to);
    await DateHelper.oneDayBeforeValidation(from, to);

    const reservation = await ReservationReq.validateBooking(req);
    let result = await Reservation.update(reservation);
    if (result.n === 0) {
      res.status(500).json({
        'result': {'bookingId': reservation.bookingId, 'message': 'BookingId not Found'}
      });
    } else {
      res.status(200).json({
        'result': {'bookingId': reservation.bookingId, 'modified': result.n}
      });
    }
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({
      'message': e.message
    });
  }
});

router.delete('/', async (req, res, next) => {
  try {
    await ReservationReq.validateBookingId(req.body.bookingId);
    const row = await Reservation.findByBookingId(req.body.bookingId);
    await ReservationReq.existsReservation(row);
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