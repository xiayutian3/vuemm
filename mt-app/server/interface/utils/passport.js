//验证权限的一个好用的库
import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function(username,password,done){
  let where = {
    username
  }
  let result = await UserModel.findOne(where)
  if(result != null){
    if(result.password == password){
      return done(null,result)
    }else{
      return done(null,false,'密码错误')
    }
  }else{
    return done(null,false,'用户不存在')
  }
}))

//每次用户进来自动通过session去验证,需要做一个序列化的动作
// 虽然完成了登录，用户的信息也在session中了，但是代码中如何获取到当前用户呢？ 
// 前面的passport.js代码中的serializeUser 和 deserializeUser 分别是设置和从session中获取用户的时候被调用。
passport.serializeUser(function(user,done){
  done(null,user)
})
passport.deserializeUser(function(user,done){
  return done(null,user)
})

export default passport
