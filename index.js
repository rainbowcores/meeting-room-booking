const express = require('express');
const chalk = require('chalk'); // lib for colors and interesting stuff
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }); // log requests to this file
const config = require('config');
const startUpDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const jwtDebugger = require('debug')('app:jwt');
const morganDebugger = require('debug')('app:morgan');

if (!config.get('jwtPrivateKey')) {
  jwtDebugger(chalk.red('ERROR JWT PRIVATE KEY MUST BE SET IN ENV VARS FOR APPLICATION TO WORK'));
  process.exit(0);
}

mongoose.connect('mongodb://localhost/meetingroombooking')
  .then(dbDebugger(chalk.gray('connected to MongoDB')))
  .catch(error => { dbDebugger(chalk.red(error)); });
let db = mongoose.connection;
db.on('error', (error) => { dbDebugger(chalk.red(error)) });

// routing middleware
const userRouter = require('./routes/userRouter');
const roomRouter = require('./routes/roomRouter');
const bookingRouter = require('./routes/bookingRouter');
const equipmentRouter = require('./routes/equipmentRouter');
const authRouter = require('./routes/authRouter');

var app = express();
app.use(express.json()); // only parse requests wih content-type json headers, sets results in req.body
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  // log with standard Apache type to a file access.log
  app.use(morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    { stream: accessLogStream }
  ));
  morganDebugger(chalk.blue('Morgan started, Logging response outputs to access.log'));
}

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
  dbDebugger(error); // to disable this in production, change env to production
  res.status(500).send('There was a problem processing your request. Please try again');
});

app.listen(process.env.PORT || 3000, function () {
  startUpDebugger(chalk.blue('Initializing project ....'));
  startUpDebugger(chalk.green('rainbowcores loading awesomeness ...'));
  startUpDebugger(chalk.yellow('Express project started :)'));
  startUpDebugger(chalk.white('listening on port 3000'));
});
