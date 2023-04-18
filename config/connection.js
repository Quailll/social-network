const { connect, connection } = require("mongoose");

connect("mongodb://localhost/socialnetwork_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
