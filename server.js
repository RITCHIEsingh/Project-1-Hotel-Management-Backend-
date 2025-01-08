// Creating a server

const express = require('express');
const app = express();
const db = require('./db'); 
require('dotenv').config();
// Import body-parser
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
// Correct usage of bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res) {
  res.send('welcome to our hotel');
});


//so we did this by using express router
const personRoutes = require('./routes/personRoutes');
app.use('/person' , personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);

app.listen(PORT, () => {
  console.log('listening on port 3000');
});
