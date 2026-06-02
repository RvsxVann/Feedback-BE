require('dotenv').config();
require('./models')

const app = require('./app')
const sequelize = require('./config/base');


const PORT = process.env.PORT || 5000;

sequelize.sync({ alter:true })
    .then(() => {
        console.log('Server sudah berjalan Tuan');

        app.listen(PORT, () => {
            console.log(`Server berjalan di PORT : ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err)
    });
