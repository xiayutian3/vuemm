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
        // console.log(province,city)  
        commit('geo/setPosition',status ==200?{province,city}:{province:'默认地址',city:'默认城市'})

        //获取菜单列表
        const {status:status2,data:{menu}} = await app.$axios.get('/geo/menu')
        commit('home/setMenu',status2==200?menu:[])

    }
  }
})

export default store