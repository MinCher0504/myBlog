const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 말은 auth가 true라는 소리.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role == 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});
module.exports = router;
