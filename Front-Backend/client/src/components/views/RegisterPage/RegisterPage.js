import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
function Register() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function onEmailHandler(event) {
    setEmail(event.currentTarget.value);
  }

  function onNameHandler(event) {
    setName(event.currentTarget.value);
  }

  function onConfirmPasswordHandler(event) {
    setConfirmPassword(event.currentTarget.value);
  }

  function onPasswordHandler(event) {
    setPassword(event.currentTarget.value);
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    if (Password != confirmPassword)
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    else if (Password.length < 5)
      return alert("비밀번호는 최소 5자리 이상이어야 합니다.");
    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    // loginUser = action
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.registerSuccess) {
        return navigate("/login"); // Landing page로 이동
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

          <label>Name</label>
          <input type='text' value={Name} onChange={onNameHandler}></input>

          <label>Password</label>
          <input
            type='password'
            value={Password}
            onChange={onPasswordHandler}></input>

          <label>confirm Password</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}></input>
          <br />
          <button>Sign up</button>
        </form>
      </div>
    </>
  );
}

export default Register;
