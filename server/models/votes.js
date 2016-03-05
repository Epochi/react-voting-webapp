var mongoose = require('mongoose');
var utils = require('../config/utils');


var postVoteSchema = new mongoose.Schema({
    postId: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

postVoteSchema.index({ postId: 1, userId: -1 });

PostVote = mongoose.model('PostVote', postVoteSchema);

/*postSchema
     .virtual('data.permalink')
      .get(function () {
           return '/p/'+this.data.subport + '/' + this._id + '/' + utils.sanitizeTitle(this.data.title);
      });

//custom unique ids
postSchema.pre('save', function (next) {
  var post = this;
  postcounter.findByIdAndUpdate({_id: 'post'}, {$inc: { seq: 1} }, function(error, postcounter)   {
        if(error)
            return next(error);
        var n = postcounter.seq;
        post._id = n.toString(36);
        next();
    });
 });
*/