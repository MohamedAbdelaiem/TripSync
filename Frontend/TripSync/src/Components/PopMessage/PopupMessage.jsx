import React from "react";
import "./PopupMessage.css";

const PopupMessage = ({ content, status }) => {
  return (
    <div className="popup-overlay-pr">
      <div className="popup-box-pr">
        {status === "success" ? (
          <span className="success-pr">&#10003;</span>
        ) : (
          <span className="fail-pr">&#10007;</span>
        )}
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PopupMessage;
