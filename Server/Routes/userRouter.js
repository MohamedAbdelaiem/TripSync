const express=require('express');
const UserConroller=require('../Controllers/UserConroller');

const userRouter=express.Router();
//api/v1/users

//Get Routes for Users

userRouter.route('/getAllUsers').get(UserConroller.getAllUsers);

userRouter.route('/getAllTravelAgencies').get(UserConroller.getAllTravelAgencies);

userRouter.route('/getAllTravelers').get(UserConroller.getAllTravelers);

userRouter.route('/getAllAdmins').get(UserConroller.getAllAdmins);

userRouter.route('/:user_id').get(UserConroller.getUser);

//Post Routes for Users
userRouter.route('/createUser').post(UserConroller.createUser);

//PATCH Routes for Users
userRouter.route('/updateUser/:user_id').patch(UserConroller.UpdateUser);//will be Changed soon

//Delete Routes for Users
userRouter.route('/deleteUser/:user_id').delete(UserConroller.DeleteUser);






module.exports=userRouter;