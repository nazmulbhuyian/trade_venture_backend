import { Request, Response, NextFunction } from "express";
import {RequestHandler} from 'express-serve-static-core'
import bcrypt from "bcryptjs"
import { getFindOneRegUserServices, postRegUserServices } from "./userRegServices";
const saltRounds = 10
import sendResponse from "../../shared/sendResponse";
import httpStatus from 'http-status';
import { IUserRegInterface } from "./userRegInterface";

// Registration A User
export const postRegUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IUserRegInterface | any> => {
    try {
        const data = req.body;
        if (!data?.email) {
            return sendResponse<IUserRegInterface>(res, {
                statusCode: 400,
                success: false,
                message: 'Please Provide A Email !'
            });
        }
        const inserted = await getFindOneRegUserServices(data?.email);
        if (inserted) {
            return sendResponse<IUserRegInterface>(res, {
                statusCode: 400,
                success: false,
                message: 'Previously Added !'
            });
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        bcrypt.hash(data?.password, saltRounds, async function (err: Error | null, hash: string) {
            const newUser: IUserRegInterface = {
                email: data.email,
                password: hash,
                name: data.name,
                otp: otp,
                role: data?.role ? data?.role : "Startup",
                status: data?.status ? data?.status : "Active"
            }
            try {
                const result: any = await postRegUserServices(newUser);
                sendResponse<IUserRegInterface>(res, {
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
