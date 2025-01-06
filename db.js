// this db.js file is essentially responsible for establishinga connection between our node.js application and our mongodb database using the mongoose library

const mongoose = require('mongoose');

//define the mongodb connection url
const mongoURL = 'mongodb://127.0.0.1:27017/hotel'

//set up mongo db connection
mongoose.connect(mongoURL) //establishes a mongodb connection to above url

//get the default conncetion
//mongoose maintains a default connection object representing the mongodb connection
const db = mongoose.connection;

//define event listners for db connection
db.on('connected' , () =>{
    console.log('connected to mongodb server')
})

db.on('error' , (err) =>{
    console.log('mongodb connection error: ' , err)
})

db.on('disconnected' , () =>{
    console.log('disconnected from mongodb server')
})

//export the db connection
module.exports = db;