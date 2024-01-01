import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { FileUploadHelper } from "../../helpers/ImageUpload";
import ApiError from "../../errors/ApiError";
import { IAdsInterface } from "./adsInterface";
import { deleteAdsServices, findAAdsServices, findAllAdsServices, postAdsServices, updateAdsServices } from "./adsServices";
import AdsModel from "./AdsModel";

// Add A Ads
export const postAds: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IAdsInterface | any> => {
    try {

        if (req.files && 'ads_banner' in req.files && req.body) {
            // get the Ads image and upload
            let ads_banner;
            if (req.files && 'ads_banner' in req.files) {
                const adsImage = req.files['ads_banner'][0];
                const ads_banner_upload = await FileUploadHelper.uploadToCloudinary(adsImage);
                ads_banner = ads_banner_upload?.secure_url;
            }

            const requestData = req.body;
            const data = { ...requestData, ads_banner }
            const result: IAdsInterface | {} = await postAdsServices(data);
            sendResponse<IAdsInterface>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Ads Added successfully !'
            });
        }
        else {
            throw new ApiError(400, 'Image Upload failed')
        }

    } catch (error: any) {
        next(error);
    }
}

// Find All Ads
export const findAllAds: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IAdsInterface | any> => {
    try {
        const { page, limit } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const result: IAdsInterface[] | any = await findAllAdsServices(limitNumber, skip);
        const total = await AdsModel.countDocuments();
        sendResponse<IAdsInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Ads Found successfully !',
            data: result,
            totalData: total
        });

    } catch (error: any) {
        next(error);
    }
}

// Find All Ads
export const findAAds: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IAdsInterface | any> => {
    try {
        const { id } = req.params;

        const result: IAdsInterface | null = await findAAdsServices(id);
        sendResponse<IAdsInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Ads Found successfully !',
            data: result
        });

    } catch (error: any) {
        next(error);
    }
}

// Update a Ads
export const updateAds: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IAdsInterface | any> => {
    try {
        if (req.files && 'ads_banner' in req.files) {
            // get the Ads image and upload
            let ads_banner;
            if (req.files && 'ads_banner' in req.files) {
                const adsImage = req.files['ads_banner'][0];
                const ads_banner_upload = await FileUploadHelper.uploadToCloudinary(adsImage);
                ads_banner = ads_banner_upload?.secure_url;
            }

            const requestData = req.body;
            const data = { ...requestData, ads_banner }
            const result: IAdsInterface | any = await updateAdsServices(data);
            if (result?.modifiedCount > 0) {
                sendResponse<IAdsInterface>(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Ads Update successfully !'
                });
            } else {
                throw new ApiError(400, 'Ads Update failed !')
            }
        } else if (req.body) {
            const data = req.body;
            const result: IAdsInterface | any = await updateAdsServices(data);
            if (result?.modifiedCount > 0) {
                sendResponse<IAdsInterface>(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Ads Update successfully !'
                });
            } else {
                throw new ApiError(400, 'Ads Update failed !')
            }
        }
        else {
            throw new ApiError(400, 'Image Upload failed')
        }

    } catch (error: any) {
        next(error);
    }
}


// Delete a Ads
export const deleteAds: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IAdsInterface | any> => {
    try {
        const data = req.body;
        const result: IAdsInterface | any = await deleteAdsServices(data);
        if (result?.deletedCount > 0) {
            sendResponse<IAdsInterface>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Ads Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Ads Delete failed !')
        }

    } catch (error: any) {
        next(error);
    }
}