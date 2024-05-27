const LanguageModel = require("../model/language.model");

async function getLanguages(orderBy, dir, search) {
  // TASK 4
  let orderExpression = {};
  let searchExpression = {};

  // filtering
  if (search) {
    searchExpression = {
      $or: [
        { name: { $regex: new RegExp(search, "i") } },
        { designer: { $regex: new RegExp(search, "i") } },
        { maintainer: { $regex: new RegExp(search, "i") } },
      ],
    };
  }

  // sorting
  if (orderBy && dir) {
    orderExpression = { [orderBy]: dir };
  }

  return await LanguageModel.find(searchExpression)
    .sort(orderExpression)
    .select({ langid: 1, name: 1, _id: 0 });
  // TASK 1
  return await LanguageModel.find().select({ langid: 1, name: 1, _id: 0 });
}

async function getLanguageById(langid) {
  // TASK 2
  return await LanguageModel.find({ langid });
}

async function createLanguage(language) {
  // TASK 3
  return await LanguageModel.create(language);
}

async function updateLanguage(langid, language) {
  // TASK 5
  return await LanguageModel.updateOne({ langid }, language);
}

async function getLanguagesByMinStarsOrMinDate(stars, date) {
  // TASK 6
  return await LanguageModel.find({
    $or: [
      { github23_stars: { $gte: stars } },
      { dob: { $gte: date } },
    ],
  })
    .sort({ name: "asc" })
    .select({ langid: 1, name: 1, github23_stars: 1, dob: 1, _id: 0 });
}

async function getLanguagesByMaxStarsOrMaxDate(stars, date) {
  // TASK 7
  return await LanguageModel.find({
    $and: [
      { github23_stars: { $lt: stars } },
      { dob: { $lt: date } },
    ],
  })
    .sort({ github23_stars: "asc" })
    .select({ langid: 1, name: 1, github23_stars: 1, dob: 1, _id: 0 });
}

module.exports = {
  getLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  getLanguagesByMinStarsOrMinDate,
  getLanguagesByMaxStarsOrMaxDate
};
