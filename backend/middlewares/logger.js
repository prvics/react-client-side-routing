const { model } = require("mongoose");

function logger(req, res, next) {
  const ts = new Date();
  console.log(`[${ts}]: ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = { logger };
