import ApiError from "../../errors/ApiError";
import BlogModel from "./BlogModel";
import { IBlogInterface } from "./blogInterface";

// Create A Blog
export const postBlogServices = async (data: IBlogInterface): Promise<IBlogInterface | {}> => {
    const createBlogData = await BlogModel.create(data);
    return createBlogData;
}

// Find Blog
export const findAllBlogServices = async (limit: number, skip: number): Promise<IBlogInterface[]> => {
    const findBlogdata = await BlogModel.find({}).sort({ "_id": -1 }).skip(skip).limit(limit);
    return findBlogdata;
}

// Find a blog data
export const findABlogServices = async (id: string): Promise<IBlogInterface | null> => {
    const findABlogdata = await BlogModel.findOne({ _id: id })
    return findABlogdata;
}

// Update A Blog
export const updateBlogServices = async (data: any): Promise<IBlogInterface | any> => {
    const findBlog: IBlogInterface | any = await BlogModel.findOne({ _id: data._id });
    if(findBlog){
        const deleteBlog = await BlogModel.updateOne(findBlog, data, { runValidators: true });
    return deleteBlog;
    }else{
        throw new ApiError(400, 'Blog Update failed !')
    }
}

// Delete A Blog
export const deleteBlogServices = async (data: any): Promise<IBlogInterface | any> => {
    const findBlog: IBlogInterface | any = await BlogModel.findOne({ _id: data.id });
    if (findBlog) {
        const deleteBlog = await BlogModel.deleteOne(findBlog, { runValidators: true });
        return deleteBlog;
    }else{
        throw new ApiError(400, 'Blog Delete failed !')
    }
}