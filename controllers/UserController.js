const { User } = require('../models');
const response = require('../helpers/response');
const bcrypt = require('bcryptjs');

class UserController {
    static async createTeacher(req, res) {
        try {
            const { name, email, password } = req.body;

            // Validasi data terlebih dahulu
            if (!name || !email || !password) {
                return res.status(400).json(response(400, 'Data tidak lengkap'));
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Check if email already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json(response(409, 'Email sudah digunakan'));
            }

            const teacher = await User.create({
                name,
                email,
                password: hashedPassword,
                role: 'teacher'
            });

            return res.status(201).json(
                response(201, 'Akun Teacher berhasil dibuat', teacher)
            );

        } catch (error) {
            return res.status(500).json(response(500, error.message));
        }
    }
}

module.exports = UserController;