import { Request, Response, NextFunction } from "express";
import {RequestHandler} from 'express-serve-static-core'
import bcrypt from "bcryptjs"
import { getFindOneRegUserServices, postRegUserServices } from "./userRegServices";
const saltRounds = 10
import { UserRegInterface } from "./userRegInterface";
import sendResponse from "../../shared/sendResponse";
import httpStatus from 'http-status';

// Registration A User
export const postRegUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<UserRegInterface | any> => {
    try {
        const data = req.body;
        if (!data?.email) {
            return sendResponse<UserRegInterface>(res, {
                statusCode: 400,
                success: false,
                message: 'Please Provide A Email !'
            });
        }
        const inserted = await getFindOneRegUserServices(data?.email);
        if (inserted) {
            return sendResponse<UserRegInterface>(res, {
                statusCode: 400,
                success: false,
                message: 'Previously Added !'
            });
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        bcrypt.hash(data?.password, saltRounds, async function (err: Error | null, hash: string) {
            const newUser: UserRegInterface = {
                email: data.email,
                password: hash,
                name: data.name,
                otp: otp
            }
            try {
                const result: any = await postRegUserServices(newUser);
                sendResponse<UserRegInterface>(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'User Added successfully !',
                    data: result,
                });
            } catch (error) {
                next(error);
            }
        });


    } catch (error: any) {
        next(error);
    }
}
