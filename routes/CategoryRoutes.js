const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');
const verifyToken = require('../middlewares/AuthMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get(
    '/',
    verifyToken,
    CategoryController.getAll
)

router.post(
    '/',
    verifyToken,
    roleMiddleware(['teacher']),
    CategoryController.create
)

router.put(
    '/:id',
    verifyToken,
    roleMiddleware(['teacher']),
    CategoryController.update
)

router.delete(
    '/:id',
    verifyToken,
    roleMiddleware(['teacher']),
    CategoryController.delete
)

router.patch(
    '/:id/toggle',
    verifyToken,
    roleMiddleware(['teacher']),
    CategoryController.status
)
module.exports = router;