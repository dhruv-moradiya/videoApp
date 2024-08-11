// const dotenv = require("dotenv");
require("dotenv").config();
const connectToDB = require("./src/db/index");
const app = require("./app");

connectToDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🥳 Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("😭 MONGO db connection failed !!! ", error);
    process.exit(1);
  });
