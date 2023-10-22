const jwt = require("jsonwebtoken");
const fs = require("fs").promises;

const {
  createUser,
  getUerInfo,
  updateById,
} = require("../service/user.service");
const { userRegisterErr } = require("../constant/err.type");
const { getPublicKey } = require("../constant/success.type");
const { JWT_SECRET } = require("../config/config.default");

class UserController {
  async getPublicKey(ctx, next) {
    try {
      const res = await fs.readFile("private_key.pem", "utf8");
      ctx.body = {
        ...getPublicKey,
        data: res,
      };
    } catch (error) {
      console.error(error);
      // 处理错误
      ctx.app.emit("error", userRegisterErr, ctx);
    }
  }

  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body;
    // 2. 操作数据库
    try {
      const res = await createUser(user_name, password);
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      console.error(error);
      ctx.app.emit("error", userRegisterErr, ctx);
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body;

    // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
    try {
      const { password, ...res } = await getUerInfo({ user_name });

      ctx.body = {
        code: 1,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (err) {
      console.error("用户登录失败", err);
    }
  }

  async modifyPassword(ctx, next) {
    // 1. 获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;

    // 2. 操作数据库
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 1,
        message: "修改密码成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: "10007",
        message: "修改密码失败",
        result: "",
      };
    }
    // 3. 返回结果
  }
}

module.exports = new UserController();
