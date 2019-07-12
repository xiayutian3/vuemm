import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({prefix:'/geo'})

//用来请求线上的数据用的
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


router.get('/province',async(ctx)=>{
  // 本地数据库方式
  // let province = await Province.find()
  // console.log('province',province)
  // ctx.body = {
  //   province
  // }

   // 线上方式
   let {status,data:{province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)

  //  if(status == 200){
  //    ctx.body = {
  //     province
  //    }
  //  }

  // 换种写法
  ctx.body = {
    province:status == 200?province:[]
  }

})

//例如： http://localhost:3000/geo/province/210000
router.get('/province/:id',async(ctx)=>{
  // let city = await City.findOne({id: ctx.params.id})
  //
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return {province: item.province, id: item.id, name: item.name}
  //   })
  // }


  let {status,data:{city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})


router.get('/city', async (ctx) => {
  // let city = []
  // let result = await City.find()
  // result.forEach(item => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   code: 0,
  //   city: city.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
  //         ? item.province
  //         : item.name
  //     }
  //   })
  // }
  let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})




router.get('/hotCity', async (ctx) => {
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }
  let {status, data: {
      hots
    }} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})







router.get('/menu',async(ctx)=>{
  // 本地数据库方式
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