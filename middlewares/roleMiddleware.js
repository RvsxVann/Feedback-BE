const response = require('../helpers/response');

const roleMiddleware = (roles = []) => {
    
    return (req, res, next) => {
        const allowedRoles = Array.isArray(roles) ? roles : [];

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json(response(403, 'akses di tolak'));
        }
        next();
    };
};

module.exports = roleMiddleware;