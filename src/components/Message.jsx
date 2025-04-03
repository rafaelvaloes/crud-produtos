import React from "react";

function Message({ message }) {
  return message && <p>{message}</p>;
}

export default Message;
