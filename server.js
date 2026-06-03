require('dotenv').config();

const app = require('./app')
const sequelize = require('./config/base');
const db = require('./models');
const CategoryRoutes = require('./routes/CategoryRoutes');
const authRoute = require('./routes/AuthRoutes');
const feedbackRoute = require('./routes/FeedbackRoutes');


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

app.use('/categories', CategoryRoutes);
app.use('/api/auth', authRoute);
app.use('/api/feedback', feedbackRoute);
