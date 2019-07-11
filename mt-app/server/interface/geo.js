import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({prefix:'/geo'})

const sign = 'e92cd69c339ad71aa749759794c5f23b'

router.get('/getPosition', async(ctx)=>{
  let {status,data:{province,city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if(status == 200){
    ctx.body = {
      province,
      city
    }
  }else{
    ctx.body = {
      province:'',
      city:''
    }
  }
})

router.get('/menu',async(ctx)=>{
  // 本地数据库方式
  // let Menu = Mongoose.model('Menus')
  // const result = await Menu.findOne()
  // ctx.body = {
  //   menu:result.menu
  // }

  // 线上方式
  let {status,data:{menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if(status === 200){
    ctx.body = {
      menu
    }
  }else{
    ctx.body = {
      menu:[]
    }
  }
})



export default router