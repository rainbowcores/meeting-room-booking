const express = require('express');
const chalk = require('chalk'); // lib for colors and interesting stuff
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }); // log requests here

mongoose.connect('mongodb://localhost/meetingroombooking')
  .then(console.log(chalk.gray('connected to MongoDB')))
  .catch(error => { console.log(chalk.red(error)); });
let db = mongoose.connection;
db.on('error', (error) => { console.log(chalk.red(error)) });

// routing middleware
const userRouter = require('./routes/userRouter');
const roomRouter = require('./routes/roomRouter');
const bookingRouter = require('./routes/bookingRouter');
const equipmentRouter = require('./routes/equipmentRouter');

var app = express();
app.use(express.json()); // only parse requests wih content-type json headers, sets results in req.body
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));
// log with standard Apache type
app.use(morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  { stream: accessLogStream }
));

app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/equipment', equipmentRouter);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(3000, function () {
  console.log(chalk.blue('Initializing project ....'));
  console.log(chalk.green('rainbowcores loading awesomeness ...'));
  console.log(chalk.yellow('Express project started :)'));
  console.log(chalk.white('listening on port 3000'));
});
