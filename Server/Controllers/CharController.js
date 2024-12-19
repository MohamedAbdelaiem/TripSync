const path=require('path');
const client = require('../db');

const roomMessages = {};

exports.handleSocketConnection = (socket,io) => {
    console.log('A user connected');
    let receiverId = null;
    let senderId = null;
    socket.on('initialize', (data) => {
        receiverId = data.receiver_id; // Extract receiver ID from client data
        senderId = data.sender_id; // Extract sender ID from client data
        console.log(`Initialized connection with sender ID: ${senderId}, receiver ID: ${receiverId}`);
    });

    //when a user wants to join a room
    socket.on('joinRoom', async(room) => {

        if(!receiverId||!senderId){
            console.error('Sender ID or Receiver ID not found');
            return;
        }

        if(!roomMessages[room]){
            roomMessages[room] = [];
        }
        try{
            const query = `
                SELECT SENDER_ID, RECEIVER_ID, CONTENT, MESSAGE_DATE, MESSAGE_TIME
                FROM Messages
                WHERE (SENDER_ID = $1 OR RECEIVER_ID = $1)
                ORDER BY DATE, TIME;
            `;
        const result=await client.query(query,[senderId]);
        roomMessages[room]=result.rows;
        }
        catch(err)
        {
            console.error('ERROR in getting messages:',err);
        }
        socket.join(room);
        io.to(room).emit('roomMessages', roomMessages[room]);
        console.log('User joined room:', room);
        socket.emit('messageFromServer', { msg: 'You joined room ' + room });
    });


    //when a user sends a message
    socket.on('sendMessage', async(room, message) => {
        if(!receiverId||!senderId){
            console.error('Sender ID or Receiver ID not found');
            return;
        }

        if(!roomMessages[room]){
            roomMessages[room] = [];
        }

        const newMessage = {
            sender_id: senderId,
            receiver_id: receiverId,
            content: message,
            date: new Date().toISOString().split('T')[0],
        };

        try{
            const query = `
                INSERT INTO Messages (SENDER_ID, RECEIVER_ID, CONTENT, MESSAGE_DATE, MESSAGE_TIME)
                VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_TIME);
            `;
            roomMessages[room].push(newMessage);
        }
        catch(err){
            console.error('ERROR in inserting message in the data base:',err);
        }
        //send the message to the room
        io.to(room).emit('roomMessages', roomMessages[room]);
    });

    //when a user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    }
    );
}

exports.getMessagesByid = async(req, res) => {
    const id=req.user.user_id;
    try{
        const query = `
            SELECT 
    m.SENDER_ID AS sender_id,
    sender.ProfileName AS sender_name,
    sender.ProfilePhoto AS sender_photo,
    m.RECEIVER_ID AS receiver_id,
    receiver.ProfileName AS receiver_name,
    receiver.ProfilePhoto AS receiver_photo,
    m.CONTENT AS content,
    m.MESSAGE_DATE AS date,
    m.MESSAGE_TIME AS time
FROM 
    Messages m
JOIN 
    Users sender ON m.SENDER_ID = sender.USER_ID
JOIN 
    Users receiver ON m.RECEIVER_ID = receiver.USER_ID
WHERE 
    (m.SENDER_ID = $1 OR m.RECEIVER_ID = $1)
ORDER BY 
    m.MESSAGE_DATE , m.MESSAGE_TIME ;
        `;
        const messages = await client.query(query, [id]);
        res.json({
            status: 'success',
            data: {
                messages: messages.rows,
            },
        });
    }
    catch(err){
        console.error('ERROR in getting messages:',err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

exports.sendMessage = async(req, res) => {
    const { sender_id, receiver_id, content } = req.body;
    try{
        const query = `
            INSERT INTO Messages (SENDER_ID, RECEIVER_ID, CONTENT, MESSAGE_DATE, MESSAGE_TIME)
            VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_TIME);
        `;
        await client.query(query, [sender_id, receiver_id, content]);
        res.json({
            status: 'success',
            message: 'Message sent successfully',
        });
    }
    catch(err){
        console.error('ERROR in inserting message in the data base:',err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};











