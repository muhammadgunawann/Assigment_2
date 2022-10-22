const fs = require('fs')
const jwt = require('jsonwebtoken');

class UserController{
    static login(req, res, next){
        const {username, password} = req.body;

        const rawData = fs.readFileSync('./data/user.json');
        const users = JSON.parse(rawData);
        const currentUser = users.find(e => e.username == username)
        
        if (!currentUser){
            return res.json({ "message": "PENGGUNA TIDAK TERDAFTAR"})            
        }
        if(currentUser?.password !== password){
            return res.json({ "message": "KATA SANDI SALAH!"})            
        }
        const jwtToken = jwt.sign({"username": username}, process.env.SECRET_KEY)
        return res.json({ "message": "Masuk Berhasil!", "token": jwtToken})
    }
}
module.exports = UserController