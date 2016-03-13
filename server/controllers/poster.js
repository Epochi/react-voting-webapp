'use strict'
var axios = require('axios');
var osmosis = require('osmosis');
var posts = require('../controllers/posts');

exports.fetchReddit = function(req,res,next) {
console.log('fetch user ' + req.user);
var user = req.user;
osmosis.get('http://www.delfi.lt/')
    .config('concurrency',1)
    .find('h3>a.article-title:limit(5)')
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
                    url: url,
                    type: 0,
                    funny: false,
                    title: title,
                    text: bodyText
            }
        };    
        console.dir(req);   
        posts.create(req);
        next(context,data);
    });
};
