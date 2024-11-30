const client = require('../db');

exports.getAllQAOfTravelAgency = async (req, res) => {
    try {
        const travelAgency_id = req.user.user_id;
        const QA = await client.query('SELECT * FROM QA WHERE TRAVEL_AGENCY_ID=$1', [travelAgency_id]);
        res.status(200).json(QA.rows);
    }
    catch (e) {
        res.status(400).send('Error in fetching data');
        console.log(e);
    }
}

exports.addQA = async (req, res) => {
    try {
        const travelAgency_id=req.user.user_id;
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide question and answer'
            });
        }
        const newQA = await client.query('INSERT INTO QA(Question,answer,TRAVEL_AGENCY_ID,DATE,TIME) VALUES($1,$2,$3,CURRENT_DATE,CURRENT_TIME) RETURNING *', [question, answer,travelAgency_id]);
        res.status(201).json({
            status: 'success',
            message: 'QA added successfully',
            data: newQA.rows
        });
    }
    catch (e) {
        res.status(400).send('Error in adding data');
        console.log(e);
    }
}

exports.deleteQA = async (req, res) => {
    try {
        const QA_id = req.params.QA_id;
        if(isNaN(QA_id)){
            return res.status(400).json({
                status:'failed',
                message:'Please provide a valid QA id'
            });
        }
        const user_id = req.user.user_id;
        const QA = await client.query('SELECT * FROM QA WHERE QUESTION_ID=$1', [QA_id]);
        if (QA.rowCount == 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'QA not found'
            });
        }
        if (QA.rows[0].travel_agency_id != user_id) {
            if(req.user.role != 'admin')
        {
            return res.status(401).json({
                status: 'failed',
                message: 'You are not allowed to delete this QA'
            });
        }
    }
        await client.query('DELETE FROM QA WHERE QUESTION_ID=$1', [QA_id]);
        return res.status(200).json({
            status: 'success',
            message: 'QA deleted successfully'
        });
    }
    catch (e) {
        res.status(400).send('Error in deleting data');
        console.log(e);
    }
}

exports.updateQA=async(req,res)=>{
    try{
        const QA_id=req.params.QA_id;
        if(isNaN(QA_id)){
            return res.status(400).json({
                status:'failed',
                message:'Please provide a valid QA id'
            });
        }
        const user_id=req.user.user_id;
        const {question,answer}=req.body;
        if(!question && !answer){
            return res.status(400).json({
                status:'failed',
                message:'Please provide question or answer to update'
            });
        }
        const QA=await client.query('SELECT * FROM QA WHERE QUESTION_ID=$1',[QA_id]);
        if(QA.rowCount==0){
            return res.status(404).json({
                status:'failed',
                message:'QA not found'
            });
        }
        if(QA.rows[0].travel_agency_id!=user_id){
                return res.status(401).json({
                    status:'failed',
                    message:'You are not allowed to update this QA'
                });
            }
        if(question){
            await client.query('UPDATE QA SET question=$1 WHERE QUESTION_ID=$2',[question,QA_id]);
        }
        if(answer){
            await client.query('UPDATE QA SET answer=$1 WHERE QUESTION_ID=$2',[answer,QA_id]);
        }
        const newQA=await client.query('SELECT * FROM QA WHERE QUESTION_ID=$1',[QA_id]);

        res.status(200).json({
            status:'success',
            message:'QA updated successfully',
            data:newQA.rows
        });
    }
    catch(e){
        res.status(400).send('Error in updating data');
        console.log(e);
    }
}


        




