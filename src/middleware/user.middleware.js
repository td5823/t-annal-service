const { getUerInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited, userRegisterErr } = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    const res = await getUerInfo({ user_name })
    if (res) {
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
    await next()
  } catch (error) {
    ctx.app.emit('error', userRegisterErr, ctx)
  }
}

module.exports = {
  userValidator,
  verifyUser,
}