const express = require("express");
const route = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/User");
route.get("/", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ logoutSuccess: false, err });
    return res.status(200).json({ logoutSuccess: true, user: user });
  });
});
module.exports = route;
