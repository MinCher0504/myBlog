const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.post("/", (req, res) => {
  //데이터베이스에서 이메일을 찾는다.

  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        success: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //이메일이 존재한다면 비밀번호가 같은지 확인.
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch || err)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      //비밀번호까지 맞다면 토큰을 생성한다.
      userInfo.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 쿠키에 토큰을 저장한다.
        res
          .cookie("cookie_token", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// router.post("/", async (req, res) => {
//   const info = req.body;
//   const user = await data.find((data) => data.ID === info.ID);
//   console.log(info);
//   console.log(user);

//   // bcrypt compare 할 때 콜백으로 처리해야 오류가 생기지 않는다. 콜백으로 처리하자.
//   if (!user) {
//     console.log("아이디를 찾을 수 없습니다.");
//     res.redirect("/api/login");
//   } else {
//     bcrypt.compare(info.PASSWORD, user.PASSWORD, function (err, result) {
//       if (result) {
//         console.log("로그인 성공");
//         res.redirect(`/home/${info.ID}`);
//       } else {
//         console.log("비밀번호를 찾을 수 없습니다.");
//         res.redirect("/api/login");
//       }
//     });
//   }
// });
module.exports = router;
