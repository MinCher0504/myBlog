const express = require("express");
const app = express();
const login = require("./route/login");
const register = require("./route/register");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/dev");
const auth = require("./route/auth");
const logout = require("./route/logout");
const cloth = require("./route/cloth");
const { Cloth } = require("./models/User");

mongoose
  .connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// 쿠키를 이용하려면 사용.
app.use(cookieParser());

app.use("/api/users/login", login);
app.use("/api/users/register", register);
app.use("/api/users/auth", auth);
app.use("/api/users/logout", logout);
app.use("/api/users/cloth", cloth);
// app.post("api/users/cloth/update", (req,res)=>{
//   const cloth =
// })
const port = 5000;
app.listen(port, () => console.log(`listening port number ${port}`));
