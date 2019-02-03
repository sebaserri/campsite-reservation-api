const app = require('../index');
const request = require('supertest');

describe('GET /api/book', function () {
    it('respond with json containing a list of all reservations', function (done) {
        request(app)
            .get('/api/book')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/book/:bookingId', function () {
    it('respond with json containing a single reservation', function (done) {
        request(app)
            .get('/api/book/fc2db2b9-0c85-4846-aba2-701c98b15c78')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/book/:booking', function () {
    it('respond with json reservation not found', function (done) {
        request(app)
            .get('/api/book/12345678')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200) //expecting HTTP status code
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('GET /api/book/available', function () {
    it('respond with json notifing if it is available in that dates', function (done) {
        request(app)
            .get('/api/book/available?dateFrom=2019-02-10&dateTo=2019-02-13')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /api/book', function () {
    let data = {
        "name": "Sebastian",
        "lastname": "Serri",
        "email": "sebastian@gmail.com",
        "dateFrom": "2019-02-10",
        "dateTo": "2019-02-13"
    };
    it('respond with 201 created', function (done) {
        request(app)
            .post('/api/book')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('PUT /api/book', function () {
    let data = {
      "bookingId": "c9488e91-7e0a-49d0-92d5-1cd2bc5effd6",
      "name": "Seba",
      "lastname": "Serri",
      "email": "sebastian@gmail.com",
      "dateFrom": "2019-02-12",
      "dateTo": "2019-02-15"
    };
    it('respond with 200', function (done) {
        request(app)
            .put('/api/book')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('DELETE /api/book', function () {
    let data = {
        "bookingId": "414210a4-fbb4-49aa-8876-2f475ba8430b"
    };
    it('respond with 500 deleting the reservation', function (done) {
        request(app)
            .delete('/api/book')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

