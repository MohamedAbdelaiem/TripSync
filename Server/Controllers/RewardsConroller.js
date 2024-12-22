
const client = require('../db');

exports.getAllRewards = async (req, res) => {
    try {
        const rewards = await client.query('SELECT * FROM rewards');
        if (rewards.rowCount == 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'No rewards found in this time Please try again later'
            });
        }
        res.status(200).json(rewards.rows);
    } catch (e) {
        res.status(400).send('Error in fetching data');
        console.log(e);
    }
};

exports.getRewardById = async (req, res) => {
    try {
        const reward_id = req.params.reward_id;
        const reward = await client.query('SELECT * FROM rewards WHERE reward_id=$1', [reward_id]);
        if (reward.rowCount == 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'There is no reward with this id'
            });
        }

        if(req.user.role === 'traveller'){
            delete reward.rows[0].admin_id;
            return res.status(200).json(reward.rows);
        }
        else
            res.status(200).json(reward.rows);
    } catch (e) {
        res.status(400).send('Error in fetching data');
        console.log(e);
    }
};

exports.addReward = async (req, res) => {
    try {

        const {reward_description, reward_points,photo,reward_type,promotion_percentage } = req.body;
        if (!reward_description && !reward_points &&!reward_type) 
        {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide all requierd data'
            });
        }
        if(reward_points < 0){
            return res.status(400).json({
                status: 'failed',
                message: 'Points should be positive'
            });
        }
        const reward = await client.query('INSERT INTO rewards(Description,PointsNeeded,ADMIN_ID,PHOTO,Type,PromotionPercentage) VALUES($1,$2,$3,$4,$5,$6) RETURNING *', [ reward_description, reward_points,req.user.user_id,photo,reward_type,promotion_percentage]);
        res.status(200).json({
            status: 'success',
            message: 'Reward added successfully',
            data: reward.rows
        });
    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message:e
        });
        console.log(e);
    }
};

exports.deleteReward = async (req, res) => {
    try {
        const reward_id = req.params.reward_id;
        const reward = await client.query('DELETE FROM Rewards WHERE REWARD_ID=$1', [reward_id]);
        if (reward.rowCount == 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'Reward not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Reward deleted successfully'
        });
    } catch (e) {
        res.status(400).send('Error in deleting data Please try again later');
        console.log(e);
    }
};

exports.updateReward = async (req, res) => {
    try {
        await client.query('BEGIN');
        const {reward_description, reward_points,reward_photo,reward_type,promotion_percentage } = req.body;
        const reward_id = req.params.reward_id;
        if (!reward_description && !reward_points&& !reward_photo&& !reward_type) {

            return res.status(400).json({
                status: 'failed',
                message: 'Please provide any data to update'
            });
        }
        if(reward_points < 0){
            return res.status(400).json({
                status: 'failed',
                message: 'Points should be positive'
            });
        }
        const reward = await client.query('SELECT * FROM rewards WHERE reward_id=$1', [reward_id]);
        if(reward.rows.length === 0){
            await client.query('ROLLBACK');
            return res.status(400).json({
                status: 'failed',
                message: 'Reward not found'
            });
        }

        if(reward_description){
            await client.query('UPDATE rewards SET Description=$1 WHERE reward_id=$2', [reward_description, reward_id]);
        }
        if(reward_points){
            await client.query('UPDATE rewards SET PointsNeeded=$1 WHERE reward_id=$2', [reward_points, reward_id]);
        }
        if(reward_photo){
            await client.query('UPDATE rewards SET PHOTO=$1 WHERE reward_id=$2', [reward_photo, reward_id]);
        }
        if(reward_type){
            await client.query('UPDATE rewards SET Type=$1 WHERE reward_id=$2', [reward_type, reward_id]);
        }
        if(promotion_percentage){
            await client.query('UPDATE rewards SET PromotionPercentage=$1 WHERE reward_id=$2', [promotion_percentage, reward_id]);
        }


        const newReward = await client.query('SELECT * FROM rewards WHERE reward_id=$1', [reward_id]);
        await client.query('COMMIT');

        res.status(200).json({
            status: 'success',
            message: 'Reward updated successfully',
            data: newReward.rows
        });

    }
    catch (e) {
        await client.query('ROLLBACK');
        res.status(400).send('Error in updating data');
        console.log(e);
    }
}

exports.RedeemReward = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const reward_id = req.params.reward_id;

        if(!reward_id){
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide reward id'
            });
        }

        if(isNaN(reward_id)){
            return res.status(400).json({
                status: 'failed',
                message: 'Reward id should be a number'
            });
        }

        if(isNaN(user_id)){
            return res.status(400).json({
                status: 'failed',
                message: 'User id should be a number'
            });
        }
        const reward = await client.query('SELECT * FROM rewards WHERE reward_id=$1', [reward_id]);
        if(reward.rows.length === 0){
            return res.status(400).json({
                status: 'failed',
                message: 'Reward not found'
            });
        }
        const reward_points = reward.rows[0].pointsneeded;

        const user = await client.query('SELECT * FROM traveller WHERE traveller_id=$1', [user_id]);
        //checking if user exists
        if(user.rows.length == 0){

            return res.status(400).json({
                status: 'failed',
                message: 'User not found'
            });
        }
        const user_points = user.rows[0].points;

        if(user_points < reward_points){
            return res.status(400).json({
                status: 'failed',
                message: 'Not enough points'
            });
        }


        const new_user_points = Number (user_points - reward_points);
        await client.query('BEGIN');
        await client.query('UPDATE Traveller SET Points=$1 WHERE TRAVELLER_ID=$2', [new_user_points, user_id]);
        await client.query('INSERT INTO GetReward(TRAVELLER_ID,REWARD_ID) VALUES($1,$2)', [user_id, reward_id]);
        await client.query('COMMIT');


        res.status(200).json({
            status: 'success',
            message: 'Reward redeemed successfully'
        });
    }
    catch (e) {
        await client.query('ROLLBACK');
        console.log(e);

        // const user = await client.query('SELECT * FROM traveller WHERE traveller_id=$1', [req.user.user_id]);
        // const reward = await client.query('SELECT * FROM rewards WHERE reward_id=$1', [req.params.reward_id]);
        //  const reward_points = reward.rows[0].PointsNeeded;
        //  const user_points = user.rows[0].Points;
        //  const new_user_points = user_points - reward_points;
        res.status(500).json({
            status: 'failed',
            message: 'Error in redeeming reward please try again later',
            // user: user.rows,
            // reward,
            // new_points:{
            //     old_points: user_points,
            //     new_points: new_user_points,
            //     reward_points
            // }

        })
    }
}


exports.getmyRewards = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const rewards = await client.query('SELECT * FROM rewards WHERE reward_id IN (SELECT reward_id FROM getreward WHERE traveller_id=$1)', [user_id]);
        res.status(200).json(rewards.rows);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 'failed',
            message: 'Error in fetching data'
        });
    }
}

exports.getRewardThatiCanGet=async(req,res)=>{
    try{
        const user_id=req.user.user_id;
        const rewards=await client.query(`SELECT * 
                FROM rewards 
                WHERE reward_id NOT IN (
                    SELECT reward_id
                    FROM GetReward
                    WHERE TRAVELLER_ID = $1
					);`
                ,[user_id]);
        res.status(200).json(rewards.rows);

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            status:'failed',
            message:'Error in fetching data'
        });
    }
}

exports.deleteFromMyrewards=async(req,res)=>{
    try{
        const user_id=req.user.user_id;
        const reward_id=req.params.reward_id;
        if(!reward_id){
            return res.status(400).json({
                status:'failed',
                message:'Please provide reward id'
            });
        }

        const result = await client.query('DELETE FROM GetReward WHERE REWARD_ID=$1 AND TRAVELLER_ID=$2',[reward_id,user_id]);
        res.status(200).json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:'failed',
            message:err
        });
    }
}
        

