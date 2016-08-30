var QueryFile = require('pg-promise').QueryFile;
var path = require('path');

// Helper for linking to external query files:
function sql(file) {
    var fullPath = path.join(__dirname, file); // generating full path;
    return new QueryFile(fullPath, {minify: true});
}

var sqlProvider = {
    // external queries for Users:
    users: {
        create: sql('users/create.sql'),
    },
    // external queries for Products:
    posts: {
        create: sql('posts/postCreate.sql'),
        load: sql('posts/postsLoad.sql'), 
    }
};

module.exports = sqlProvider;