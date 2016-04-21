var mongoose = require('mongoose');


//postThing is used for archived posts;

var postThingSchema = new mongoose.Schema({
    _id: {type: String, unique: true, lowercase: true },
    userId: {type:mongoose.Schema.Types.ObjectId, unique: true},
    votes: [{type: mongoose.Schema.Types.ObjectId, unique:true}],
    saves: [{type: mongoose.Schema.Types.ObjectId, unique:true}]
},{autoIndex: false});



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
      console.log('match id');
      console.log(id);
     //console.log("match uID "+id);
     this.find({_id: {$in: Object.keys(hm) },votes: {$elemMatch : {$eq: id}} },{_id:1})
     .lean(true)
     .exec(
        function(err,upvoted){
            console.log('upvoted back');
            console.dir(upvoted);
            console.log('upvoted back end');
            //console.dir(upvoted[0].votes);
            if(err){return console.log('posts match voter error: '+ err)}
                 upvoted.forEach((elm) => {
                 console.log(elm.votes[0].u);
                  posts[hm[elm._id]].u = elm.votes[0].u;
                });
            cb(posts);
       
        });
  
  }
};

PostThing = mongoose.model('PostThing', postThingSchema);


/*
postThing.votes.u = 0 = nothing
postThing.votes.u = 1 = nothing
postThing.votes.u = 2 = nothing
postThing.votes.u = 3 = nothing
this doesnt work when i want to check if post already has a vote on
has to be array with two values u = [0,0]
$elemMatch: {u :{$gt: 0}}

*/