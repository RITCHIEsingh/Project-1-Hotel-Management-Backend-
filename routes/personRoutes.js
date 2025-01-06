const express = require('express');
const router = express.Router();
const Person = require('./../models/person');


router.post('/' , async(req,res)=>{
    try{
      const data = req.body //assuming request body contains person's data
      //create a new person documnet using mongoose model
      const newPerson = new Person(data);
  
      //save new person to database
      const response = await newPerson.save();
      console.log('data saved')
      res.status(200).json(response)
    }
    catch(err){
      console.log(err)
      res.status(500).json({error: 'internal server error'})
    }
})


//get method to get the person
router.get('/' , async(req,res)=>{
    try{
      const data = await Person.find();
      console.log('data retrieved');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'internal server error'});
    }
})



router.get('//:workType' , async(req , res)=>{
    try{
      const workType = req.params.workType; //extravct worktype from url parameter
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
      }
      else{
        res.status(404).json({error: 'internal sever error'});
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server eror'});
    }
})

//for updation
router.put('/:id' , async(req, res) =>{ //data will be fetched and stored in id variable
  try{
    const personId = req.params.id; //that id data fetched will be stored in a constant named as personId
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId , updatedPersonData, {
      new: true,
      runValidators: true,
    });

    if(!response){
      return res.status(404).json({error: 'person not found'})
    }
    console.log('data uploaded');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.delete('/:id' , async(req,res) =>{
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if(!personId){
      return res.status(404).json({error: 'person not found'});
    }
    console.log('data delete');
    res.status(200).json({message: 'person deleted succesfully'});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'internal server error'});
  }
})

module.exports = router;
