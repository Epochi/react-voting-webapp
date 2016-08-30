'use strict'
var axios = require('axios');
var osmosis = require('osmosis');
var posts = require('./posts.js');

exports.fetchReddit = function(req,res,next) {
console.log('fetch user ' + req.user);
var user = req.user;
osmosis.get('http://www.delfi.lt/')
    .config('concurrency',1)
    .find('h3>a.article-title:limit(1)')
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
                    subport: 'news',
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