import React from "react";
import "./UserMessages.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const UserMessages = ({
  isOpen,
  onClose,
  profileId,
  isOwner,
  currentUser,
}) => {
  if (!isOpen) return null;
  let current_user_is_owner = isOwner;

  const [newMessage, setNewMessage] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const [allChats, setAllCahts] = useState([]);
  const messUlRef = useRef(null);

  const sendMessage=async()=>
  {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/v1/chats/sendMessage`,
        { 
          sender_id: currentUser.user_id,
          receiver_id: (!current_user_is_owner && currentUser !== null)
          ? profileId
          : selectedChat.senderId,
          content: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
  }
  catch (error) {
    console.log(error);
  }
}

const reRender = () => {
  get_user_messages();
};

  

  useEffect(() => {
    get_user_messages(); // Fetch messages
  }, [profileId]);

  useEffect(() => {
    if (userMessages.length > 0) {
      console.log(1);
      const chatNames = [];
      const chats = [];
      let id = 1;
      for (let i = 0; i < userMessages.length; i++) {
        let message_sender = userMessages[i].sender_name;
        let message_receiver = userMessages[i].receiver_name;
        if (
          !chatNames.includes(message_receiver) &&
          !chatNames.includes(message_sender)
        ) {
          let message_receiver_id = userMessages[i].receiver_id;
          let message_sender_id = userMessages[i].sender_id;
          if (profileId == message_sender_id) {
            let obj = {
              senderName: message_receiver,
              senderId: message_receiver_id,
              senderPhoto: userMessages[i].receiver_photo,
              chatId: id,
            };
            chatNames.push(message_receiver);
            chats.push(obj);
            id += 1;
          } else if (profileId == message_receiver_id) {
            let obj = {
              senderName: message_sender,
              senderId: message_sender_id,
              senderPhoto: userMessages[i].sender_photo,
              chatId: id,
            };
            chatNames.push(message_sender);
            chats.push(obj);
            id += 1;
          }
        }
      }
      setAllCahts(chats);
      // scrollToLastElement();
    }
  }, [userMessages]);

  const closeChats = () => {
    onClose();
  };

  const get_user_messages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/chats/myChats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data.data.messages);
      setUserMessages(response.data.data.messages);
    } catch (error) {
      console.log(error);
    }
  };


  // send message to another user
  if (!current_user_is_owner && currentUser !== null) {
    const handleSendMessage = (e) => {
      e.preventDefault();
      if (newMessage.trim()) {
        //   setMessages([...messages, { sender: "You", content: newMessage }]);
        const currentDate = new Date();
        // form new message
        const message = {
          id: null,
          sender_id: currentUser.user_id,
          receiver_id: profileId,
          content: newMessage,
          date: currentDate.toDateString(),
          time: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
        };
        setNewMessage("");
        console.log(message);
        sendMessage();
        closeChats();
      }
    };

    return (
      <>
        <div className="modal-overlay">
          <button className="send-close-button" onClick={closeChats}>
            ✖
          </button>
          <div className="send-userMessages-container">
            <div className="send-chat-container">
              <form className="send-message-form" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else if (currentUser === null) {
    alert("please sign in first to send message");
    return null;
  }
  //-----------------------------------------

  const scrollToLastElement = () => {
    const ulElement = messUlRef.current;
    if (ulElement) {
      const lastChild = ulElement.lastElementChild; // Get the last child of the <ul>
      if (lastChild) {
        lastChild.scrollIntoView(); // Scroll to the last child
      }
    }
  };
  

  const handleChatClick = (chatId) => {
    const chat = allChats.filter((chat) => chat.chatId == chatId)[0];
    setSelectedChat(chat);
    const messages = userMessages.filter(
      (message) =>
        message.sender_id == chat.senderId ||
        message.receiver_id == chat.senderId
    );
    setSelectedChatMessages(messages);
  };

    const handleSendMessage = (e) => {
        e.preventDefault();
      if (newMessage.trim()) {
        //   setMessages([...messages, { sender: "You", content: newMessage }]);
        const currentDate = new Date();
        // form new message
        const message = {
          id: null,
          sender_id: currentUser.user_id,
          receiver_id: selectedChat.senderId,
          content: newMessage,
          date: currentDate.toLocaleDateString(),
          // time: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
          time: currentDate.toLocaleTimeString().slice(0,8),
        };
        setNewMessage("");
        sendMessage();
        get_user_messages();
        handleChatClick(selectedChat.chatId);
        console.log(message);
      }
    };

  return (
    <div className="modal-overlay">
      <button className="close-button" onClick={closeChats}>
        ✖
      </button>
      <div className="userMessages-container">
        <div className="all-chats">
          <h1 className="all-chats-header">All chats</h1>
          <div className="chats">
            <ul className="chats-list">
              {allChats.length > 0 &&
                allChats.map((chat,idx) => (
                  <li
                    className="chat-item"
                    key={idx}
                    onClick={() => {
                      handleChatClick(chat.chatId);
                    }}
                  >
                    <img
                      className="sender-photo"
                      src={chat.senderPhoto}
                      alt={chat.senderName}
                    ></img>
                    <div className="sender-name">{chat.senderName}</div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {selectedChat !== null && (
          <div className="chat-container">
            <div className="chat-header">
              <img
                className="chat-header-photo"
                src={selectedChat.senderPhoto}
                alt={selectedChat.senderName}
              ></img>
              <h2 className="chat-header-name">{selectedChat.senderName}</h2>
            </div>
            <div className="chat-content">
              <ul className="message-list" ref={messUlRef}>
                {selectedChatMessages.length > 0 &&
                  selectedChatMessages.map((message,idx) => {
                    const sent = message.sender_id == profileId;
                    return (
                      <div
                        key={idx}
                        className={`message ${
                          sent ? "sent-message" : "received-message"
                        }`}
                      >
                        {" "}
                        {message.content}{" "}
                      </div>
                    );
                  })}
              </ul>
            </div>
            <form className="message-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMessages;
