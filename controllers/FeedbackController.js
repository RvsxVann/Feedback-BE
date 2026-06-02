const { Feedback } = require('../models');
const response = require('../helpers/response');

class FeedbackController {
    
    static async create(req, res) {
        try {
            const { receiverId, message, category } = req.body;

            const feedback = await Feedback.create({
                senderId: req.user.id,
                receiverId,
                message,
                category,
                status : 'pending'
            });


            return res.status(201).json(response(201, 'Feedback berhasil dikirim', Feedback));
        } catch(error) {
            return res.status(500).json(response(500, error.message));
        }
    }

    static async myFeedback(req, res) {

        const feedbacks = await Feedback.findAll({
            where: {
                receiverId : req.user.id
            }
            // receiverId : req.user.id,
            // status : 'approved'
        });

        return res.status(200).json(response(200, 'Berhasil mengambil feedback', feedbacks));
    } catch(error) {
        return res.status(500).json(response(500, error.message));
    }
}

module.exports = FeedbackController;