// routing middleware
const userRouter = require('./userRouter');
const roomRouter = require('./roomRouter');
const bookingRouter = require('./bookingRouter');
const equipmentRouter = require('./equipmentRouter');
const authRouter = require('./authRouter');

module.exports = function (app, logger) {
  // set up routing
  app.use('/api/users', userRouter);
  app.use('/api/rooms', roomRouter);
  app.use('/api/bookings', bookingRouter);
  app.use('/api/equipment', equipmentRouter);
  app.use('/api/auth', authRouter);

  app.get('/', (req, res) => {
    res.send('API');
  });

  app.use(function (error, req, res, next) {
    logger.log('error', error); // log this to a logger file that was can parser/process later
    res.status(500).send('There was a problem processing your request. Please try again');
    process.exit(1);
  });
}

