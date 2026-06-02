'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/base');

class Feedback extends Model {
    static associate(models) {
        Feedback.belongsTo(models.User, {
            foreignKey: 'senderId',
            as: 'sender'
        });

        Feedback.belongsTo(models.User, {
            foreignKey: 'receiverId',
            as: 'receiver'
        });
    }
}

Feedback.init (
    {
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        category: {
            type: DataTypes.ENUM(
                'communication',
                'discipline',
                'teamwork',
                'attitude'
            ),
            allowNull : false
        },

        status : {
            type: DataTypes.ENUM(
                'pending',
                'approved',
                'rejected'
            ),
            defaultValue : 'pending'
        },
        
        senderId : {
            type: DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'users',
                key: 'id'
            }
        },

        receiverId : {
            type: DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'users',
                key: 'id'
            }
        },

        attachment : {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName : 'Feedback',
        tableName : 'feedbacks'
    }

);


module.exports = Feedback;