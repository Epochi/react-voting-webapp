var mongoose = require('mongoose');


var userThingSchema = new mongoose.Schema({
    username: {type: String, unique: true, lowercase: true },
    postVotes: [String]
},{autoIndex: false});



userThingSchema.statics = {
  load: function (options, cb) {
    options.select = options.select || 'postVotes commentVotes';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

UserThing = mongoose.model('UserThing', userThingSchema);