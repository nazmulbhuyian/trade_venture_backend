
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
const dotenv = require("dotenv");
dotenv.config();
import connectDB from "./server";
import httpStatus from 'http-status';
import routes from './routes/routes';
import globalErrorHandler from "./middlewares/GlobalErrorHandler/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Trade Venture App is working! YaY!");
});

// Import All Api
app.use('/api/v1', routes);


//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});


connectDB();

const port: number = parseInt(process.env.PORT as string, 10) || 8080;

app.listen(port, () => {
  console.log(`Trade Venture app is running on port ${port}`);
});



// index.js -> routes -> controllers -> services -> models.