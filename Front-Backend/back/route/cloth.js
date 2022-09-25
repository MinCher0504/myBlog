const express = require("express");
const route = express.Router();
const { Cloth } = require("../models/User");

route.get("/", (req, res) => {
  const cloth = new Cloth(req.body);
  cloth.save((err, userinfo) => {
    console.log(err);
    if (err) return res.json({ registerSuccess: false, message: err });
    return res.status(200).json({ registerSuccess: true });
  });
});

module.exports = route;
