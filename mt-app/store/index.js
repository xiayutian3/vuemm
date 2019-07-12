import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = ()=> new Vuex.Store({
  modules:{
    geo,
    home
  },
  actions:{
    async nuxtServerInit({commit},{req,app}){
       //头部 获取城市
        const {status,data:{province,city}} = await app.$axios.get('/geo/getPosition')
        // console.log(province,city)  两个空数组  因为地址位置不在服务区

        // 在服务区的时候
        // commit('geo/setPosition',status ==200?{province,city}:{province:'北京',city:'北京市'})

        // 不在服务区的时候
        commit('geo/setPosition',status ==200?{province:'北京',city:'北京市'}:{province:'北京',city:'北京市'})

        //获取菜单列表
        const {status:status2,data:{menu}} = await app.$axios.get('/geo/menu')
        commit('home/setMenu',status2==200?menu:[])


        //获取热门城市
        const {status:status3,data:{result}} = await app.$axios.get('/search/hotPlace',{
          params:{
            city:app.store.state.geo.position.city.replace('市',''),  //服务端获取vuex数据 app.store  是没有$store, 只有store,本身就在vuex实例里边，所以能拿到vuex数据
          }
        })
        // console.log(result,app.store.state.geo)
        commit('home/setHotPlace',status3==200?result:[])
    }
  }
})

export default store