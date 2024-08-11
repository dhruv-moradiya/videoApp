const mongoose = require("mongoose");

async function connectToDB() {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME,
    });

    console.log(
      "✨ Connected to MongoDB ✨" + " " + connectionInstance.connection.host
    );
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
}

module.exports = connectToDB;
