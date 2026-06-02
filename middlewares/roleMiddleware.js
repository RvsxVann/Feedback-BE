const response = require('../helpers/response');

const roleMiddleware = (role) => {
    
    return (req, res, next) => {
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json(response(403, 'akses di tolak'));
        }
        next();
    };
};

module.exports = roleMiddleware;