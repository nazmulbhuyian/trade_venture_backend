import { RequestHandler } from "express";
import { promisify } from 'util'
const dotenv = require("dotenv").config();
import jwt, { Secret } from 'jsonwebtoken';
import { getMeUsersService } from "./getMeServices";
import { UserRegInterface } from "../userReg/userRegInterface";

export const getMeUser: RequestHandler = async (req, res, next): Promise<UserRegInterface | any> => {
    try {
        // const token = req.headers?.authorization;
        const token = await req.headers?.authorization?.split(" ")?.[1];
        if (!token) {
            return res.status(400).json({
                status: 'Failled',
                message: "Invalid User"
            })
        }
        const decode: any = await promisify(jwt.verify as (token: string, secret: string | undefined) => any)(token, process.env.ACCESS_TOKEN);

            const user: UserRegInterface | null = await getMeUsersService(decode.email);
            if (user) {
                return res.status(200).json({
                    status: 'Successfully',
                    email: decode.email,
                    userRole: user.role,
                })
            }
            res.status(400).json({
                status: 'Failled',
                message: "Token is not valid",
            })

    } catch (error: Error | any) {
        res.status(400).json({
            status: 'Failled',
            message: "get me Failed",
            error: error.message
        })
    }
}


export const getUserInformation: RequestHandler = async (req, res, next): Promise<UserRegInterface | any> => {
    try {

        const email = req.params.email;

        if (!email) {
            return res.status(400).json({
                status: 'Failled',
                message: "Please Provide Email"
            })
        }

        const user: UserRegInterface | null = await getMeUsersService(email);

        if (user) {
            return res.status(200).json({
                status: 'Successfully',
                data: user
            })
        }
        res.status(400).json({
            status: 'Failled',
            message: "User Information Get Failed",
        })

    } catch (error: Error | any) {
        res.status(400).json({
            status: 'Failled',
            message: "Something Wrong",
            error: error.message
        })
    }
}