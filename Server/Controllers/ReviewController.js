const client = require('../db');


exports.getAllReviewsOfTravelAgency = async (req, res) => {
    try{
        const travelAgency_id = req.params.user_id;

        if(isNaN(travelAgency_id)){
            return res.status(400).json({
                status: "failed",
                message: "Travel agency ID should be a number"
            });
        }
        const travelAgency = await client.query('SELECT * FROM TravelAgency WHERE TravelAgency_ID = $1', [travelAgency_id]);
        if(travelAgency.rows.length === 0){
            return res.status(404).json({
                status: "failed",
                message: "This travel agency does not exist"
            });
        }
        const reviews = await client.query(`SELECT 
            r.REVIEW,
            r.RATE,
            r.DATE,
            r.TRAVELLER_ID,
            r.TRAVEL_AGENCY_ID,
            u.ProfileName,
            u.ProfilePhoto
        FROM 
            Review r
        JOIN 
            Users u
        ON 
            r.TRAVELLER_ID = u.USER_ID
        WHERE 
            r.TRAVEL_AGENCY_ID = $1;
        `, [travelAgency_id]);
        res.status(200).json({
            status: "success",
            data: reviews.rows
        });

    }
    catch(err){
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error"
        });
        console.log(err);
    }
}

exports.makeReview = async (req, res) => {
    try{
        const traveler_id= req.user.user_id;   
        const travelAgency_id=req.params.user_id;
        const { rating, review } = req.body;

        if(!rating || !review){
            return res.status(400).json({
                status: "failed",
                message: "Please provide both rating and review"
            });
        }
        if(rating<1 || rating>5){
            return res.status(400).json({
                status: "failed",
                message: "Rating should be between 1 and 5"
            });
        }
        if(isNaN(rating)){
            return res.status(400).json({
                status: "failed",
                message: "Rating should be a number"
            });
        }
        if(isNaN(travelAgency_id)){
            return res.status(400).json({
                status: "failed",
                message: "Travel agency ID should be a number"
            });
        }
        if(isNaN(traveler_id)){
            return res.status(400).json({
                status: "failed",
                message: "Traveler ID should be a number"
            });
        }
        await client.query('BEGIN');
        await client.query('INSERT INTO Review (TRAVEL_AGENCY_ID, TRAVELLER_ID, RATE, REVIEW,DATE) VALUES ($1, $2, $3, $4,CURRENT_DATE)', [travelAgency_id, traveler_id, rating, review]);
        const newRate = await client.query('SELECT AVG(rate) FROM Review WHERE TRAVEL_AGENCY_ID=$1', [travelAgency_id]);
        await client.query('UPDATE TravelAgency SET Rate=$1 WHERE TravelAgency_ID=$2', [newRate.rows[0].avg, travelAgency_id]);
        const newReview=await client.query('SELECT * FROM Review WHERE TRAVEL_AGENCY_ID=$1 AND TRAVELLER_ID=$2 AND RATE=$3 AND REVIEW=$4', [travelAgency_id, traveler_id, rating, review]);
        await client.query('COMMIT');
        res.status(201).json({
            status: "success",
            message: "Review added successfully",
            data: newReview.rows[0]
        });
    }
    catch(err){
        await client.query('ROLLBACK');
        if(err.code === '23505'){
            return res.status(400).json({
                status: "failed",
                message: "You have already reviewed this travel agency"
            });
        }
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error"
        });
        console.log(err);
    }
}

// Handles the deletion will be in front end
/*
    1-make component review List
    2-compnent review
    3-state for deletion button
    4-handle view of deletion button (traveller_id === current_user_id)
*/

exports.deleteReview = async (req, res) => {
    try{
        const traveller_id = req.body.traveller_id;
        const travelAgency_id = req.params.user_id;
        await client.query('BEGIN');
        await client.query('DELETE FROM Review WHERE TRAVEL_AGENCY_ID=$1 AND TRAVELLER_ID=$2',[travelAgency_id, traveller_id]);
        const newRate = await client.query('SELECT AVG(rate) FROM Review WHERE TRAVEL_AGENCY_ID=$1', [travelAgency_id]);
        if(newRate.rows[0].avg === null){
            await client.query('UPDATE TravelAgency SET Rate=0 WHERE TravelAgency_ID=$1', [travelAgency_id]);
            await client.query('COMMIT');
            return res.status(200).json({
                status: "success",
                message: "Review deleted successfully"
            });
        }
        await client.query('UPDATE TravelAgency SET Rate=$1 WHERE TravelAgency_ID=$2', [newRate.rows[0].avg, travelAgency_id]);
        await client.query('COMMIT');
        res.status(200).json({
            status: "success",
            message: "Review deleted successfully"
        });
    }
    catch(err){
        await client.query('ROLLBACK');
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error"
        });
        console.log(err);
    }
}

