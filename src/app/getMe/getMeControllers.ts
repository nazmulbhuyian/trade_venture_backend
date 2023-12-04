import { RequestHandler } from "express";
import { promisify } from 'util'
const dotenv = require("dotenv").config();
import jwt, { Secret } from 'jsonwebtoken';
import { getMeUsersService } from "./getMeServices";
import { UserRegInterface } from "../userReg/userRegInterface";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

// Find A User For FrontEnd Whole Page Excess For Context.
export const getMeUser: RequestHandler = async (req, res, next): Promise<UserRegInterface | any> => {
    try {
        // const token = req.headers?.authorization;
        const token = await req.headers?.authorization?.split(" ")?.[1];
        if (!token) {
            return sendResponse<UserRegInterface>(res, {
                statusCode: 400,
                success: true,
                message: 'Invalid User !'
            });
        }
        const decode: any = await promisify(jwt.verify as (token: string, secret: string | undefined) => any)(token, process.env.ACCESS_TOKEN);

        const user: UserRegInterface | null = await getMeUsersService(decode.email);
        if (user) {
            return res.status(200).json({
                success: true,
                email: decode.email,
                userRole: user.role
            })
        }
        sendResponse<UserRegInterface>(res, {
            statusCode: 400,
            success: false,
            message: 'Token is not valid !'
        });

    } catch (error: Error | any) {
        next(error)
    }
}

// Get A Single User Information.
export const getUserInformation: RequestHandler = async (req, res, next): Promise<UserRegInterface | any> => {
    try {
        const email = req.params.email;
        if (!email) {
            return sendResponse<UserRegInterface>(res, {
                statusCode: 400,
                success: false,
                message: 'Please Provide Your Email !'
            });
        }
            const user: UserRegInterface | null = await getMeUsersService(email);
            if (user) {
                sendResponse<UserRegInterface>(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'User Information Get successfully !',
                    data: user,
                });
            }else{
                sendResponse<UserRegInterface>(res, {
                    statusCode: 400,
                    success: false,
                    message: 'User Information Not Found !',
                    data: user,
                });
            }

    } catch (error: Error | any) {
        next(error)
    }
}