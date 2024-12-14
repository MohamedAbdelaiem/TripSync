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
                SELECT SENDER_ID, RECEIVER_ID, CONTENT, DATE, TIME
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
                INSERT INTO Messages (SENDER_ID, RECEIVER_ID, CONTENT, DATE, TIME)
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





