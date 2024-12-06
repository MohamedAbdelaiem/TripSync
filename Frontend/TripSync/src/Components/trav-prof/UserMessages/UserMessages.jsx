import React from "react";
import "./UserMessages.css";
import { useState, useEffect, useRef } from "react";


const UserMessages = ({ isOpen, onClose, allMessages, userID }) => {
  if (!isOpen) return null;

  const [userMessages, setUserMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [allChats, setAllCahts] = useState([]);
  const messUlRef = useRef(null);

  const scrollToLastElement = () => {
    const ulElement = messUlRef.current;
    if (ulElement) {
      const lastChild = ulElement.lastElementChild; // Get the last child of the <ul>
      if (lastChild) {
        lastChild.scrollIntoView(); // Scroll to the last child
      }
    }
  };
  useEffect(() => {

    const messages = allMessages.filter((message) => {
      return message.sender_id == userID || message.receiver_id == userID;
    });

    setUserMessages(messages);

    if (allMessages.length > 0) {
      const chatNames = [];
      const chats = [];
      let id = 1;
      for (let i = 0; i < allMessages.length; i++) {
        let message_sender = allMessages[i].sender_name;
        let message_receiver = allMessages[i].receiver_name;
        if (
          !chatNames.includes(message_receiver) &&
          !chatNames.includes(message_sender)
        ) {
          let message_receiver_id = allMessages[i].receiver_id;
          let message_sender_id = allMessages[i].sender_id;
          if (userID == message_sender_id) {
            let obj = {
              senderName: message_receiver,
              senderId: message_receiver_id,
              senderPhoto: allMessages[i].receiver_photo,
              chatId: id,
            };
            chatNames.push(message_receiver);
            chats.push(obj);
            id += 1;
          } else if (userID == message_receiver_id) {
            let obj = {
              senderName: message_sender,
              senderId: message_sender_id,
              senderPhoto: allMessages[i].sender_photo,
              chatId: id,
            };
            chatNames.push(message_sender);
            chats.push(obj);
            id += 1;
          }
        }
      }

      setAllCahts(chats);
      scrollToLastElement();
    }
  }, [userID, allMessages,selectedChat]);
  

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
      setNewMessage("");
    }
  };

  const closeChats = () => {
    onClose();
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
                allChats.map((chat) => (
                  <li
                    className="chat-item"
                    key={chat.chatId}
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
            <div className="chat-content" >
              <ul className="message-list" ref={messUlRef}>
                {selectedChatMessages.length > 0 &&
                  selectedChatMessages.map((message) => {
                    const sent = message.sender_id == userID;
                    return (
                      <div
                        key={message.id}
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
