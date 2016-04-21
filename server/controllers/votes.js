'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var Post = mongoose.model('Post');
var Vote = mongoose.model('Vote');
var UserThing = mongoose.model('UserThing');

//v=postVpte
//s=postSave
//c=commentVote
//e=commentSave
//need to test Object.keys speed versus != undefined
//extra for archived posts to control 'save' or mb not
exports.voteSwitch = function (req,res,next){
    let type = Object.keys(req.body.vote)[0];
    if(type === 'v'){
        postVote(req, res, next,type);
    } else if(type === 's'){
        postVote(req,res,next,type);
     } else if(type === 'c'){
        
     } else if(type === 'e'){
        
    }else {
        return res.sendStatus(500);
    }
};



// Try to add a vote, if vote was already found, delete the vote
function postVote(req, res, next,type) {
    console.log('did i lik? ' + req.body.vote[type]);
    //if user has not voted the post, add like, else if user has voted the post, delete the like
    //pass callback along the vote flow
    //endpoints are deletevote else and scorecontrol
    if(!req.body.vote[type]){
        postAddVote(req.params.id,req.user._id,type,next,function(response){
            console.log('server response to vote:' + response);
            response ? res.sendStatus(200) : res.sendStatus(500);
        });
    } else {
    //delete the like if post is already voted
        postDeleteVote(req.params.id,req.user._id,type,next,
        function(response){
            console.log('server response to vote:' + response);
            response ? res.sendStatus(200) : res.sendStatus(500);
        });
    }
};
exports.voteOnCreation = function(postid,userid,next){
    postAddVote(postid,userid,"v",next,function(){});
}


//addvote into postthing and if successful add to userthing
function postAddVote(id, user,a, next,cb){
  let uSet = {"$set":{[a]: 1}};
   Vote.update({_id: id, u: user},uSet,{upsert:true}, function(err, result){
       if (err) return next(err);
       if(result.nModified || result.upserted){
            console.log("Adding Vote Results");
            console.log(result);
            let uAts = {"$addToSet":{[a]: id}};
            UserThing.update({_id: user}, uAts, function(err, result){
            if (err) return next(err);
            if(a==="v"){postScoreControl(id, 1, next,cb)}
            else{cb(true);}
            });
       } else {
           postDeleteVote(id,user,next,cb);
       }
   });
}

function postDeleteVote(id,user,a, next,cb){
        let uSet = {"$set":{[a]: 1}};
        Vote.update({_id: id,u: user},uSet, function (err, result){
            if (err) return next(err);
             console.log("Deleting Vote Try");
                console.log(result);
            if(result.nModified){
                console.log("Deleting Vote Success");
                console.log(result);
                let uP = {"$pull":{[a]: id}};
                UserThing.update({_id: user},uP, function(err, result){
                    if (err) return next(err);
               if(a==="v"){postScoreControl(id, 1, next,cb)}
                else{cb(true);}
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

function postSave(req, res, next) {
    console.log('did i save? ' + req.body.voted);
    //if user has not saved the post, add like, else if user has voted the post, delete the like
    //pass callback along the vote flow
    //endpoints are deletevote else and scorecontrol
    if(!req.body.voted){
        postAddSave(req.params.id,req.user._id,next,function(response){
            console.log('server response to vote:' + response);
            response ? res.sendStatus(200) : res.sendStatus(500);
        });
    } else {
    //delete the like if post is already voted
        postDeleteSave(req.params.id,req.user._id,next,
        function(response){
            console.log('server response to vote:' + response);
            response ? res.sendStatus(200) : res.sendStatus(500);
        });
    }
};

function postAddSave(id, user, next,cb){
   Vote.update({_id: id, u: user}, { $set: { s: 1}},{upsert:true}, function(err, result){
       if (err) return next(err);
       if(result.nModified || result.upserted){
            console.log("Adding Vote Results");
            console.log(result);
            UserThing.update({_id: user}, { $addToSet: { postSaves: id}}, function(err, result){
            if (err) {cb(false); return next(err);}
            cb(true);
            });
       } else {
           postDeleteSave(id,user,next,cb);
       }
   });
}

function postDeleteSave(id,user, next,cb){
        Vote.update({_id: id,u: user}, {$set: {s: 0} }, function (err, result){
            if (err) return next(err);
             console.log("Deleting Vote Try");
                console.log(result);
            if(result.nModified){
                console.log("Deleting Vote Success");
                console.log(result);
                UserThing.update({_id: user}, { $pull: { postSaves: id}}, function(err, result){
                    if (err) {cb(false); return next(err);}
                    cb(true);
                });
            } else{
                cb(false);
            }
      });
}