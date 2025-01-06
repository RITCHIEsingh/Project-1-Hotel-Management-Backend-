// Creating a server

const express = require('express');
const app = express();
const db = require('./db'); 

// Import body-parser
const bodyParser = require('body-parser');

// Correct usage of bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res) {
  res.send('welcome to our hotel');
});

// Post route to add a person
// app.post('/person' , async(req,res)=>{
//   try{
//     const data = req.body //assuming request body contains person's data
//     //create a new person documnet using mongoose model
//     const newPerson = new Person(data);

//     //save new person to database
//     const response = await newPerson.save();
//     console.log('data saved')
//     res.status(200).json(response)
//   }
//   catch(err){
//     console.log(err)
//     res.status(500).json({error: 'internal server error'})
//   }
// })





// //get method to get the person
// app.get('/person' , async(req,res)=>{
//   try{
//     const data = await Person.find();
//     console.log('data retrieved');
//     res.status(200).json(data);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error: 'internal server error'});
//   }
// })

//post method to add a menu item
// app.post('/menu' , async(req , res) => {
//   try{
//     const data = req.body;
//     const newItem = new MenuItem(data);
//     const response = await newItem.save();
//     console.log('data saved');
//     res.status(200).json(response);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal server error'});
//   }
// })

// //get method for menu item
// app.get('/menu' , async(req , res)=>{
//   try{
//     const data = await MenuItem.find();
//     console.log('data retrieved');
//     res.status(200).json(data);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error: 'internal server error'});
//   }
// })







//lecture 6
//routing for specific queries like inside person we have to find only chef or manager or waiter
// app.get('/person/:workType' , async(req , res)=>{
//   try{
//     const workType = req.params.workType; //extravct worktype from url parameter
//     if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
//       const response = await Person.find({work: workType});
//       console.log('response fetched');
//       res.status(200).json(response);
//     }
//     else{
//       res.status(404).json({error: 'internal sever error'});
//     }
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal server eror'});
//   }
// })
//now we can see that we have created many endpooints. It is impossible to create so many endpoints and is also a bad practice.To resolvw this we use express router


//so we did this by using express router
const personRoutes = require('./routes/personRoutes');
app.use('/person' , personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);









/*
app.post('/person', (req, res) => {
  const data = req.body;

  // Create a new person document using mongoose model
  const newPerson = new Person(data);

  // Save the new person to the database
  newPerson.save((error, savedPerson) => {
    if (error) {
      console.log('error saving person', error);
      res.status(500).json({ error: 'internal server error' });
    } else {
      console.log('data saved successfully');
      res.status(200).json(savedPerson);
    }
  });
});
*/

app.listen(3000, () => {
  console.log('listening on port 3000');
});
