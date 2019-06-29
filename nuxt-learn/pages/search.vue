<template>
  <div>
    this page is search 
    <ul>
      <!-- <li v-for="(item,index) in list" :key="index">{{item}}</li> -->

      <!-- //取vuex中的数据 -->
      <li v-for="(item,index) in $store.state.navbar.app" :key="index">{{item}}</li>

    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout:'search',
  props: [],

  data () {
    return {
      list:[]
    };
  },

  created(){
    // console.log(this.$store.state.city.list)
    // let {status,data: {data}} = await axios.get('/city/list')
    // console.log(status,data)
    // if(status == 200){
    //   this.list = data
    // }
  },

  // created mounted这个过程在服务器端是不执行的，查看源码数据是不渲染上去的
  async mounted(){
    
    // let {status,data: {data}} = await axios.get('/city/list')
    // console.log(status,data)
    // if(status == 200){
    //   this.list = data
    // }
  },

  //服务器端渲染  没有app实例 所以没有this
  //两者都是异步请求
  // asyncData用来处理组件的数据，fetch主要处理vuex相关的事情，用fetch处理组件数据就不行
  async asyncData(){
    let {status,data: {data}} = await axios.get('http://localhost:3000/city/list')
     if(status == 200){
      return {
        list: data
      }
    }
  },

  //没有数据显示，错误用法
  // async fetch(){
  //   let {status,data: {data}} = await axios.get('http://localhost:3000/city/list')
  //    if(status == 200){
  //     return {
  //       list: data
  //     }
  //   }
  // },


  methods: {},

  components: {},

  computed: {}
}

</script>
<style lang='less' scoped>

</style>