import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../_actions/user_action";
import { useNavigate } from "react-router-dom";
export default function (SpecificComponent, option, adminRoute = null) {
  // option
  // 1. null => 아무나 출입 가능한 페이지
  // 2. true => 로그인한 유저만 출입 가능한 페이지
  // 3. false => 로그인한 유저는 출입 불가능한 페이지

  // adminRoute
  // 1. true => 어드민만 접근 가능
  // 2. null => 아무나 접근 가능

  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
            alert("로그인 후 이용해주시기 바랍니다.");
          }
        } else {
          //로그인한 상태
          if (!option) {
            navigate("/");
          } // 관리자 페이지에 접근할 떄
          else if (adminRoute && !response.payload.isAdimn) {
            navigate("/");
            alert("관리자만 접근 가능한 페이지입니다.");
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
