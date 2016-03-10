var mongoose = require('mongoose');


var postThingSchema = new mongoose.Schema({
    _id: {type: String, unique: true, lowercase: true },
    votes: [mongoose.Schema.Types.ObjectId]
},{autoIndex: false});

postThingSchema.index({ votes: 1});

postThingSchema.statics = {
  load: function (options, cb) {
    options.select = options.select || 'postVotes commentVotes';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

PostThing = mongoose.model('PostThing', postThingSchema);