const express = require("express");
const router = express.Router();
const query = require("../db/queries/language.query");

router.get("/", async (req, res, next) => {
  const minStars = req.query["min-stars"];
  const minDate = req.query["min-date"];
  if (!minStars || !minDate) {
    next();
  } else {
    try {
      const languages = await query.getLanguagesByMinStarsOrMinDate(
        parseInt(minStars),
        parseInt(minDate)
      );
      res.json(languages);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
});

router.get("/", async (req, res, next) => {
  const maxStars = req.query["max-stars"];
  const maxDate = req.query["max-date"];
  if (!maxStars || !maxDate) {
    next();
  } else {
    try {
      const languages = await query.getLanguagesByMaxStarsOrMaxDate(
        parseInt(maxStars),
        parseInt(maxDate)
      );
      res.json(languages);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const { orderBy, dir, search } = req.query;
    if (Boolean(orderBy) ^ Boolean(dir)) {
      res.status(406).send("Invalid order parameters");
    }
    const languages = await query.getLanguages(orderBy, dir, search);
    res.json(languages);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

router.get("/:langid", async (req, res) => {
  try {
    const langid = parseInt(req.params.langid);
    const language = await query.getLanguageById(langid);
    if (language.length > 0) {
      res.json(language[0]); // langid should be unique
    } else {
      res.status(404).json({ msg: `There is no language with ID ${langid}` });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(typeof req.body);
    console.log(req.body);
    const langid = req.body.langid;
    const language = await query.getLanguageById(langid);
    if (language.length > 0) {
      res.status(400).json({ msg: `The ID ${langid} already exists` }); // langid should be unique
    } else {
      const saved = await query.createLanguage(req.body);
      res.json(saved);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

router.patch("/:langid", async (req, res) => {
  try {
    const langid = parseInt(req.params.langid);
    const language = await query.getLanguageById(langid);
    if (language.length > 0) {
      const status = await query.updateLanguage(langid, req.body);
      if (status.acknowledged) {
        if (status.modifiedCount > 0) {
          res.json({ msg: `Language modified successfully with ID ${langid}` });
        } else {
          res
            .status(200)
            .json({ msg: `No modifications were made with ID ${langid}!` });
        }
      } else {
        res
          .status(500)
          .json({ msg: `Language modification failed with ID ${langid}!` });
      }
    } else {
      res.status(404).json({ msg: `There is no language with ID ${langid}` });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
