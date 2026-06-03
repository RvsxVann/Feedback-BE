'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedbackLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      FeedbackLog.belongsTo(models.Feedback, {
        foreignKey: 'feedbackId'
      });

      FeedbackLog.belongsTo(models.User, {
        foreignKey: 'teacherId',
        as: 'teacher'
      });
    }
  }
  FeedbackLog.init({
    feedbackId: DataTypes.INTEGER,
    teacherId: DataTypes.INTEGER,
    action: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FeedbackLog',
  });
  return FeedbackLog;
};