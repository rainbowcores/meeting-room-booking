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

var app = express();
app.use(express.json()); // only parse requests wih content-type json headers, sets results in req.body
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public')); // load static resources e.g images

if (app.get('env') === 'development') {
  // log with standard Apache type to a file access.log
  app.use(morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    { stream: accessLogStream }
  ));
}

app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/equipment', equipmentRouter);

app.get('/', (req, res) => {
  res.send('API');
});

app.listen(3000, function () {
  startUpDebugger(chalk.blue('Initializing project ....'));
  startUpDebugger(chalk.green('rainbowcores loading awesomeness ...'));
  startUpDebugger(chalk.yellow('Express project started :)'));
  startUpDebugger(chalk.white('listening on port 3000'));
});
