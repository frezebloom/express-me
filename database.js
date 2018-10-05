const config = require("./config");
const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    config.MONGO_URL,
    {
      connectTimeoutMS: 1000,
      useNewUrlParser: true
    }
  );
};
