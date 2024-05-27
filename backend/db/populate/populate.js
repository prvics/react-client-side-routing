const fs = require("fs/promises");
const path = require("path");
const connection = require("../connection/connection");
const LanguageModel = require("../model/language.model");
const FeedbackModel = require("../model/feedback.model");


async function populateLanguages() {
  const languageFilePath = path.join(
    __dirname,
    "../data",
    "programming_languages.json"
  );
  const languages = JSON.parse(await fs.readFile(languageFilePath));
  await LanguageModel.deleteMany({});
  await LanguageModel.create(languages);
  console.log(`${languages.length} documents were created`);
}

async function populateFeedback() {
  const feedbackFilePath = path.join(__dirname, "../data", "feedback.json");
  const feedbacks = JSON.parse(await fs.readFile(feedbackFilePath));
  await FeedbackModel.deleteMany({});
  await FeedbackModel.create(feedbacks);
  console.log(`Added ${feedbacks.length} feedback(s)`);
}

async function main() {
  const database = "langdb";
  await connection.connect();
  const isConnected = connection.isConnected(database);
  if (isConnected) {
    console.log(`Connected to '${database}' database!`);
    await populateLanguages();
    await populateFeedback();
    await connection.disconnect();
    const isDisconnected = connection.isDisconnected(database);
    if(isDisconnected) {
      console.log(`Disconnected from '${database}' database!`);
    }
  } else {
    console.log(`Could not connect to ${database}`);
  }
}

main();
