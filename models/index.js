const User = require('./User');
const Feedback = require('./Feedback');

User.hasMany(Feedback, {
    foreignKey : 'senderId',
    as : 'sentFeedbacks'
});

User.hasMany(Feedback, {
    foreignKey : 'receiverId',
    as : 'receiverFeedbacks'
});

Feedback.belongsTo(User, {
    foreginKey: 'receiverId',
    as : 'receiver'
});

module.exports = {
    User,
    Feedback
};