const router = require('express').Router();
const PostController = require('../controller/post-controller');
const UserController = require('../controller/user-controller')
const authMiddleware = require('../middleware/auth-middleware');


router.post("/api/log-in", UserController.login)
router.get("/api/post", authMiddleware, PostController.getAllPost)

router.use((req, res, next) => {
    res.send("Page Not Found")    
});
module.exports = router;