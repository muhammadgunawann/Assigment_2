const jwt = require('jsonwebtoken');
const fs = require('fs')

async function authMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.json({"message": "Need Ahthorization Token!"})
        }
        const userToken = authorization.split('Bearer ');
        if (userToken.length !== 2) return res.json({"message": "Invalid Token!"});
        
        const { username } = jwt.verify(userToken[1], process.env.SECRET_KEY);
        
        const rawData = fs.readFileSync('./data/user.json');
        const users = JSON.parse(rawData);
        const currentUser = users.find(e => e.username == username)

        if (!currentUser)  return res.json({"message": "Unauthorized"});
        req.user = currentUser.username;
        next();
    } catch (error) {
        // res.status(401).json({message: 'unauthorized'});
        next(error);
    }
}
module.exports = authMiddleware;