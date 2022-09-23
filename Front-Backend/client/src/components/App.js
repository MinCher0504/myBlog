import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Page404 from "./views/Page404/Page404";
import Auth from "./hoc/auth";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import React from "react";

function App() {
  const Landing = Auth(LandingPage, null, true);
  const Login = Auth(LoginPage, false);
  const Register = Auth(RegisterPage, false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          //default page
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
