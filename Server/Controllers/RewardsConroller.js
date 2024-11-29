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
        const reward = await client.query('INSERT INTO rewards(reward_title,reward_description,reward_points) VALUES($1,$2,$3) RETURNING *', [reward_title, reward_description, reward_points]);
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