var mongoose = require('mongoose');


var userThingSchema = new mongoose.Schema({
    username: {type: String, unique: true, lowercase: true },
    postVotes: []
},{autoIndex: false});


UserThing = mongoose.model('UserThing', userThingSchema);
