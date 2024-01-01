import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { IContactUsInterface, IGetNotifiedInterface } from "./contactUsInterface";
import { deleteContactUsServices, findAllContactUsServices, findAllGetNotifiedServices, postContactUsServices, postGetNotifiedServices } from "./contactUsServices";
import GetNotifiedModel from "./GetNotifiedModel";
import ContactUsModel from "./ContactUsModel";

// Add A ContactUs
export const postContactUs: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IContactUsInterface | any> => {
    try {
        const data = req.body;
        const result: IContactUsInterface | {} = await postContactUsServices(data);
        sendResponse<IContactUsInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Contact Us Added successfully !'
        });


    } catch (error: any) {
        next(error);
    }
}

// Find All ContactUs
export const findAllContactUs: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IContactUsInterface | any> => {
    try {
        const {page, limit} = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const result: IContactUsInterface[] | any = await findAllContactUsServices(limitNumber, skip);
        const total = await ContactUsModel.countDocuments();
        sendResponse<IContactUsInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Contact Us Found successfully !',
            data: result,
            totalData: total
        });

    } catch (error: any) {
        next(error);
    }
}

// Add A Get Notified
export const postGetNotified: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IGetNotifiedInterface | any> => {
    try {
        const data = req.body;
        const result: IGetNotifiedInterface | {} = await postGetNotifiedServices(data);
        sendResponse<IGetNotifiedInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Get Notified Added successfully !'
        });


    } catch (error: any) {
        next(error);
    }
}

// Find All Get Notified
export const findAllGetNotified: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IGetNotifiedInterface | any> => {
    try {
        const {page, limit} = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const result: IGetNotifiedInterface[] |  any = await findAllGetNotifiedServices(limitNumber, skip);
        const total = await GetNotifiedModel.countDocuments();
        sendResponse<IGetNotifiedInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Get Notified Found successfully !',
            data: result,
            totalData: total
        });

    } catch (error: any) {
        next(error);
    }
}

// Delete a ContactUs
export const deleteContactUs: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IContactUsInterface | any> => {
    try {
        const data = req.body;
        const id = data?.id;
        const result: IContactUsInterface | any = await deleteContactUsServices(id);
        if (result?.deletedCount > 0) {
            sendResponse<IContactUsInterface>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Contact Us Delete successfully !'
            });
        }else{
            sendResponse<IContactUsInterface>(res, {
                statusCode: 400,
                success: false,
                message: 'Contact Us Delete failed !'
            });
        }

    } catch (error: any) {
        next(error);
    }
}