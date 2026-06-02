const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const response = require('../helpers/response');

class AuthController {

    static async register(req, res) {
        try {

            const { name, email, password } = req.body;

            // Validasi data terlebih dahulu
            if (!name || !email || !password) {
                return res.status(400).json(response(400, 'Data tidak lengkap'));
            }

            const existingUser = await User.findOne({
                where: { email }
            });

            if (existingUser) {
                return res.status(409).json(response(409, 'Email sudah digunakan'));
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const createData = await User.create({
                name,
                email,
                password: hashPassword
            });

            const userResponse = {

                id: createData.id,
                name: createData.name,
                email: createData.email,
                role: createData.role

            }

            return res.status(201).json(response(201, 'Register berhasil', userResponse));

        } catch (error) {

            return res.status(500).json(response(500, error.message));

        }
    }

    static async login(req, res) {
        try {

            const { email, password } = req.body;

            // Validasi data terlebih dahulu
            if (!email || !password) {
                return res.status(400).json(response(400, 'Email dan password wajib diisi'));
            }

            const user = await User.findOne({
                where: { email }
            });

            if (!user) {
                return res.status(404).json(response(404, 'User tidak ditemukan'));
            }

            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {
                return res.status(401).json(response(401, 'Password salah'));
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.AUTH_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            return res.status(200).json(response(200,'Login berhasil',{ token }
                    )
                );

        } catch (error) {

            return res.status(500).json(response(500, error.message));

        }
    }
}

module.exports = AuthController;