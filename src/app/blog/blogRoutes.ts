import express from "express";
import { deleteBlog, findABlog, findAllBlog, postBlog, updateBlog } from "./blogControllers";
import { FileUploadHelper } from "../../helpers/ImageUpload";
const router = express.Router();

// Add A Blog and get Blog update blog delete blog
router.route('/').post(FileUploadHelper.ImageUpload.fields([{ name: 'blog_image', maxCount: 1 }]), postBlog).get(findAllBlog).patch(FileUploadHelper.ImageUpload.fields([{ name: 'blog_image', maxCount: 1 }]), updateBlog).delete(deleteBlog);

// find a Blog
router.route('/:id').get(findABlog);

export const BlogRoutes = router;