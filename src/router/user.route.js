const Router = require("koa-router");

const {
  getPublicKey,
  register,
  login,
  modifyPassword,
} = require("../controller/user.controller");
const {
  createPublicKey,
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
} = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/users" });

// 注册接口
router.post("/getPublicKey", createPublicKey, getPublicKey);

// 注册接口
router.post("/register", userValidator, verifyUser, crpytPassword, register);

// 登录接口
router.post("/login", userValidator, verifyLogin, login);

// 修改接口
router.patch("/modifyPassword", auth, crpytPassword, modifyPassword);

module.exports = router;
