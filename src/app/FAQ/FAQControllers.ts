import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { IFAQInterface } from "./FAQInterface";
import { deleteFAQServices, findAllFAQServices, postFAQServices } from "./FAQServices";

// Add A FAQ
export const postFAQ: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IFAQInterface | any> => {
    try {
        const data = req.body;
        const result: IFAQInterface | {} = await postFAQServices(data);
        sendResponse<IFAQInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'FAQ Added successfully !'
        });


    } catch (error: any) {
        next(error);
    }
}

// Find All FAQ
export const findAllFAQ: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IFAQInterface | any> => {
    try {
        const result: IFAQInterface[] | any = await findAllFAQServices();
        sendResponse<IFAQInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'FAQ Found successfully !',
            data: result
        });

    } catch (error: any) {
        next(error);
    }
}

// Delete a FAQ
export const deleteFAQ: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IFAQInterface | any> => {
    try {
        const id = req.params.id;
        const result: IFAQInterface | any = await deleteFAQServices(id);
        if (result?.deletedCount > 0) {
            sendResponse<IFAQInterface>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'FAQ Delete successfully !'
            });
        }else{
            sendResponse<IFAQInterface>(res, {
                statusCode: 400,
                success: false,
                message: 'FAQ Delete failed !'
            });
        }

    } catch (error: any) {
        next(error);
    }
}