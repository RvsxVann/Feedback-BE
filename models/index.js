require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME_DEVELOPMENT,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Feedback = require('./Feedback')(sequelize, Sequelize.DataTypes);
db.Category = require('./Category')(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Feedback, {
  foreignKey: 'senderId',
  as: 'sentFeedbacks',
});

db.User.hasMany(db.Feedback, {
  foreignKey: 'receiverId',
  as: 'receiverFeedbacks',
});

db.Feedback.belongsTo(db.User, {
  foreignKey: 'receiverId',
  as: 'receiver',
});

db.Feedback.belongsTo(db.User, {
  foreignKey: 'senderId',
  as: 'sender',
});

db.Category.hasMany(db.Feedback, {
  foreignKey: 'categoryId',
  as: 'feedbacks',
});

db.Feedback.belongsTo(db.Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

module.exports = db;