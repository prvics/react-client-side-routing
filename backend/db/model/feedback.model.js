const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
  langid: Number,
  vote: Number, // +1 or -1
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Collection name generated automatically: 'feedbacks'
const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);

module.exports = FeedbackModel;
