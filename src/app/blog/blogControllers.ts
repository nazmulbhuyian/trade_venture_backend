import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { IBlogInterface } from "./blogInterface";
import { deleteBlogServices, findABlogServices, findAllBlogServices, postBlogServices, updateBlogServices } from "./blogServices";
import { FileUploadHelper } from "../../helpers/ImageUpload";
import ApiError from "../../errors/ApiError";
import BlogModel from "./BlogModel";

// Add A Blog
export const postBlog: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IBlogInterface | any> => {
    try {

        if (req.files && 'blog_image' in req.files && req.body) {
            // get the blog image and upload
            let blog_image;
            if (req.files && 'blog_image' in req.files) {
                const blogImage = req.files['blog_image'][0];
                const blog_image_upload = await FileUploadHelper.uploadToCloudinary(blogImage);
                blog_image = blog_image_upload?.secure_url;
            }

            const requestData = req.body;
            const data = { ...requestData, blog_image }
            const result: IBlogInterface | {} = await postBlogServices(data);
            sendResponse<IBlogInterface>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Blog Added successfully !'
            });
        }
        else {
            throw new ApiError(400, 'Image Upload failed')
        }

    } catch (error: any) {
        next(error);
    }
}

// Find All Blog
export const findAllBlog: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IBlogInterface | any> => {
    try {
        const { page, limit } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const result: IBlogInterface[] | any = await findAllBlogServices(limitNumber, skip);
        const total = await BlogModel.countDocuments();
        sendResponse<IBlogInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Blog Found successfully !',
            data: result,
            totalData: total
        });

    } catch (error: any) {
        next(error);
    }
}

// Find All Blog
export const findABlog: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IBlogInterface | any> => {
    try {
        const { id } = req.params;

        const result: IBlogInterface | null = await findABlogServices(id);
        sendResponse<IBlogInterface>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Blog Found successfully !',
            data: result
        });

    } catch (error: any) {
        next(error);
    }
}

// Update a Blog
export const updateBlog: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IBlogInterface | any> => {
    try {
        if (req.files && 'blog_image' in req.files) {
            // get the blog image and upload
            let blog_image;
            if (req.files && 'blog_image' in req.files) {
                const blogImage = req.files['blog_image'][0];
                const blog_image_upload = await FileUploadHelper.uploadToCloudinary(blogImage);
                blog_image = blog_image_upload?.secure_url;
            }

            const requestData = req.body;
            const data = { ...requestData, blog_image }
            const result: IBlogInterface | any = await updateBlogServices(data);
            if (result?.modifiedCount > 0) {
                sendResponse<IBlogInterface>(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Blog Update successfully !'
                });
            } else {
                throw new ApiError(400, 'Blog Update failed !')
            }
        } else if (req.body) {
            const data = req.body;
            const result: IBlogInterface | any = await updateBlogServices(data);
            if (result?.modifiedCount > 0) {
                sendResponse<IBlogInterface>(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Blog Update successfully !'
                });
            } else {
                throw new ApiError(400, 'Blog Update failed !')
            }
        }
        else {
            throw new ApiError(400, 'Image Upload failed')
        }

    } catch (error: any) {
        next(error);
    }
}


// Delete a Blog
export const deleteBlog: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<IBlogInterface | any> => {
    try {
        const data = req.body;
        const result: IBlogInterface | any = await deleteBlogServices(data);
        if (result?.deletedCount > 0) {
            sendResponse<IBlogInterface>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Blog Delete successfully !'
            });
        } else {
            throw new ApiError(400, 'Blog Delete failed !')
        }

    } catch (error: any) {
        next(error);
    }
}