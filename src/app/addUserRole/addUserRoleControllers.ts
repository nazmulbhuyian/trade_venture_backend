import { NextFunction, Request, RequestHandler, Response } from "express";
import { IUserRoleAddInterface } from "./addUserRoleTypeInterface";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { deleteUserRoleServices, findUserAllRoleServices, findUserRoleExistServices, postUserRoleServices } from "./addUserRoleServices";

// Add A User Role
export const postUserRole: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IUserRoleAddInterface | any> => {
    try {
        const data = req.body;
        const exist: IUserRoleAddInterface | null = await findUserRoleExistServices(data?.user_role_type_name);
        if (exist) {
            return sendResponse<IUserRoleAddInterface>(res, {
                statusCode: httpStatus.FOUND,
                success: false,
                message: 'Previously the user role was added !'
            });
        }
        const result: IUserRoleAddInterface | {} = await postUserRoleServices(data);
        sendResponse<IUserRoleAddInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User Role Added successfully !'
        });


    } catch (error: any) {
        next(error);
    }
}

// Find User All Role
export const findUserAllRole: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IUserRoleAddInterface | any> => {
    try {
        const result: IUserRoleAddInterface[] | any = await findUserAllRoleServices();
        sendResponse<IUserRoleAddInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User Role Found successfully !',
            data: result
        });

    } catch (error: any) {
        next(error);
    }
}

// Delete a User All Role
export const deleteUserRole: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IUserRoleAddInterface | any> => {
    try {
        const id = req.params.id;
        const result: IUserRoleAddInterface | any = await deleteUserRoleServices(id);
        if (result?.deletedCount > 0) {
            sendResponse<IUserRoleAddInterface>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'User Role Delete successfully !'
            });
        }else{
            sendResponse<IUserRoleAddInterface>(res, {
                statusCode: 400,
                success: false,
                message: 'User Role Delete failed !'
            });
        }

    } catch (error: any) {
        next(error);
    }
}