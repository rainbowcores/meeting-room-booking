const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('chalk'); // lib for colors and interesting stuff
const mongoose = require('mongoose');

// models imports
const user = require('./models/user.model');
const room = require('./models/room.model');
const booking = require('./models/booking.model');
const equipment = require('./models/equipment.model');

// routing middleware
const userRouter = require('./routes/userRouter');
const roomRouter = require('./routes/roomRouter');
const bookingRouter = require('./routes/bookingRouter');
const equipmentRouter = require('./routes/equipmentRouter');


mongoose.connect('mongodb://localhost/meetingroombooking')
.then(console.log(chalk.gray('connected to MongoDB')))
.catch(error => { console.log('error connecting to mongoDB'); });
let db = mongoose.connection;

db.on('error', (error) => { console.log(chalk.red(error)) });

var app = express();
app.use(bodyParser.json()); // only parse requests wih content-type json headers
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/equipment', equipmentRouter);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })

app.listen(3000, function () {
  console.log(chalk.blue('Initializing project ....'));
  console.log(chalk.green('rainbowcores loading awesomeness ...'));
  console.log(chalk.yellow('Express project started :)'));
  console.log(chalk.white('listening on port 3000'));
});
