"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.DB_PASSWORD}@trade-ventures.xofd8ek.mongodb.net/trade_venture?retryWrites=true&w=majority`;
function connectDB() {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(uri)
        .then(() => {
        console.log(`Database connection Successfull`);
    })
        .catch((err) => {
        console.log(err);
    });
}
exports.default = connectDB;
