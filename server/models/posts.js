var mongoose = require('mongoose');
var utils = require('../config/utils');


var PostCounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var postcounter = mongoose.model('postcounter', PostCounterSchema);

var postSchema = new mongoose.Schema({
     _id: {type: String},
    kind: Number,
    score: { type: Number, default: 0 },
    data: {
        tags: [],
        date: { type: Date, default: Date.now},
        subport: String,
        subport_id: String,
        title: String,
        bodytext: String,
        author: {type: String},
        hidden: {type: Boolean, default: false},
        approved_by: String,
        user_reports: Array,
        postThing: {type: String, ref: 'PostThing'},
        report_reasons: {
            censor: Number,
            funny: Number,
            n18: Number
        },
        comment_count: {type: Number},
        top_comments: Array,
        url: String,
        edited: {type: Boolean, default: false},
        mod_reports: Array
    } 
});
/*, {  toObject: {getters: true, virtuals: true}, toJSON: {getters: true, virtuals: true }}*/

postSchema.index({ _id: -1});
postSchema.index({ score: -1});
/* doesnt work with lean
   I dont actually need the title to use votes, will only need it for traversing site
postSchema
     .virtual('data.permalink')
      .get(function () {
           console.log('virtual getter');
           return '/p/'+this.data.subport + '/' + this._id + '/' + utils.sanitizeTitle(this.data.title);
      });
*/
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

//save postThing with the same id as postid
postSchema.pre('save', function (next) {
  var post = this;
  var PostThing = mongoose.model('PostThing');
  var postThing = new PostThing({
      _id: post._id
  });
  postThing.save();
  next();
 });
 
 

postSchema.statics = {
     top: function(page,cb) {
         Post.find().sort({score:-1}).skip(page * 20).limit(20).lean(true).exec(cb)
     }
};
 
Post = mongoose.model('Post', postSchema);