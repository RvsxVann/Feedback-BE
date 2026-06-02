const { Feedback } = require('../models');
const response = require('../helpers/response');

class FeedbackController {

    static async create(req, res) {
        try {
            const { receiverId, message, category } = req.body;

            const feedbacks = await Feedback.create({
                senderId: req.user.id,
                receiverId,
                message,
                category,
                status: 'pending'
            });

            return res.status(201).json(
                response(201, 'Feedback berhasil dikirim', feedbacks)
            );

        } catch (error) {
            return res.status(500).json(response(500, error.message));
        }
    }

    static async myFeedback(req, res) {
        try {
            const { status, type } = req.query;

            const whereClause = {};

            if (type === 'sent') {
                whereClause.senderId = req.user.id;
            } else {
                whereClause.receiverId = req.user.id;
            }

            if (status) {
                whereClause.status = status;
            }

            const feedbacks = await Feedback.findAll({
                where: whereClause
            });

            return res.status(200).json(
                response(200, 'Berhasil mengambil feedback', feedbacks)
            );

        } catch (error) {
            return res.status(500).json(response(500, error.message));
        }
    }

    static async approve(req, res) {
        try {
            const feedbacks = await Feedback.findByPk(req.params.id);

            if (!feedbacks) {
                return res.status(404).json(
                    response(404, 'Feedback tidak ditemukan')
                );
            }

            if (feedbacks.status !== 'pending') {
                return res.status(400).json(
                    response(400, 'Feedback sudah di proses')
                )
            }

            feedbacks.status = 'approved';
            await feedbacks.save();

            return res.status(200).json(
                response(200, 'Feedback sudah di proses', feedbacks)
            );

        } catch (error) {
            return res.status(500).json(response(500, error.message));
        }
    }

    static async reject(req, res) {
        try {
            const feedbacks = await Feedback.findByPk(req.params.id);

            if(!feedback) {

                return res.status(404).json(response(404, 'Feedback tidak ditemukan'));
            }

            if(feedback.status !== 'pending') {
                return res.status(400).json(response(400, 'Feedback sudah di proses'));
            }

            feedback.status = 'rejected';
            await feedback.save();

            return res.status(200).json(response(200, 'Feedback ditolak', feedbacks));
        } catch (error) {
            return res.status(500).json(response(500, error.message));
        }
    }

    static async getAllFeedback(req, res) {
        try {
            const feedbacks = await Feedback.findAll();

            return res.status(200).json(response(200, 'Berhasil mengambil semua feedback', feedbacks));
        } catch(error) {
            return res.status(500).json(response(500, error.message));
        }
    }

    static async stats(req, res) {
        try {
            const total = await Feedback.count();

            const pending = await Feedback.count({where : {status: 'pending'} });
            const approved = await Feedback.count({where : {status: 'approved'} });
            const rejected = await Feedback.count({where : {status: 'rejected'} });

            return res.status(200).json(response(200, 'Berhasil mengambil stats', {total, pending, approved, rejected}));
        } catch(error) {
            return res.status(500).json(response(500, error.message));
        }
    }
}

module.exports = FeedbackController;