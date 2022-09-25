import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
// 자꾸 re-rendering되는 문제가있었는데 이는
// index.js에 있는 React.StrictMode때문에 발생한 일이었다.
function LoginPage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  function onEmailHandler(event) {
    setEmail(event.currentTarget.value);
  }

  function onPasswordHandler(event) {
    setPassword(event.currentTarget.value);
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    let body = {
      email: Email,
      password: Password,
    };

    // loginUser = action
    // redux 이용했음
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        return navigate("/"); // Landing page로 이동
      } else {
        alert(response.payload.message);
      }
    });
  }

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}>
        <form
          onSubmit={onSubmitHandler}
          style={{ display: "flex", flexDirection: "column" }}>
          <label>Email</label>
          <input type='email' value={Email} onChange={onEmailHandler}></input>
          <label>Password</label>
          <input
            type='password'
            value={Password}
            onChange={onPasswordHandler}></input>
          <br />
          <button>login</button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
