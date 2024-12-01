const client = require('../db');


exports.getAllReviewsOfTravelAgency = async (req, res) => {
    try{
        const {travelAgency_id} = req.params;
        const reviews = await client.query('SELECT * FROM reviews WHERE travelAgency_id = $1', [travelAgency_id]);
        if(reviews.rows.length === 0){
            return res.status(404).json({
                status: "failed",
                message: "No reviews found for this travel agency"
            });
        }
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
        const {travelAgency_id}=req.params;
        const {rating, review}=req.body;
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
        await client.query('INSERT INTO reviews (TRAVEL_AGENCY_ID, TRAVELLER_ID, RATE, REVIEW,DATE) VALUES ($1, $2, $3, $4,CURRENT_DATE)', [travelAgency_id, traveler_id, rating, review]);
        const newRate = await client.query('SELECT AVG(rate) FROM reviews WHERE TRAVEL_AGENCY_ID=$1', [travelAgency_id]);
        await client.query('UPDATE travel_agencies SET rate=$1 WHERE travel_agency_id=$2', [newRate.rows[0].avg, travelAgency_id]);
        await client.query('COMMIT');
        res.status(201).json({
            status: "success",
            message: "Review added successfully"
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

exports.deleteReview = async (req, res) => {
    try{
        const {review_id}=req.params;
        if(isNaN(review_id)){
            return res.status(400).json({
                status: "failed",
                message: "Review ID should be a number"
            });
        }
        const review = await client.query('SELECT * FROM reviews WHERE review_id=$1', [review_id]);
        if(review.rows.length === 0){
            return res.status(404).json({
                status: "failed",
                message: "Review not found"
            });
        }
        if(req.user.role !== 'admin' && review.rows[0].traveller_id !== req.user.user_id){
            return res.status(401).json({
                status: "failed",
                message: "You are not allowed to delete this review"
            });
        }
        await client.query('BEGIN');
        await client.query('DELETE FROM reviews WHERE review_id=$1', [review_id]);
        const newRate = await client.query('SELECT AVG(rate) FROM reviews WHERE TRAVEL_AGENCY_ID=$1', [review.rows[0].travel_agency_id]);
        await client.query('UPDATE travel_agencies SET rate=$1 WHERE travel_agency_id=$2', [newRate.rows[0].avg, review.rows[0].travel_agency_id]);
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

