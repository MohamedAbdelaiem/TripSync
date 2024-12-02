const express = require('express');
const AuthController = require('../Controllers/AuthorizationController');
const BlogController = require('../Controllers/BlogsController')

const BlogRouter = express.Router();

BlogRouter.route('/AllBlogs').get(AuthController.protect,BlogController.getAllBlogs);
BlogRouter.route('/CreateBlog').post(AuthController.protect,BlogController.createBlog);
BlogRouter.route('/DeleteBlog/:blog_id').delete(AuthController.protect,BlogController.deleteBlog);


module.exports = BlogRouter;
