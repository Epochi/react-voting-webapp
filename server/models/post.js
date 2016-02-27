var mongoose = require('mongoose');



var postSchema = new mongoose.Schema({
    kind: String,
    score: { type: Number, index: true },
    data: {
        _id: mongoose.Schema.Types.ObjectId,
        tags: [],
        date: { type: Date, default: Date.now, index: true },
        port: String,
        port_id: String,
        title: String,
        bodytext: String,
        permalink: String,
        author: String,
        hidden: {type: Boolean, default: false},
        approved_by: String,
        user_reports: Array,
        report_reasons: {
            censor: Number,
            funny: Number,
            n18: Number
        },
        comment_count: {type: Number},
        top_comments: Array,
        url: String,
        edited: {type: Boolean, default: false},
        mod_reports: Array
    }
});

Post = mongoose.model('Post', postSchema);
