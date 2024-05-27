const FeedbackModel = require("../model/feedback.model");


async function getFeedbacks() {
    return await FeedbackModel.find();
}

async function getFeedbacksByLangId(langid) {
    // reference
    // return await FeedbackModel.find({ langid });
    // TASK 8
    const upvotes = await FeedbackModel.find({ langid: langid, vote: 1 }).count();
    const downvotes = await FeedbackModel.find({ langid: langid, vote: -1 }).count();
    return { upvotes, downvotes };
}

async function createFeedback(feedback) {
    return await FeedbackModel.create(feedback);
}

module.exports = {
    getFeedbacks,
    getFeedbacksByLangId,
    createFeedback
}