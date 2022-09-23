let { User } = require("../models/User");
let auth = (req, res, next) => {
  // 인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.cookie_token;
  // 토큰을 복호화해서 유저 아이디를 찾는다.
  User.findByToken(token, function (err, userInfo) {
    if (err) throw err;
    if (!userInfo) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = userInfo;
    next();
  });
  // 유저 아이디가 있으면 인증 okay
};

module.exports = auth;
