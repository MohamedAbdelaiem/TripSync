import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./Toast.css";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500); // Automatically close after 3.5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <span>
        <FontAwesomeIcon icon={faCheckCircle} />
      </span>
      {message}
    </div>
  );
};

export default Toast;
