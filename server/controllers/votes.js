var mongoose = require('mongoose');
var UserThing = mongoose.model('UserThing');
var Post = mongoose.model('Post');


// Try to add a vote, if vote was already found, delete the vote
exports.votedPost = function(req, res, next) {
    var username = req.user.name.toLowerCase();



    UserThing.findOneAndUpdate({
            username: username
        }, {
            $push: {
                postVotes: req.body._id
            }
        },
        function(err, newvote) {
            if (err) {
                UserThing.findOneAndUpdate({
                        username: username
                    }, {
                        $push: {
                            postVotes: req.body._id
                        }
                    },
                    function(err, oldvote) {
                        if (err) {
                            return next(err)
                        }
                        Post.findOneAndUpdate({
                            _id: req.body._id
                        }, {
                            $inc: {
                                score: 1
                            }
                        });
                    }
                )
                return next(err);
            }
            else {
                Post.findOneAndUpdate({
                    _id: req.body._id
                }, {
                    $inc: {
                        score: 1
                    }
                });
            }


        }
    )

};


/*
    postVotes.addToSet(req.body._id)
  Project.findOneAndUpdate(
        {_id: req.query.pid},
        {$addToSet: {links: {url: req.query.url , title: req.query.title} }}, 
        {safe: true, upsert: true, new:true},
        function(err, project) {
            if(err) {
                //do stuff
            } else {
                //Something was added to set!
            }
        }
   );
      var results = db.products.update(
      {
        _id: myDocument._id,
        quantity: oldQuantity,
        reordered: oldReordered
      },
      {
        $inc: { quantity: 50 },
        $set: { reordered: true }
      }
   )
   
   */
   
       /*  
      var vote = UserThing.findOne(
          {
              $and:  [
                  {username: username},
                  {postVotes: [req.body._id]}
                  
                  ]
          });
          
      if(!vote){
          UserThing.update(
              {username: username},
              {$addToSet: {postVotes: req.body._id}},
              function(err, newvote) {
                  if(err){return next(err)}
                  Post.findOneAndUpdate(
                      {_id: req.body._id},
                      {$inc : {score : 1}}
                      )
              }
          );
      }    
      */
