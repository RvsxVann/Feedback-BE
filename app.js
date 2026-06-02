const express = require('express');
const cors = require('cors');

const app = express();
const authRoute = require('./routes/AuthRoutes');
const feedbackRoute = require('./routes/FeedbackRoutes')

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/feedback', feedbackRoute);

module.exports = app;