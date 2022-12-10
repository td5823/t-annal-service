const Koa = require('koa')
const { koaBody } = require('koa-body')

const userRouter = require('../router/user.route')

const errHandler = require('./errHandler')

const app = new Koa()

// 统一的错误处理
app.on('error', errHandler)

app.use(koaBody({
  multipart: true,
  strict:false,//设为false
  formidable: {
      maxFileSize: 200 * 1024 * 1024
  }
}))

app.use(userRouter.routes())

module.exports = app
