
import express, {Application, Request, Response} from "express";
import cors from "cors"
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
import connectDB from "./server";

const app : Application = express();


import usersRegRoutes from './app/userReg/userRegRoutes';
import usersLogRoutes from './app/userLogin/userLoginRoutes'
import getMeRoutes from './app/getMe/getMeRoutes'

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Trade Venture App is working! YaY!");
});


app.use('/userReg', usersRegRoutes);
app.use('/userLog', usersLogRoutes);
app.use('/getMe', getMeRoutes);



connectDB();

const port: number = parseInt(process.env.PORT as string, 10) || 8080;

app.listen(port, () => {
    console.log(`Trade Venture app is running on port ${port}`);
});



// index.js -> routes -> controllers -> services -> models.