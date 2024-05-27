const express = require("express");
const connection = require("./db/connection/connection");
const { logger } = require("./middlewares/logger");

const app = express();
const PORT = 4000;

// Middlewares
app.use(express.json());
app.use(logger);

// API routes
const languageRouter = require("./routes/language.router.js");
app.use("/api/v2/languages", languageRouter);
const feedbackRouter = require("./routes/feedback.router.js");
app.use("/api/v2/feedbacks", feedbackRouter);

// Landing URL
app.get("/", (req, res) => {
  res.send("Popular programming languages API 2.0");
});

async function main() {
  const database = "langdb";
  await connection.connect();
  const isConnected = connection.isConnected(database);
  if (isConnected) {
    console.log(`Connected to '${database}' database!`);
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } else {
    console.log(`Could not connect to ${database}`);
  }
}

main();
