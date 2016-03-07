var mongoose = require('mongoose');
var _ = require('lodash');
var UserThing = mongoose.model('UserThing');
var Post = mongoose.model('Post');


// Try to add a vote, if vote was already found, delete the vote
exports.votedPost = function(req, res, next) {
    var username = req.user.name.toLowerCase();
    console.log('req.body DID HE LIKE BLIOT I NEEED DIS');
    console.log(req.body.liked);
    
    //if user has not liked the post, add like   , else if user has liked the post, delete the like
    if(!req.body.liked){
    UserThing.update({ username: username }, { $addToSet: { postVotes: req.params.id } },  function (err, result) {
                if (err) return next(err);
                console.log(result);
                //if update added a new value
                if((result.n <= result.nModified)){
                     req.user.votes.push(req.params.id);
                     Post.update({id: req.params.id}, {$inc: {score: 1}},function(err,result){
                             if (err) return next(err);
                             return res.status(200).send({message: "Vote Added"});
                            });
                } else  {
                    UserThing.update({username: username}, {$pull: {postVotes: req.params.id} }, function (err, result){
                         if (err) return next(err);
                         _.pull(req.user.votes, req.params.id);
                         Post.update({id: req.params.id}, {$inc: {score: -1}},function(err,result){
                             if (err) return next(err);
                             return res.status(200).send({message: "Vote Deleted"});
                                 });
                         });
                     }
                });
    } else {
    UserThing.update({username: username}, {$pull: {postVotes: req.params.id} }, function (err, result){
            if (err) return next(err);
             _.pull(req.user.votes, req.params.id);
             Post.update({id: req.params.id}, {$inc: {score: -1}},function(err,result){
            if (err) return next(err);
            return res.status(200).send({message: "Vote Deleted"});
                   });
             });
    }
};
