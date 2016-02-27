var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
    kind: String, 
    score: Number,
    data: {
        _id: mongoose.Schema.Types.ObjectId,
        parent_id: String,
        port: String,
        port_id: String,
        bodytext: String,
        permalink: String,
        author: String,
        author_portrait: String,
        hidden: Boolean,
        user_reports: Array, 
    }
});

var Comment = mongoose.model('Comment', commentSchema);