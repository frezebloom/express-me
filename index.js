const app = require("./app");
const database = require("./database");
const config = require("./config");

database()
  .then(() => {
    console.log(`Connected to database`);
    app.listen(config.PORT, () =>
      console.log(`Start server on port ${config.PORT}`)
    );
  })
  .catch(error => {
    console.log(`Unable to connect to database ${error}`);
  });
