const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function(req, res, next) {
    // Extract token from the Authorization header directly
    const token = req.header('Authorization');

    if (!token) return res.status(401).send('Access Denied');

    try {
        // Verify the token using the secret key from environment variables
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};
