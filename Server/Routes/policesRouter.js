const express=require('express');
const PoliciesController=require('../Controllers/PoliciesController');
const AuthController=require('../Controllers/AuthorizationController');
const policiesRouter=express.Router();

policiesRouter.route('/getAllPolicies').get(PoliciesController.getAllPolicies);

policiesRouter.route('/getPolicyById/:policy_id').get(PoliciesController.getPolicyById);

policiesRouter.route('/createPolicy').post(AuthController.protect,AuthController.restrictTo('admin'),PoliciesController.createPolicy);

policiesRouter.route('/deletePolicy/:policy_id').delete(AuthController.protect,AuthController.restrictTo('admin'),PoliciesController.deletePolicy);

policiesRouter.route('/updatePolicy/:policy_id').patch(AuthController.protect,AuthController.restrictTo('admin'),PoliciesController.updatePolicy);

policiesRouter.route('/getPoliciesByAdmin/:admin_id').get(AuthController.protect,AuthController.restrictTo('admin'),PoliciesController.getPolicyByAdmin);






module.exports=policiesRouter;