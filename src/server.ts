
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.DB_PASSWORD}@trade-ventures.xofd8ek.mongodb.net/trade_venture?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost:27017/tradeVenture';

function connectDB() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Database connection successful`);
    })
    .catch((err: Error) => {
      console.error(`Error connecting to MongoDB: ${err.message}`);
    });
}

export default connectDB;

