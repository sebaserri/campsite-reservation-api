'use strict';
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const moment = require('moment');

const Reservation = require('../service/reservation');
const ReservationReq = require('../model/ReservationReq').ReservationReq;

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
    let result = {dateFrom: 12};
    
    res.status(200).json({
      'result': reservations
    });

  } else {
    try {
      await ReservationReq.validateDates(req.query.dateTo, req.query.dateFrom);
      try {
        let qty = await Reservation.count();
        let result = {available: false};
        if (qty < 10) {
          result = {'available': true}
        }
        
        res.status(200).json({
          'result': result
        });

      } catch (e) {
        console.error(e);
        res.status(e.status || 500).json({
          'message': e.message
        });
      }

    }catch (e) {

    }
  }
});

router.post('/', async (req, res, next) => {
  try {
    const reservation = await ReservationReq.validateRequest(req, uuidv4());
    const r = await Reservation.create(reservation);
    res.status(201).json({
      'result': {
        'bookingId': bookingId,
        'r': r
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
    const reservation = await ReservationReq.validateRequest(req, req.body.bookingId);
    let r = await Reservation.update(reservation);
    res.status(200).json({
      'result': r
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
    if (!_.isString(req.body.bookingId)) {
      let reservation = await Reservation.delete(req.body.bookingId);
      res.status(200).json({
        'result': reservation
      });
    } else {
      res.status(400).json({
        'error': 'Invalid BookingId'
      });
    }
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({
      'message': e.message
    });
  }
});

module.exports = router;