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
    '/me',
    verifyToken,
    FeedbackController.myFeedback
);

router.patch(
    '/:id/approve',
    verifyToken,
    FeedbackController.approve
)

router.patch(
    '/:id/reject',
    verifyToken,
    FeedbackController.reject
)

router.get(
    '/all',
    verifyToken,
    FeedbackController.getAllFeedback
)

router.get(
    '/stats',
    verifyToken,
    FeedbackController.stats
)

module.exports = router;