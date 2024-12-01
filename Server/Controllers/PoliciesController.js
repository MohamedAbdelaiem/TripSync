const client= require('../db');

exports.getAllPolicies=async(req,res)=>{
    try{
        const policies=await client.query('SELECT * FROM policies');
        res.status(200).json(policies.rows);
    }
    catch(e){
        res.status(400).send('Error in fetching data');
        console.log(e);
    }
}

exports.getPolicyById=async(req,res)=>{
    try{
        const policy_id=req.params.policy_id;
        const policy=await client.query('SELECT * FROM policies WHERE policy_id=$1',[policy_id]);
        res.status(200).json(policy.rows);
    }
    catch(e){
        res.status(400).send('Error in fetching data');
        console.log(e);
    }
}

exports.createPolicy=async(req,res)=>{
    try{
        const {policy_title,description}=req.body;
        if(!policy_title || !description){
            return res.status(400).json({
                status:'failed',
                message:'Please provide policy title and description'
            });
        }
        const newPolicy=await client.query('INSERT INTO policies(Title,description,ADMIN_ID) VALUES($1,$2,$3) RETURNING *',[policy_title,description,req.user.user_id]);
        res.status(201).json(newPolicy.rows);
    }
    catch(e){
        console.log(e);
       res.status(400).json({
              status:'failed',
              message:'Error in creating policy'
         });
       }
}

exports.deletePolicy=async(req,res)=>{
    try{
        const policy_id=req.params.policy_id;
        const policy=await client.query('DELETE FROM policies WHERE policy_id=$1',[policy_id]);
        if(policy.rowCount==0){
            return res.status(404).json({
                status:'failed',
                message:'Policy not found'
            });
        }
        res.status(200).json({
            status:'success',
            message:'Policy deleted successfully'
        });

    }
    catch(e){
        res.status(400).send('Error in deleting data');
        console.log(e);
    }
}

exports.updatePolicy=async(req,res)=>{
    try{
        const policy_id=req.params.policy_id;
        const {policy_title,description}=req.body;
        if(!policy_title && !description){
            return res.status(400).json({
                status:'failed',
                message:'Please provide data to update'
            });
        }
        client.query('BEGIN');
        if(policy_title){
            const policy=await client.query('UPDATE policies SET Title=$1 WHERE policy_id=$2 RETURNING *',[policy_title,policy_id]);
            if(policy.rowCount==0){
                return res.status(404).json({
                    status:'failed',
                    message:'Policy not found'
                });
            }
        }
        if(description){
            const policy=await client.query('UPDATE policies SET description=$1 WHERE policy_id=$2 RETURNING *',[description,policy_id]);
            if(policy.rowCount==0){
                return res.status(404).json({
                    status:'failed',
                    message:'Policy not found'
                });
            }
        }
        await client.query('COMMIT');
        return res.status(200).json({
            status:'success',
            message:'Policy updated successfully'
        });
    }
    catch(e){
        client.query('ROLLBACK');
        res.status(400).send('Error in updating data');
        console.log(e);
    }
}

exports.getPolicyByAdmin=async(req,res)=>{
        try{
            const admin_id=req.params.admin_id;
            const policy=await client.query('SELECT * FROM policies WHERE admin_id=$1',[admin_id]);
            if(policy.rowCount==0){
                return res.status(404).json({
                    status:'failed',
                    message:'There are no policies for this admin'
            });
        }
        else
           return  res.status(200).json(policy.rows);
        }
        catch(e){
            res.status(400).send('Error in fetching data');
            console.log(e);
        }
}

