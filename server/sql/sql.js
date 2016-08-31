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
        loadCategory: sql('posts/postsLoadCategory.sql'), 
        loadAll: sql('posts/postsLoadAll.sql'), 
        loadSingle: sql('posts/postLoadSingle.sql')
    }
};

module.exports = sqlProvider;