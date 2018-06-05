const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/projet3";

mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, function(error){
    if (error){
        console.log('Can not connect to the database' + error);
    } else {
        console.log('Connection successes to database');
    }
});

module.exports = mongoose;
module.exports.mongoURI = mongoURI;