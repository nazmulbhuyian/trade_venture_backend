import { Schema, model } from "mongoose";
import { IBlogInterface } from "./blogInterface";

// Blog Schema
const blogSchema = new Schema<IBlogInterface>({
    blog_image: {
        required: true,
        type: String,
    },
    blog_about: {
        required: true,
        type: String,
    },
    blog_title: {
        required: true,
        type: String,
    }
},{
    timestamps: true
})

const BlogModel = model<IBlogInterface>("blog", blogSchema);

export default BlogModel;
