import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cloth.css";

function Cloth() {
  const [a, b] = useState(true);
  let navigate = useNavigate();
  function onClickHandler() {
    navigate("/");
  }

  let x = [];
  var information = (
    <div className='contents'>
      <button onClick={onClickHandler}>돌아가기</button>
      <ul className='display' />
    </div>
  );

  useEffect(() => {
    let info = document.getElementsByClassName("display")[0];
    if (a) {
      axios.get("/api/users/cloth").then((res) => {
        res.data.forEach((element) => {
          const image = document.createElement("img");
          image.src = element.image;
          image.style.width = "450px";

          const name = document.createElement("div");
          name.innerText = element.name;

          const brand = document.createElement("div");
          brand.innerText = element.brand;

          const cost = document.createElement("div");
          cost.innerText = element.cost;

          const describe = document.createElement("div");
          describe.innerText = element.describe;

          const name_cost = document.createElement("div");
          name_cost.appendChild(name);
          name_cost.appendChild(cost);
          name_cost.className = "name_cost";

          const display = document.createElement("div");
          display.className = "display_content";
          display.appendChild(image);
          display.appendChild(name_cost);
          display.appendChild(brand);
          display.appendChild(describe);
          info.appendChild(display);
        });
      });
      b(false);
    }
  }, []);

  return <div>{information}</div>;
}

export default Cloth;
