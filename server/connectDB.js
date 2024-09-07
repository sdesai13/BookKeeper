const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const dbconn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connectioned ${dbconn.connection.host}`)


  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
