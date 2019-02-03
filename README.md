# campsite-reservation-api

A REST API for reservation using Moongose, Node.js, Express and Docker Compose, Supertest and artillery.io

## Install

```bash
npm install
```

## Run

```bash
node index
```

Runs on port 3001: http://localhost:3001

## Usage

Build Docker

```bash
docker-compose build
```

Run Docker

```bash
docker-compose up
```

## Endpoints

### Fetch all reservations
Method: GET - URL: /api/book

### Creates a reservation and return a bookingId 
Method: POST - URL: /api/book - Payload: 
```bash
{
	"name": "Sebastian",
	"lastname": "Serri",
	"email": "sebastian@gmail.com",
	"dateFrom": "2019-02-10",
	"dateTo": "2019-02-13"
}
```

### Fetch a reservation returning all reservation data
Method: GET - URL: /api/book/f54580e3-0fd4-4923-bc06-e9383257533b

### Updates a reservation and return bookingId
Method: PUT - URL: /api/book - Payload:

```bash
{
    "bookingId": "f54580e3-0fd4-4923-bc06-e9383257533b",
	"name": "Sebastian",
	"lastname": "Serri",
	"email": "sebastian@gmail.com",
	"dateFrom": "2019-02-10",
	"dateTo": "2019-02-13"
}
```

### Notifies if the Campsite is available. If no date define return a month
Method: GET - URL: /api/book/available?dateFrom=2019-02-10&dateTo=2019-02-13
Method: GET - URL: /api/book/available

### Deletes a reservation and return the bookingId erased
Method: DELETE - URL: /api/book - Payload:

```bash
{
    "bookingId": "f54580e3-0fd4-4923-bc06-e9383257533b"
}
```

Import file "Campsite API.postman_collection.json" to run the test on Postman. There are endpoints for reservations.

## Supertest

Run:

```bash
npm install
```

## Artillery

Source: https://artillery.io/

Install:

```bash
npm install -g artillery
```

Runing the script campsite.yml

```bash
artillery run campsite.yml
```

```bash
All virtual users finished
Summary report @ 19:50:09(-0300) 2019-02-03
  Scenarios launched:  600
  Scenarios completed: 214
  Requests completed:  1578
  RPS sent: 9.99
  Request latency:
    min: 11.2
    max: 119799.2
    median: 22619.9
    p95: 100889.3
    p99: 115194.1
  Scenario counts:
    0: 600 (100%)
  Codes:
    200: 1193
    201: 385
  Errors:
    ECONNRESET: 193
    ESOCKETTIMEDOUT: 193
```
