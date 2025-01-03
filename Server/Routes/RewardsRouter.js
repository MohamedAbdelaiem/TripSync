const express = require('express');
const AuthController = require('../Controllers/AuthorizationController');
 const RewardsController = require('../Controllers/RewardsConroller');
const rewardsRouter = express.Router();


rewardsRouter.route('/getAllRewards').get(AuthController.protect,AuthController.restrictTo('admin',"traveller"),RewardsController.getAllRewards);
rewardsRouter.route('/getRewardById/:reward_id').get(AuthController.protect,AuthController.restrictTo('admin',"traveller"),RewardsController.getRewardById);
rewardsRouter.route('/addReward').post(AuthController.protect,AuthController.restrictTo("admin"),RewardsController.addReward);
rewardsRouter.route('/deleteReward/:reward_id').delete(AuthController.protect,AuthController.restrictTo("admin"),RewardsController.deleteReward);
rewardsRouter.route('/updateReward/:reward_id').patch(AuthController.protect,AuthController.restrictTo("admin"),RewardsController.updateReward);
rewardsRouter.route('/RedeemReward/:reward_id').post(AuthController.protect,AuthController.restrictTo("traveller"),RewardsController.RedeemReward);
rewardsRouter.route('/getRewardIcanGet').get(AuthController.protect,AuthController.restrictTo('traveller'),RewardsController.getRewardThatiCanGet);
rewardsRouter.route('/myRewards').get(AuthController.protect,AuthController.restrictTo('traveller'),RewardsController.getmyRewards);
rewardsRouter.route('/deleteFromMyRewards/:reward_id').delete(AuthController.protect,AuthController.restrictTo('traveller'),RewardsController.deleteFromMyrewards);




module.exports = rewardsRouter;