import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Cloth.css";

function Cloth() {
  const [DBdata, setDBdata] = useState([]);
  useEffect(() => {
    axios
      .get("/api/users/cloth")
      .then((res) => {
        var arr = [];
        var structure = {
          name: "",
          description: "",
          cost: "",
          image: "",
          brand: "",
        };
        res.data.forEach((element) => {
          structure.name = element.name;
          structure.description = element.description;
          structure.cost = element.cost;
          structure.image = element.image;
          structure.brand = element.brand;
          arr.push(structure);
          console.log(structure);
        });
        setDBdata(arr);
      })
      .then(console.log(DBdata));
  }, []);

  return <div>{DBdata[0]}</div>;
}

export default Cloth;
