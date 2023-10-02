const checkAuth = (req, res, next)=> {
    if (req.user) {
        next();
        return;
    }
    return res.status(401).send({"error": "Unauthorized"});
}

module.exports = checkAuth;