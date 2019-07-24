// const Koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

//改动，新增的

import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
//服务端向客户端发的信息，json格式化，美化用的
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'
import categroy from './interface/categroy'
import cart from './interface/cart'
import order from './interface/order'

//******************* */


const app = new Koa()

//改动，新增的

//进行session相关的操作
app.keys = ['mt','keyskeys']  //秘钥    内容可以随便填，一般是随机字符串。作用是用来加密cookie
app.proxy = true
app.use(session({
  key:'mt',
  prefix:'mt:uid',
  store:new Redis()
}))
app.use(bodyParser({
  extendTypes:['json','form','text']
}))
app.use(json())
//链接数据库
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})
//处理登录相关的 
app.use(passport.initialize())
app.use(passport.session())

//******************* */




// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }


  //改动，新增的

app.use(users.routes()).use(users.allowedMethods())
app.use(geo.routes()).use(geo.allowedMethods())
app.use(search.routes()).use(search.allowedMethods())
app.use(categroy.routes()).use(categroy.allowedMethods())
app.use(cart.routes()).use(cart.allowedMethods())
app.use(order.routes()).use(order.allowedMethods())


//******************* */

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
