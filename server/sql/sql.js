var QueryFile = require('pg-promise').QueryFile;
var path = require('path');

// Helper for linking to external query files:
function sql(file) {
    var fullPath = path.join(__dirname, file); // generating full path;
    return new QueryFile(fullPath, {minify: true});
}

var sqlProvider = {
    // external queries for Users:
    usersAuth: {
        create: sql('users/create.sql'),
        load: sql('users/load.sql'),
        loadLocal: sql('users/loadLocal.sql')
    },
    votes: {
        onPost: sql('votes/onPost.sql'),
        postVoteCountUpdate: sql('votes/postVoteCountUpdate.sql')
    },
    // external queries for Products:
    posts: {
        loadCategory: sql('posts/postsLoadCategory.sql'), 
        loadAll: sql('posts/postsLoadAll.sql'), 
        loadSingle: sql('posts/postLoadSingle.sql')
    },
    postsAuth: {
        create: sql('postsAuth/postCreate.sql'),
        loadCategory: sql('postsAuth/postsLoadCategory.sql'), 
        loadAll: sql('postsAuth/postsLoadAll.sql'), 
        loadSingle: sql('postsAuth/postLoadSingle.sql')
    }
};

module.exports = sqlProvider;