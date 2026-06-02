const { User } = require('../models');
const response = require('../helpers/response');
const bcrypt = require('bcryptjs');

class UserController {
    static async createTeacher(req, res) {
        try {
            const { name, email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

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