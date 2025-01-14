//next 2 lines will include username and password
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');




passport.use(new LocalStrategy(async(username , password , dotenv , done) =>{
    //authentication logic imolemented here
    try{
      console.log('Recieved credentials: ',username,password);
      const user = await Person.findOne({username:username});
      if(!user){
        return done(null , false , {message: 'incorrect username'});
      }
      const isPasswordMatch = user.password === password?true:false;
      if(isPasswordMatch){
        return done(null , user);
      }
      else{
        return done(null , false , {message: 'Incorrect password'});
      }
    }catch(err){
      return done(err);
    }
  }));
  
  module.exports = passport;//export this file
  