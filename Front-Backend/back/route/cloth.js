const express = require("express");
const route = express.Router();
const { Cloth } = require("../models/User");

// 옷 update
route.get("/update", (req, res) => {
  const cloth = new Cloth(req.body);
  cloth.save((err, userinfo) => {
    console.log(err);
    if (err) return res.json({ registerSuccess: false, message: err });
    console.log(req.query.name);
    return res.status(200).json({ registerSuccess: true });
  });
});

// 모든파일 불러오는 부분 찾아봐야함.
route.get("/", (req, res) => {
  let info = [];
  Cloth.find((err, cloth) => {
    console.log(cloth);
    res.json(cloth);
  });
});

// 게별 상품을 보여주는 창
route.get(`/brand=:brand&product_no=:product_no`, (req, res) => {
  Cloth.findOne(
    {
      product_no: Number(req.params.product_no),
      brand: String(req.params.brand),
    },
    (err, userinfo) => {
      if (err || !userinfo)
        return res.json({
          success: false,
          message: "해당하는 상품이 없습니다.",
        });
      res.status(300).json(userinfo);
    }
  );
});

module.exports = route;
