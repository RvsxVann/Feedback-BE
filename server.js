require('dotenv').config();
require('./models')

const app = require('./app')
const sequelize = require('./config/base');
const db = require('./models')


const PORT = process.env.PORT || 5000;

db.sequelize.authenticate()
    .then(() => {
        console.log('Server sudah berjalan Tuan');

        app.listen(PORT, () => {
            console.log(`Server berjalan di PORT : ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err)
    });
