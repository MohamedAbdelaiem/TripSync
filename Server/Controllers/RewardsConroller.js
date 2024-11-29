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
        res.status(200).json(reward.rows);
    } catch (e) {
        res.status(400).send('Error in fetching data');
        console.log(e);
    }
};

exports.addReward = async (req, res) => {
    try {
        const { reward_title, reward_description, reward_points } = req.body;
        if (!reward_title && !reward_description && !reward_points) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide all requierd data'
            });
        }
        const reward = await client.query('INSERT INTO rewards(Description,PointsNeeded,ADMINID) VALUES($1,$2,$3) RETURNING *', [ reward_description, reward_points,req.user.user_id]);
        res.status(200).json({
            status: 'success',
            message: 'Reward added successfully',
            data: reward.rows
        });
    } catch (e) {
        res.status(400).send('Error in adding data');
        console.log(e);
    }
};

exports.deleteReward = async (req, res) => {
    try {
        const reward_id = req.params.reward_id;
        const reward = await client.query('DELETE FROM rewards WHERE reward_id=$1', [reward_id]);
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
        res.status(400).send('Error in deleting data');
        console.log(e);
    }
};

exports.updateReward = async (req, res) => {
    try {
        const {reward_description, reward_points } = req.body;
        const reward_id = req.params.reward_id;
        if (!reward_description && !reward_points) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide any data to update'
            });
        }
        if(reward_description){
            await client.query('UPDATE rewards SET Description=$1 WHERE reward_id=$2', [reward_description, reward_id]);
        }
        if(reward_points){
            await client.query('UPDATE rewards SET PointsNeeded=$1 WHERE reward_id=$2', [reward_points, reward_id]);
        }

        const newReward = await client.query('SELECT * FROM rewards WHERE reward_id=$1', [reward_id]);

        res.status(200).json({
            status: 'success',
            message: 'Reward updated successfully',
            data: newReward.rows
        });

    }
    catch (e) {
        res.status(400).send('Error in updating data');
        console.log(e);
    }
}

exports.RedeemReward = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const reward_id = req.params.reward_id;
        const reward = await client.query('SELECT * FROM rewards WHERE reward_id=$1', [reward_id]);
        if(reward.rows.length === 0){
            return res.status(400).json({
                status: 'failed',
                message: 'Reward not found'
            });
        }
        const reward_points = reward.rows[0].PointsNeeded;
        const user = await client.query('SELECT * FROM Traveller WHERE Traveller_id=$1', [user_id]);
        if(user.rows.length === 0){
            return res.status(400).json({
                status: 'failed',
                message: 'User not found'
            });
        }
        const user_points = user.rows[0].Points;
        if(user_points < reward_points){
            return res.status(400).json({
                status: 'failed',
                message: 'Not enough points'
            });
        }
        const new_user_points = user_points - reward_points;
        await client.query('UPDATE users SET Points=$1 WHERE user_id=$2', [new_user_points, user_id]);

        res.status(200).json({
            status: 'success',
            message: 'Reward redeemed successfully'
        });
    }
    catch (e) {
        res.status(400).send('Error in redeeming reward');
        console.log(e);
    }
}

