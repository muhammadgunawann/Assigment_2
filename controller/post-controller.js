const fs = require('fs')

class PostController{
    static getAllPost(req, res, next){
        const currentUser = req.user;
        const rawData = fs.readFileSync('./data/posts.json');
        const posts = JSON.parse(rawData);
        const userPost = posts.filter(e => e.post_owner == currentUser)
        return res.json(userPost)
    }
}
module.exports = PostController