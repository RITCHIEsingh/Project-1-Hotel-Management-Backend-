const mongoose = require('mongoose')

//define the persons schema
//this schema is done via mongoose , to know more read mongoose documentation
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    age: {
        type: Number
    },
    work:{
        type: String,
        enum: ['chef' , 'waiter' , 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true,
        unique: true    //data will only be accepted if the email is unique
    },
    address:{
        type : String
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
});

//create person model
const Person = mongoose.model('Person' , personSchema);
module.exports = Person