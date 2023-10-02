"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usersRegSchema = new mongoose_1.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "user",
    },
    otp: {
        type: String
    },
    name: {
        type: String,
        minLength: [2, "At least 2 caracted must be provide"],
        maxLength: [15, "Name is to large"],
    },
});
const UserModel = (0, mongoose_1.model)("users", usersRegSchema);
exports.default = UserModel;
