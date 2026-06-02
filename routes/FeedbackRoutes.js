const express = require('express');
const router = express.Router();

const FeedbackController = require('../controllers/FeedbackController');
const verifyToken = require('../middlewares/AuthMiddleware');

router.post(
    '/',
    verifyToken,
    FeedbackController.create
);

router.get(
    '/my',
    verifyToken,
    FeedbackController.myFeedback
);

module.exports = router;