"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const server_1 = __importDefault(require("./server"));
const app = (0, express_1.default)();
const userRegRoutes_1 = __importDefault(require("./app/userReg/userRegRoutes"));
// const usersLogRoutes = require('./routes/userLogRoutes');
// const getMeRoutes = require('./routes/getMeRoutes');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Trade Venture App is working! YaY!");
});
app.use('/userReg', userRegRoutes_1.default);
// app.use('/userLog', usersLogRoutes);
// app.use('/getMe', getMeRoutes);
(0, server_1.default)();
const port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port, () => {
    console.log(`Trade Venture app is running on port ${port}`);
});
// index.js -> routes -> controllers -> services -> models.
