const express = require('express');
const AuthController = require('../Controllers/AuthorizationController');
const QAController = require('../Controllers/QAController');

const QARouter = express.Router();
QARouter.route('/getAllQAOfAgency/:user_id').get(AuthController.protect,QAController.getAllQAOfaTravelAgency);
QARouter.route('/getAllQA').get(AuthController.protect,QAController.getAllQAOfmyProfile);
QARouter.route('/addQA').post(AuthController.protect,AuthController.restrictTo('travel_agency'),QAController.addQA);
QARouter.route('/deleteQA/:QA_id').delete(AuthController.protect,AuthController.restrictTo('travel_agency','admin'),QAController.deleteQA);
QARouter.route('/updateQA/:QA_id').patch(AuthController.protect,AuthController.restrictTo('travel_agency'),QAController.updateQA);




module.exports = QARouter;

