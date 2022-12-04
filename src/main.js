const Koa = require('koa')

const app = new Koa()

app.use((ctx, next)=>{
  ctx.body = 'fffff'
})

app.listen(3031, ()=>{
  console.log('service is starting at port 3000');
})