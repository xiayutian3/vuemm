import Router from 'koa-router'
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'
// //用来请求线上的数据用的
// import sign from './utils/sign'

let router = new Router({prefix:'/cart'})



//创建购物车
router.post('/create',async (ctx)=>{
  if(!ctx.isAuthenticated()){   //判断用户是否登录
    ctx.body = {
      code:-1,
      msg:'please login'
    }
  }else{
    let time = Date()
    let cartNo = md5(Math.random()*1000+Date()).toString()
    let {params:{id,detail}} = ctx.request.body
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,   //用了 passport这个库  里边就有用户信息
      detail
    })

    //插入数据库
    let result = await cart.save()
    if(result){
      ctx.body = {
        code:0,
        msg:'',
        id:cartNo
      }
    }else{
      ctx.body = {
        code:-1,
        msg:'fail'
      }
    }
  }
})


//获取购物车详情
router.post('/getCart',async ctx=>{
  let {id} = ctx.request.body
  try{
    let result = await Cart.findOne({cartNo:id})
    ctx.body = {
      code:0,
      data:result?result.detail[0]:{}
    }
  }catch(e){
    ctx.body = {
      code:-1,
      data:{}
    }
  }
})




export default router