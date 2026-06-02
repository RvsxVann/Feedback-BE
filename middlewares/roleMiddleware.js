const response = require('../helpers/response');

const roleMiddleware = (roles) => {
    
    return (req, res, next) => {
        
        if (!roles.includes(req.user.roles)) {
            return res.status(403).json(response(403, 'akses di tolak'));
        }
        next();
    };
};

module.exports = roleMiddleware;