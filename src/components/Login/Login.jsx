import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Login = ({ login }) => {
  const [userN, setUserN] = useState("");
  const [userP, setUserP] = useState("");

  return (
    <div className="login-wrap">
      Login
      <div className="login-box">
        {/* <Form.Control
          as="input"
          //   id={"voice"}
          className={"fit-height "}
          rows={1}
          spellCheck="true"
          placeholder={"Name"}
          //   ref={textRef}
          value={userN}
          onChange={(e) => setUserN(e.target.value)}
        />{" "} */}
        <Form.Control
          as="input"
          //   id={"voice"}
          type="password"
          className={"fit-height "}
          rows={1}
          spellCheck="true"
          placeholder={"{Password}"}
          //   ref={textRef}
          value={userP}
          onChange={(e) => setUserP(e.target.value)}
        />
        <button onClick={() => login(userN, userP)}>OK</button>
      </div>
    </div>
  );
};

export default Login;
