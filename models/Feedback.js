'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'sender',
      });

      Feedback.belongsTo(models.User, {
        foreignKey: 'receiverId',
        as: 'receiver',
      });

      Feedback.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });

      Feedback.hasMany(models.FeedbackLog, {
        foreignKey: 'feedbackId',
        as: 'logs',
      });
    }
  }

  Feedback.init(
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
      },

      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      attachment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Feedback',
      tableName: 'feedbacks',
    }
  );

  return Feedback;
};