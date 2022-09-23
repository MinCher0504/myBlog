import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../../_actions/user_action";

function Navbar() {
  let Navigate = useNavigate();
  async function onClickHandler() {
    axios
      .get("/api/users/logout")
      .then((response) => console.log(response.data))
      .then(Navigate("/login"))
      .catch((e) =>
        alert("로그아웃 하는데 실패했습니다.\n 사유: (Can't decode token.)")
      );
  }

  const [Authentication, setAuthentication] = useState(false);
  async function AuthenticationCheck() {
    const dispatch = useDispatch();
    dispatch(auth()).then((response) => {
      console.log(response);
      if (Authentication == response.payload.isAuth) return;
      setAuthentication(response.payload.isAuth);
    });
  }
  AuthenticationCheck();
  const [logout, setLogout] = useState(
    <span>
      <Link to='/login'>Signin</Link>
      <Link to='/register'>Signup</Link>
    </span>
  );

  useEffect(() => {
    if (Authentication) {
      setLogout(
        <span>
          <button onClick={onClickHandler} className='logoutButton'>
            Logout
          </button>
        </span>
      );
    } else {
      setLogout(
        <span>
          <Link to='/login'>Signin</Link>
          <Link to='/register'>Signup</Link>
        </span>
      );
    }
  }, [Authentication]);

  return (
    <div className='NavbarBox'>
      <h3>Welcome</h3>
      <nav>
        <span>
          {/*  메인 페이지에 날씨와 온도 출력, 명언 한줄. */}
          <Link to='/'>Home</Link>
          <Link to='/?'>포트폴리오</Link>
          <Link to='/Cloth'>Cloth</Link>
        </span>
        {logout}
      </nav>
    </div>
  );
}

export default Navbar;
