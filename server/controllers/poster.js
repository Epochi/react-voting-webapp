'use strict'
var axios = require('axios');
var osmosis = require('osmosis');
var posts = require('./posts.js');
var Comments = require('../models/comment');
var PostAuth = require('../models/postsauth');

exports.fetchReddit = function(req,res,next) {
console.log('fetch user ' + req.user);
console.dir(req.user);
var user = req.user;
osmosis.get('http://www.delfi.lt/')
    .config('concurrency',1)
    .find('h3>a.article-title:limit(10)')
    .follow('@href')
    .find('h1')
    .set('title')
    .find('div[itemprop=articleBody]')
    .filter('p')
    .set('text')
    .then(function(context, data, next){
        let title = data.title.replace(/\s*\d*\s*\(?\d+\)?\s*\d+$/,'');
        let url = context.doc().request.url;
        let bodyText = data.text;
        let req = { 
            user: user,
            body: {
                    type: 0,
                    title: title,
                    subport: 'funny',
                    tags: ['naujienos'],
                    data: {
                        url: url,
                        bodytext: bodyText
                    }
            }
        };    
        //console.dir(req);   
        return posts.create(req,res,next);
        //next(context,data);
    });
};

/*
  var post = new Post({
      kind: req.body.type,
      score: 1,
      data: {
          tags: req.body.tags,
          subport: subport,
          title: req.body.title,
          bodytext: req.body.text,
          author: req.user.name,
          url: req.body.url
      }
  });
  
  */
  
exports.posttons = function(req,res,next){
        let user = { name: 'eminem2008',
              username: 'eminem2008',
              post_score: 0,
              comment_score: 0 }
    
            let newreq = { 
            user: user,
            body: {
                    type: 0,
                    title: title,
                    subport: 'funny',
                    tags: ['naujienos'],
                    data: {
                        url: url,
                        bodytext: bodyText
                    }
            }
        };    
        //console.dir(req);   
        return posts.create(newreq,res,next);
}


var subports = [
    "juokai",
    "naujienos",
    "kriminalai"
    ]


exports.postDeepComments = function(req,res,next){
    makeid(function(err, username){
        if(err){return err}
         makeid(function(err, postText){
            if(err){return err}
            //Math.floor((Math.random() * 100) + 1);
            Comments.loadOne(null, function(err, result){
                if(err){return err}
                console.log('postdeepcomments load one happened');
                var parentComment = result.comment;
                var comment = {
                    parent_id: parentComment.comment_id,
                    username: username,
                    post_id: parentComment.post_id,
                    path: parentComment.path,
                    data: {bodyText: postText}
                };
                console.log(comment);
                
           PostAuth.commentCreate(comment, function(err, rez){
                    if(err){return next(err);}
                      console.log('poster create comment')
                     return res.status(200).json(rez);
           });
                
            })
            

          

        })
        
    })
    
    
    
    
}

function makeid(cb)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return cb(null,text);
}
