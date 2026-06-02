'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/base');

class User extends Model {
    static associate(models) {

        User.hasMany(models.Feedback, {
            foreignKey : 'senderId',
            as: 'sentFeedbacks',
        });

        User.hasMany(models.Feedback, {
            foreignKey: 'receiverId',
            as: 'receivedFeedbacks'
        });
    }
}

    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNULL: false
            },

            email: {
                type: DataTypes.STRING,
                allowNULL: false
            },

            password: {
                type: DataTypes.STRING,
                allowNULL:false
            },
            
            role: {
                type: DataTypes.ENUM('student', 'teacher', 'admin'),
                defaultValue: 'student'
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users'
        }
    );

    module.exports = User;