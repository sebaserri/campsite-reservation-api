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
describe('GET /api/book/:id', function () {
    it('respond with json containing a single reservation', function (done) {
        request(app)
            .get('/api/book/5be8bbcd9a12ca3e08eaae2d')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/book/:bookingId', function () {
    it('respond with json reservation not found', function (done) {
        request(app)
            .get('/api/book/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500) //expecting HTTP status code
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('POST /api/book', function () {
    let data = {
        "name": "Sebastian",
        "lastname": "Serri",
        "email": "sebastian@gmail.com",
        "dateFrom": "2018-11-13 12:00:00.00Z",
        "dateTo": "2018-11-16 12:00:00.00Z"
    }
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
        "id": "5be8bbcd9a12ca3e08eaae2d",
        "name": "Leandro",
        "email": "sebastian@yahoo.com",
        "birth": "2018-11-15 22:26:12.111Z"
    }
    it('respond with 200 not created', function (done) {
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
        "id": "5be8bbcd9a12ca3e08eaae2d"
    }
    it('respond with 200 not created', function (done) {
        request(app)
            .delete('/api/book')
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

