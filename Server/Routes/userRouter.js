const express = require('express');
const UserConroller = require('../Controllers/UserConroller');
const AuthConroller = require('../Controllers/AuthorizationController');

//Routes
const QARouter=require('./QARouter');
const userRouter = express.Router();


// Authentication Routes
userRouter.route('/SignUp').post(AuthConroller.signup);
userRouter.route('/Login').post(AuthConroller.LogIn);
userRouter.route('/Logout').post(AuthConroller.LogOut); // Changed to POST
userRouter.route('/ForgotPassword').post(AuthConroller.forgotPassword);
userRouter.route('/ResetPassword/:resetToken').patch(AuthConroller.resetPassword);

// Admin-protected routes

userRouter
  .route('/getAllUsers')
  .get(AuthConroller.protect,AuthConroller.restrictTo("admin"), UserConroller.getAllUsers);

userRouter
  .route('/getAllAdmins')
  .get(AuthConroller.protect,AuthConroller.restrictTo("admin"), UserConroller.getAllAdmins);

userRouter
  .route('/createUser')
  .post(AuthConroller.protect,AuthConroller.restrictTo("admin"), UserConroller.createUser);

userRouter
  .route('/deleteUser')
  .delete(AuthConroller.protect,AuthConroller.restrictTo("admin"), UserConroller.DeleteUser);

// General routes
userRouter.route('/myProfile').get(AuthConroller.protect,UserConroller.getMe,UserConroller.getUser);
userRouter.route('/getAllTravelAgencies').get(AuthConroller.protect,UserConroller.getAllTravelAgencies);
userRouter.route('/getAllTravelers').get(AuthConroller.protect,UserConroller.getAllTravelers);
userRouter.route('/:user_id').get(AuthConroller.protect,UserConroller.getUser);
userRouter.route('/DeleteME').delete(AuthConroller.protect,UserConroller.getMe,UserConroller.DeleteMe);
userRouter.route('/updateMe').patch(AuthConroller.protect,UserConroller.getMe,UserConroller.UpdateMe);

//Other routers dependent
userRouter.use('/myProfile/QA',QARouter);

// Export the router
module.exports = userRouter;
