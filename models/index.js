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
    foreignKey: 'receiverId',
    as : 'receiver'
});

Feedback.belongsTo(User, {
    foreignKey: 'senderId',
    as : 'sender'
});

module.exports = {
    User,
    Feedback
};