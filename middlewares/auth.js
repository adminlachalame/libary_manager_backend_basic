const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(403).send({ message: 'No token provided' });
    }
};

module.exports = authMiddleware;
