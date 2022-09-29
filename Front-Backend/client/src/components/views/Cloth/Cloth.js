import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Cloth.css";

function Cloth() {
  const [DBdata, setDBdata] = useState([]);
  useEffect(() => {
    axios.get("/api/users/cloth").then((res) => {
      var arr = [];
      var structure = {
        name: "",
        description: "",
        cost: "",
        image: "",
        brand: "",
      };
      res.data.forEach((element) => {
        arr.push(element);
        console.log(arr);
      });
    });
  }, []);

  return <div>test</div>;
}

export default Cloth;
