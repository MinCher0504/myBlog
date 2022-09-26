const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    // trim = 빈 공백을 없애줌.
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const userCloth = mongoose.Schema({
  product_no: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  describe: {
    type: String,
  },
  cost: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
    uppercase: true,
  },
  image: {
    type: String,
    required: false,
    default:
      "https://w.namu.la/s/5a0dfbc22d0e432def0ab164c2f53441794f55e17f00ce84ab021bea2dae11d2c0d93adbfd509f1f4fc1476d32fa854b7b3d0d58ba9d0fbad8b57f2280d6d330f99f651c90d5fdeeed1280fc0b42da076150b7078ec07b5e385dbddb65bd5315",
    maxlength: 500,
  },
});

// save전에 function을 함.
userSchema.pre("save", function (next) {
  let user = this;

  //비밀번호를 변경할 때만..
  if (user.isModified("password")) {
    //비밀번호를 암호화시킨다.
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next("can't generate salt.");
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next("can't generate hash.");
        }

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// methods와 statics의 차이점
// methods를 사용할 때는 이 method를 호출한 객체가 method 내에서의 this가 되고,
// statics를 사용할 때는 이 statics를 호출한 객체에 상관없이 this가 모델 자체가 된다. statics = 전역

userSchema.methods.comparePassword = function (planePassword, cb) {
  bcrypt.compare(planePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;

  // jsonwebtoken을 이용해서 token을 생성하기
  let token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this; // this = userSchema

  // 토큰을 decode한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    if (err) return cb(err);
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치한는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, userInfo) {
      if (err) return cb(err);
      cb(null, userInfo);
    });
  });
};

// schema를 모델로 감싸야함
// User = 모델
const User = mongoose.model("users", userSchema);
const Cloth = mongoose.model("cloth", userCloth);
module.exports = { User: User, Cloth: Cloth };
