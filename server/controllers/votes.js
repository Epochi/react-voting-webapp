var mongoose = require('mongoose');
var _ = require('lodash');
var PostThing = mongoose.model('PostThing');
var Post = mongoose.model('Post');
var UserThing = mongoose.model('UserThing');

// Try to add a vote, if vote was already found, delete the vote
exports.votedPost = function(req, res, next) {
    console.log('did i lik? ' + req.body.voted);
    //if user has not voted the post, add like, else if user has voted the post, delete the like
    //pass callback along the vote flow
    //endpoints are deletevote else and scorecontrol
    if(!req.body.voted){
        postAddVote(req.params.id,req.user._id,next,function(response){
            console.log('server response to vote:' + response);
            response ? res.sendStatus(200) : res.sendStatus(500);
        });
    } else {
    //delete the like if post is already voted
        postDeleteVote(req.params.id,req.user._id,next,
        function(response){
            console.log('server response to vote:' + response);
            response ? res.sendStatus(200) : res.sendStatus(500);
        });
    }
};
exports.voteOnCreation = function(postid,userid,next){
    postAddVote(postid,userid,next,function(){});
}


//addvote into postthing and if successful add to userthing
function postAddVote(id, user, next,cb){
   PostThing.update({_id: id}, { $addToSet: { votes: user}}, function(err, result){
       if (err) return next(err);
       if(result.n <= result.nModified){
            console.log("Adding Vote Results");
            console.log(result);
            UserThing.update({_id: user}, { $addToSet: { postVotes: id}}, function(err, result){
            if (err) return next(err);
            postScoreControl(id, 1, next,cb);
            });
       } else {
           postDeleteVote(id,user,next,cb);
       }
   });
}

function postDeleteVote(id,user, next,cb){
        PostThing.update({_id: id}, {$pull: {votes: user} }, function (err, result){
            if (err) return next(err);
             console.log("Deleting Vote Try");
                console.log(result);
            if(result.n <= result.nModified){
                console.log("Deleting Vote Success");
                console.log(result);
                UserThing.update({_id: user}, { $pull: { postVotes: id}}, function(err, result){
                    if (err) return next(err);
                    postScoreControl(id, -1, next,cb)
                });
            } else{
                cb(false);
            }
      });
}

function postScoreControl(id, score, next,cb){
    Post.update({_id: id}, {$inc: {score: score}},function(err,result){
    if (err) return next(err);
      cb(true);
   });
}

