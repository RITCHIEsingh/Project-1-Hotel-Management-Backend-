// Creating a server
const express = require('express');
const app = express();
const db = require('./db'); 
require('dotenv').config();
const passport = require('./auth');

// Import body-parser
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

// Correct usage of bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const MenuItem = require('./models/MenuItem');

//middleware
const logRequest = (req , res , next) =>{
  console.log(`[${new Date().toLocaleString()}] requestr made to : ${req.originalUrl}`);
  next()
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local' , {session:false});
app.get('/', localAuthMiddleware , function (req, res) {
  res.send('welcome to our hotel');
});


//used express router to create seperate routing files for each one
const personRoutes = require('./routes/personRoutes');
app.use('/person' , personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',localAuthMiddleware,menuItemRoutes);

app.listen(PORT, () => {
  console.log('listening on port 3000');
});
