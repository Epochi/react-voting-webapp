var PostVote = mongoose.model('PostVote');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

exports.voted = function(req, res, next){
    var postId = req.body.postId;
    var userId = req.user._id;
    var voted = PostVote.find({userId :userId, postId : postId}).count();
    if(!voted){
        var vote = new PostVote({
            userId: userId,
            postId : postId
        });
        vote.save();
        Post.where({ postId: postId })
            .update({ $inc: { score: 1 }}).exec();
        
    } else {
        voted.remove();
    }
};
