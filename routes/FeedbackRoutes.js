const express = require('express');
const router = express.Router();

const FeedbackController = require('../controllers/FeedbackController');
const verifyToken = require('../middlewares/AuthMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware')


router.post(
    '/',
    verifyToken,
    upload.single('file'),
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
    roleMiddleware(['teacher']),
    FeedbackController.approve
)

router.patch(
    '/:id/reject',
    verifyToken,
    roleMiddleware(['teacher']),
    FeedbackController.reject
)

router.get(
    '/all',
    verifyToken,
    roleMiddleware(['admin']),
    FeedbackController.getAllFeedback
)

router.get(
    '/stats',
    verifyToken,
    roleMiddleware(['admin']),
    FeedbackController.stats
)

module.exports = router;