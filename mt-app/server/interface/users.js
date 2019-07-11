import Router from 'koa-router'
// 解决向多人发送验证码，a拿到a的验证码，b拿到b的验证码，
// 怎么知道a拿到的正确的验证码，b拿到的正确的验证码  （放在内存中不可取，内存会爆）
// 存在Redis数据库中，检查 一一对应
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
// 因为最重要的是config的邮箱的东西，所以取名email
import Email from '../dbs/config'
import axios from './utils/axios'


let router = new Router({
  prefix:'/users'
})
let Store = new Redis().client

router.post('/signup',async(ctx)=>{
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body


  if(code){
    //取出code，过期时间
    const saveCode = await Store.hget(`nodemail:${username}`,'code')
    const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
    if(code === saveCode){
      if(new Date().getTime()-saveExpire>0){
        ctx.body ={
          code:-1,
          msg:'验证码已过期，请重新获取验证码'
        }
        return false
      }
    }else{
      ctx.body = {
        code:-1,
        msg:'请填写正确的验证码'
      }
      return false
    }
  }else{
    ctx.body = {
      code:-1,
      msg:'请输入验证码'
    }
    return false
  }
//查找用户名是否存在
  let user = await User.find({
    username
  })
  if(user.length){
    ctx.body = {
      code:-1,
      mag:'已被注册'
    }
    return false
  }
  let nuser = await User.create({username,password,email})
  if(nuser){
    let res = await axios.post('/users/signin',{username,password})
    if(res.data && res.data.code === 0){
      ctx.body = {
        code:0,
        msg:'注册成功',
        user:res.data.user
      }
    }else{
      ctx.body = {
        code:-1,
        mag:'error'
      }
    }
  }else{
    ctx.body = {
      code:-1,
      msg:'注册失败'
    }
  }

})



//登录的接口
router.post('/signin',async(ctx,next)=>{
  console.log(1111,)
  return Passport.authenticate('local',function(err,user,info,status){
    if(err){
      ctx.body = {
        code:-1,
        msg:err
      }
    }else{
      console.log('user',user)
      if(user){
        ctx.body = {
          code:0,
          msg:'登陆成功',
          user
        }
       /* //做一个登录状态   是进行session存储，这里是存储到redis    这个login是封装在passport的，可以去那个源码中去看*/
        return ctx.login(user)
      }else{
        ctx.body = {
          code:1,
          msg:info
        }
      }
    }
  })(ctx,next)
})



//验证码
router.post('/verify',async(ctx,next)=>{
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
  if(saveExpire && new Date().getTime()-saveExpire<0){
console.log(saveExpire,new Date().getTime(),)
    ctx.body = {
      code:-1,
      msg:'验证请求过于频繁，1分钟内一次'
    }
    return false
  }
  //smtp 发邮件服务 （发送方 的对象）
  let transporter = nodeMailer.createTransport({
    host:Email.smtp.host,
    port:587,
    secure: false,  //true 的话时间听465端口， false是其他端口
    auth:{
      user:Email.smtp.user, 
      pass:Email.smtp.pass
    }
  })
  //接受方 的对象
  let ko = {
    code:Email.smtp.code(),
    expire:Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username   //给哪个用户名、哪个邮箱发送验证码
  }
  //发送的信息（内容）
  let mailOptions = {
    from:`'认证邮件' <${Email.smtp.user}>`,
    to:ko.email,
    subject:'<慕课高仿美团实战> 注册码',
    html: `你在《慕课网高仿美团实战》课程中注册。您的邀请码是${ko.code}`
  }
  //开始发送邮件
  await transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
      return console.log(err)
    }else{
      Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
    }
  })
  ctx.body = {
    code:0,
    msg:'验证码已发送，请稍等 有效一分钟'
  }

})


//退出
router.get('/exit',async(ctx,next)=>{
  await ctx.logout()   //退出状态    这个logout是封装在passport的，可以去那个源码中去看
  if(!ctx.isAuthenticated()){  //检查登陆的状态
    ctx.body = {
      code:0,
      msg:'退出成功'
    }
  }else{
    ctx.body = {
      code:-1,
      msg:'退出失败'
    }
  }
})


//获取用户名
router.get('/getUser',async(ctx)=>{
  if(ctx.isAuthenticated()){
    //passport 会把用户信息放到session里边 
    const {username,email} = ctx.session.passport.user
    ctx.body = {
      code:0,
      user:username,
      email
    }
  }else{
    ctx.body = {
      code:0,
      user:'',
      email:''
    }
  }
})


export default router