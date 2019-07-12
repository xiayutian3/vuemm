import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'

let router = new Router({prefix:'/search'})

//用来请求线上的数据用的
const sign = 'e92cd69c339ad71aa749759794c5f23b'

router.get('/top',async(ctx)=>{
  let {status,data:{top}} = await axios.get(`http://cp-tools.cn/search/top`,{
    params:{
      input:ctx.query.input,
      city:ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top:status == 200?top:[]
  }

})

router.get('/hotPlace',async(ctx)=>{
  //服务端获取vuex数据，不用ctx.$store,直接用 ctx.store.state.geo...就好了
  // console.log('ctx.store',ctx.store,ctx.query.city)

  // ****vuex 是服务器、浏览器共享状态****
  // console.log('ctx',ctx)  一开始服务端没有ctx.store 这个东西  undfind
  let city = ctx.store?ctx.store.state.geo.position.city:ctx.query.city
  let {status,data:{result}} = await axios.get(`http://cp-tools.cn/search/hotPlace`,{
    params:{
      sign,
      city  
    }
  })
  ctx.body = {
    result:status==200?result:[]
  }
})


router.get('/resultsByKeywords',async(ctx)=>{
  const {city,keyword} = ctx.query;
  let {status,data:{count,pois}} = await axios.get('http://cp-tools.cn/search/resultsByKeywords',{
    params:{
      city,
      keyword,
      sign
    }
  })
  ctx.body = {
    count:status == 200?count:0,
    pois:status == 200?pois:[]
  }
})




export default router