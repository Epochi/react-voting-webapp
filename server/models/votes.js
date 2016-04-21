var mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
var ObjectId = mongoose.Schema.Types.ObjectId();


//postThing is used for archived posts;
//v=postVpte
//s=postSave
//c=commentVote
//e=commentSave

var voteSchema = new mongoose.Schema({
    _id: String,
    u: {type: mongoose.Schema.Types.ObjectId},
    v: {type:Int32},
    s: {type:Int32},
    c:[{type:String}],
    e:[{type:String}]
},{autoIndex: false});

voteSchema.index({ _id: -1,u:-1},{unique:true,background:true });



/*
match:
takes array of posts that arived from somewhere else,
creates new object and creates post._id:index pairs for every post(tested this to be fastest method)
looks for votes that match post._id and user id(if user interacted with the post in any way, returns it)
assigns the returned values to objects at index saved in hm object
(still need to check if Object.assign(posts,elm) is faster than Object.keys loop solution)
return the modified posts to be sent to the client
*/

voteSchema.statics = {
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
     this.find({_id: {$in: Object.keys(hm)}, u: id},{_id:1,v:1,s:1})
     .lean(true)
     .exec(
        function(err,upvoted){
            console.log('upvoted back');
            console.dir(upvoted);
            console.log('upvoted back end');
            //console.dir(upvoted[0].votes);
            if(err){return console.log('posts match voter error: '+ err)}
                 upvoted.forEach((elm) => {
                 console.log('elm foreach')
                 console.log(elm);
                 Object.assign(posts[hm[elm._id]], elm)
                });
            console.log('voteMatch callback');
            cb(posts);
       
        });
  
  }
};

Vote = mongoose.model('Vote', voteSchema);


/*
postThing.votes.u = 0 = nothing
postThing.votes.u = 1 = nothing
postThing.votes.u = 2 = nothing
postThing.votes.u = 3 = nothing
this doesnt work when i want to check if post already has a vote on
has to be array with two values u = [0,0]
$elemMatch: {u :{$gt: 0}}

*/