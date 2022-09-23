import React from "react";
import { useNavigate } from "react-router-dom";
function Page404() {
  alert("Bad requrest.");
  return (
    <>
      <h1>404 Not Found...</h1>
      <a href='/'>Back to HomePage.</a>
    </>
  );
}

export default Page404;
