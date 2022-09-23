const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const { User } = require("../models/User");

// application/x-222-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());
router.post("/", (req, res) => {
  const user = new User(req.body);

  // mongoDB에서 오는 메서드, 정보들이 유저 모델에 저장됨
  user.save((err, userInfo) => {
    if (err == "can't generate salt." || err == "can't generate hash.")
      return res.json({ registerSuccess: false, message: err });
    else if (err)
      return res.json({
        registerSuccess: false,
        message: "중복된 이메일이 존재합니다.",
      });
    return res.status(200).json({ registerSuccess: true });
  });
});

// router.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/register.html");
// });

// router.post("/", async (req, res) => {
//   let info = req.body;

//   let checker = await data.find(
//     (data) => data.ID === info.ID || data.email === info.email
//   );
//   const hashedPassword = await bcrypt.hash(info.PASSWORD, 10);
//   const originalPassword = info.PASSWORD;
//   info.PASSWORD = hashedPassword;
//   console.log(info);

//   if (checker) {
//     if (checker.ID === info.ID) {
//       console.log("아이디가 중복되었습니다.");
//     } else if (checker.email === info.email) {
//       console.log("이미 사용된 이메일입니다.");
//     }
//     res.redirect("/register");
//   } else {
//     try {
//       let newData = data;
//       newData.push(info);

//       fs.writeFile("./data/user.json", JSON.stringify(newData), (err) => {
//         // error checking
//         if (err) throw err;

//         console.log("New data added");
//       });
//       console.log("사용자 정보가 등록되었습니다.");
//       res.redirect(
//         `/api/loginInfo/${info.name}/${info.email}/${info.ID}/${originalPassword}`
//       );
//     } catch (e) {
//       res.redirect("/api/login");
//     }
//   }
// });

module.exports = router;
