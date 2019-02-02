const app = require('./server');

/**
 * Starting up!!!
 */
app.listen(process.env.SERVER_PORT, `${process.env.SERVER_HOST}`);
console.log(`Running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);

module.exports = app;