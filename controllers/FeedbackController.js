const { Feedback } = require('../models');
const response = require('../helpers/response');
const { sequelize } = require('../models');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

class FeedbackController {

    static async create(req, res) {
        try {
            const { message } = req.body;
            const receiverId = Number(req.body.receiverId);
            const categoryId = Number(req.body.categoryId);

            // Validasi data terlebih dahulu
            if (!receiverId || !message || !categoryId) {
                return res.status(400).json(response(400, 'Data tidak lengkap'));
            }

            const feedback = await Feedback.create({
                senderId: req.user.id,
                receiverId,
                message,
                categoryId,
                attachment: req.file ? req.file.filename : null,
                status: 'pending'
            });

            return res.status(201).json(response(201, 'Feedback berhasil dikirim', feedback));

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

        const t = await sequelize.transaction();

        try {
            const { id } = req.params;

            const feedbacks = await Feedback.findByPk(id)

            if (!feedbacks) {
                await t.rollback();
                return res.status(404).json(response(404, 'Feedback tidak ditemukan'));
            }

            if (feedbacks.status !== 'pending') {
                await t.rollback();
                return res.status(400).json(response(400, 'Feedback sudah di proses'))
            }

            await feedbacks.update(
                { status: 'approved' },
                { transaction: t }
            );

            await t.commit();

            return res.status(200).json(response(200, 'Feedback sudah di proses', feedbacks));

        } catch (error) {
            await t.rollback()
            return res.status(500).json(response(500, error.message));
        }
    }

    static async reject(req, res) {

        const t = await sequelize.transaction();

        try {
            const feedbacks = await Feedback.findByPk(req.params.id);

            if(!feedbacks) {

                await t.rollback();
                return res.status(404).json(response(404, 'Feedback tidak ditemukan'));

            }

            if(feedbacks.status !== 'pending') {
                await t.rollback();
                return res.status(400).json(response(400, 'Feedback sudah di proses'));

            }

            await feedback.update(
                { status: 'rejected' },
                { transaction: t }
            );

            await t.commit();

            return res.status(200).json(response(200, 'Feedback ditolak', feedbacks));

        } catch (error) {
            await t.rollback()
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

    static async exportPDF(req, res) {
        try {
            
            const feedback = await Feedback.findAll();

            const pdf = new PDFDocument();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=feedback.pdf');

            pdf.pipe(res);

            pdf.fontSize(16).text('Laporan Feedback', { align: 'center' });
            pdf.moveDown();

            feedbacks.forEach((fb, i) => {
                pdf.fontSize(12).text(
                    `${i + 1}.${fb.message} | ${fb.status} | sender:${fb.senderId}`
                );
            });

            pdf.end();

        }catch(error) {
            return res.status(500).json(response(error.message));
        }
    }

    static async exportExcel(req, res) {
        try {
            
            const feedbacks = await Feedback.findAll();

            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWotkSheet('Feedback');

            sheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Message', key: 'message', width: 30 },
                { header: 'Status', key: 'status', width: 15 },
                { header: 'Sender', key: 'sender', width: 10 },
                { header: 'Receiver', key: 'receiver', width: 10}
            ];

            feedbacks.forEach(fb => {
                sheet.addRow(fb.dataValues);
            });

            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );

            res.setHeader(
                'Content-Disposition',
                'attachment; filename=feedback.xlsx'
            );

            await workbook.xlsx.write(res);
            res.end

        } catch (error) {
            return res.status(500).json(response(500, error.message));
        }
    }
}

module.exports = FeedbackController;