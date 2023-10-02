const jwt = require("jsonwebtoken");
const {User} = require("../models/users");

const setUser = async (req, res, next) => {
    let token = req.headers["authorization"];


    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
        const {_id} = jwt.verify(token, "my_secret_key");
        if (_id) {
            const user = await User.findById(_id);
            req.user = user;
        }

    }
    next();
}

module.exports = setUser;