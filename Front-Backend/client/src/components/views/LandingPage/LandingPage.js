import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";
import Weather from "./Sections/Weather";
import "./LandingPage.css";

// 날씨를 표현해주는 함수
function LandingPage() {
  Weather();
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          color: "gray",
        }}>
        <FontAwesomeIcon icon={faCode} className='codeIcon' />
        <h2>Let's Start Coding!</h2>
        <div className='메모'>사이트 크롤링해서 옷이랑 살만한것들 정리</div>
        <div className='weatherApp'>
          <div className='주석'>수정 나중에 ㅎㅎ.</div>
          {/* <h3 className='weather'></h3> */}
          <img src='' className='icon' alt='날씨 아이콘'></img>
          <h3 className='description'></h3>
          <h3 className='temp'></h3>
          <h3 className='mintemp_maxtemp'></h3>
        </div>
      </div>
    </>
  );
}
export default LandingPage;
