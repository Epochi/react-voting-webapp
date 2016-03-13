var mongoose = require('mongoose');
var _ = require('lodash');
var PostThing = mongoose.model('PostThing');
var Post = mongoose.model('Post');
var UserThing = mongoose.model('UserThing');

// Try to add a vote, if vote was already found, delete the vote
exports.votedPost = function(req, res, next) {
    //if user has not liked the post, add like, else if user has liked the post, delete the like
    if(!req.body.liked){
        postAddVote(req.params.id,req.user._id,next) ? res.status(200) : res.status(500);
    } else {
    //delete the like if post is already liked
        postDeleteVote(req.params.id,req.user._id,next) ? res.status(200) : res.status(500);
    }
};
exports.voteOnCreation =function(postid,userid,next){
    postAddVote(postid,userid,next);
}


//addvote into postthing and if successful add to userthing
function postAddVote(id, user, next){
   PostThing.update({_id: id}, { $addToSet: { votes: user}}, function(err, result){
       if (err) return next(err);
       if(result.n <= result.nModified){
            console.log("Adding Vote Results");
            console.log(result);
            UserThing.update({_id: user}, { $addToSet: { postVotes: id}}, function(err, result){
            if (err) return next(err);
            if(postScoreControl(id, 1, next)){
                return true;
            }
            });
       } else {
           postDeleteVote(id,user,next);
       }
       
   }) 
}

function postDeleteVote(id,user, next){
        PostThing.update({_id: id}, {$pull: {votes: id} }, function (err, result){
            if (err) return next(err);
            if(result.n <= result.nModified){
                console.log("Deleting Vote Results");
                console.log(result);
                UserThing.update({_id: user}, { $pull: { postVotes: id}}, function(err, result){
                    if (err) return next(err);
                    if(postScoreControl(id, -1, next)){
                        return true;
                    }
            });
            }
      });
}

function postScoreControl(id, score, next){
    Post.update({_id: id}, {$inc: {score: score}},function(err,result){
    if (err) return next(err);
    return true;
   });
}

