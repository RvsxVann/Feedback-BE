const { Category } = require('../models');
const response = require('../helpers/response');

class CategoryController {

    static async getAll(req, res) {
        try {
            
            const categories = await Category.findAll({
                where: {
                    isActive: true
                }
            });

            return res.status(200).json(response(200, 'Berhasil mengambil kategori', categories));

        } catch (error) {
            return res.status(500).json(response(500, error.message));
        }
    }

    static async create(req, res) {
        try {
            
            const { name } = req.body;

            if (!name || name.toString().trim() === '') {
                return res.status(400).json(response(400, 'Nama kategori wajib diisi'));
            }

            const category = await Category.create({ name });

            return res.status(201).json(response(201, 'Berhasil membuat kategori', category));

        } catch (error) {
            return res.status(500).json(response(500, error.message));
        }
    }

    static async update(req, res) {
        try {
            
            const category = await Category.findByPk(req.params.id);

            if(!category) {
                return res.status(404).json(response(404, 'Kategori tidak ditemukan'));
            }

            const { name } = req.body;

            if (!name || name.toString().trim() === '') {
                return res.status(400).json(response(400, 'Nama kategori wajib diisi'));
            }

            const updated = await category.update({ name });

            return res.status(200).json(response(200, 'Kategori berhasil diperbarui', updated));

        } catch (error) {
            return res.status(500).json(response(500, error.message));
        }
    }

    static async delete(req, res) {

        try {
            
            const category = await Category.findByPk(req.params.id);

            if(!category) {return res.status(404).json(response(404, 'Kategori tidak ditemukan'))};

            // soft-delete: set isActive to false
            const updated = await category.update({ isActive: false });

            return res.status(200).json(response(200, 'Kategori berhasil dinonaktifkan', updated));

        } catch (error) {

            return res.status(500).json(response(500, error.message));

        }
    }

    static async status(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);

            if (!category) {
                return res.status(404).json(response(404, 'Kategori tidak ditemukan'));
            }

            const updated = await category.update({
                isActive: !category.isActive
            });

            return res.status(200).json(response(200, 'Status berhasil diubah', updated));
        } catch (error) {
            return res.status(500).json(response(500, error.message));
        }
    }
}

module.exports = CategoryController;