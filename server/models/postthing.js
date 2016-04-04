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
  },
  match: function(posts, id, cb){
      var hm = {};
      posts.forEach(function(elm,index){
                hm[elm._id] = index;
      });
      
     //console.log("match uID "+id);
     this.find({_id: {$in: Object.keys(hm) },votes: {$elemMatch : {$eq: id}} },{_id:1})
     .lean(true)
     .exec(
        function(err,upvoted){
            if(err){return console.log('posts voter error')}
                 upvoted.forEach((elm) => {
                  posts[hm[elm._id]].voted = true;
                });
            cb(posts);
       
        });
  
  }
};

PostThing = mongoose.model('PostThing', postThingSchema);