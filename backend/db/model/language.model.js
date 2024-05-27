const mongoose = require('mongoose');

const LanguageSchema = mongoose.Schema({
  langid: Number,
  name: String,
  dob: Number,
  github23_pr: Number,
  github23_stars: Number,
  designer: String,
  maintainer: String,
  logo: String,
});

// Collection name generated automatically: 'languages'
const LanguageModel = mongoose.model('Language', LanguageSchema);

module.exports = LanguageModel;
