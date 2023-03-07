import React from "react";
import Alert from "react-bootstrap/Alert";

// khi cần gọi AlertMessage trong 1 component khác
// cần truyền props là info
// props info là 1 Object  chứa {type, message}
const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <Alert variant={info.type}>{info.message}</Alert>
  );
};

export default AlertMessage;
