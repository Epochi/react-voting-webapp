'use strict'
var axios = require('axios');
var osmosis = require('osmosis');
var posts = require('../controllers/posts');

exports.fetchReddit = function(req,res,next) {

osmosis.get('http://www.delfi.lt/')
    .paginate('h3>a.article-title@href',10)
    .find('h1')
    .set('title')
    .find('p[itemprop=description]')
    .set('desctext')
    .find('div[itemprop=articleBody]')
    .filter('p')
    .set('text')
    .then(function(context, data, next){
        console.log('thenstart');
        let url = context.doc().request.url;
        let bodyText = data.desctext + " /n  " + data.text;
        let postObject = {
            url: url,
            type: 0,
            funny: false,
            title: data.title,
            text: bodyText
        };    
        console.log('whatfuckingever');
        console.log(postObject);   
        next(context,data)
    })
}
