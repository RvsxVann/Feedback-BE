const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/AuthMiddleware')

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/me', verifyToken, (req, res) => {

    return res.status(200).json({
        user: req.user
    });

});

module.exports = router;