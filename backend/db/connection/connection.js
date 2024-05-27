const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.join(__dirname, "../../config/.env"),
  override: true,
});

const { MONGO_URL } = process.env;

let connection;

function createConnectionString(mongoURL) {
  return MONGO_URL.replace("<username>", USERNAME)
    .replace("<password>", PASSWORD)
    .replace("<cluster>", CLUSTER)
    .replace("<dbname>", DBNAME);
}

function getConnectionState(connection) {
  return {
    state: mongoose.STATES[connection.connection.readyState],
    database: connection?.connections[0]?.name,
  };
}

function isConnected(database) {
  const status = getConnectionState(connection);
  return status.state === "connected" && status.database === database;
}

function isDisconnected(database) {
  const status = getConnectionState(connection);
  return status.state === "disconnected" && status.database === database;
}

async function connect() {
  connection = await mongoose.connect(MONGO_URL);
}

function disconnect() {
  return connection.disconnect();
}

module.exports = {
  connect,
  disconnect,
  createConnectionString,
  isConnected,
  isDisconnected,
};
