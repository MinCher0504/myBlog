const express = require("express");
const route = express.Router();
const { Cloth } = require("../models/User");

// 모든파일 불러오는 부분
route.get("/", (req, res) => {
  let info = [];
  Cloth.find((err, cloth) => {
    console.log(`============ server response : ============ ${cloth} `);
    res.json(cloth);
  });
});

// 옷 추가
route.get("/create", (req, res) => {
  const cloth = new Cloth(req.body);
  cloth.save((err, userinfo) => {
    console.log(err);
    if (err) return res.json({ registerSuccess: false, message: err });
    console.log(req.query.name);
    return res.status(200).json({ registerSuccess: true });
  });
});

// update 기능
route.get(`/update/brand=:brand&product_no=:product_no`, (req, res) => {
  Cloth.findOne(
    {
      product_no: req.params.product_no,
      brand: req.params.brand,
    },
    (err, userinfo) => {
      if (err || !userinfo)
        return res.json({
          success: false,
          message: "해당하는 상품이 없습니다.",
        });
      Object.assign(userinfo, req.body);
      userinfo.save();
      console.log(userinfo);
      res.status(300).json(userinfo);
    }
  );
});
// delete 기능
route.get(`/delete/brand=:brand&product_no=:product_no`, (req, res) => {
  Cloth.findOneAndDelete(
    {
      product_no: req.params.product_no,
      brand: req.params.brand,
    },
    (err, userinfo) => {
      if (err || !userinfo)
        return res.json({
          success: false,
          message: "해당하는 상품이 없습니다.",
        });
      console.log(userinfo);
      res.status(300).json(userinfo);
    }
  );
});

// 게별 상품을 보여주는 창
route.get(`/brand=:brand&product_no=:product_no`, (req, res) => {
  Cloth.findOne(
    {
      product_no: req.params.product_no,
      brand: req.params.brand,
    },
    (err, userinfo) => {
      if (err || !userinfo)
        return res.json({
          success: false,
          message: "해당하는 상품이 없습니다.",
        });
      console.log(userinfo);
      res.status(300).json(userinfo);
    }
  );
});

// 브랜드별 상품을 보여주는 창
// 이 코드가 항상 개별 상품을 보여주는 코드 아래에 위치해야함.
route.get(`/brand=:brand`, (req, res) => {
  Cloth.find(
    {
      brand: req.params.brand,
    },
    (err, userinfo) => {
      if (err || !userinfo)
        return res.json({
          success: false,
          message: "해당하는 상품이 없습니다.",
        });
      console.log(userinfo);
      res.status(300).json(userinfo);
    }
  );
});

module.exports = route;
