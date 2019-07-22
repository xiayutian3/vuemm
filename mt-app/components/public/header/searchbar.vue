<template>
 <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团">
      </el-col>
      <el-col
        :span="15"
        class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur ="blur"
            @input ="input"
            />
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl
            class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in $store.state.home.hotPlace.slice(0,5)" :key="index">
              <a :href="`/products?keyword=${encodeURIComponent(item.name)}`">{{item.name}}</a>
              </dd>
          </dl>
          <dl
            class="searchList"  v-if="isSearchList">
             <dd v-for="(item,index) in searchList" :key="index">
                <a :href="`/products?keyword=${encodeURIComponent(item.name)}`">{{item.name}}</a>
               </dd>
          </dl>
        </div>
        <p class="suggest">
          <a :href="`/products?keyword=${encodeURIComponent(item.name)}`"  v-for="(item,index) in $store.state.home.hotPlace.slice(0,5)" :key="index">{{item.name}}</a>
          <!-- <nuxt-link :to="{path: '/products', query: {keyword: encodeURIComponent(item.name)}}"  v-for="(item,index) in $store.state.home.hotPlace.slice(0,5)" :key="index">{{item.name}}</nuxt-link> -->
        </p>
        <ul class="nav">
          <li><nuxt-link
            to="/"
            class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="apartment">民宿/公寓</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="business">商家入驻</nuxt-link></li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right">
        <ul class="security">
          <li><i class="refund"/><p class="txt">随时退</p></li>
          <li><i class="single"/><p class="txt">不满意免单</p></li>
          <li><i class="overdue"/><p class="txt">过期退</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props:{},
  data(){
    return {
      isFocus:false,
      search:'',
      hotPlace:[],
      searchList:[]
    }
  },
  created(){},
  mounted(){},
  methods:{
    focus(){
      this.isFocus = true
    },
    blur(){
        setTimeout(()=>{
          this.isFocus = false
        },200)
    },
    input:_.debounce(async function(){    //用lodash中的延时方法    不能用箭头函数// this undefined  
      //因为地理位置不在国内拿不到相应的位置，所以随便找了个位置  就北京吧
      // console.log(self.$store.state.geo.position.city)    ///position里边的city，province分别返回的是数组 []

      // 在服务区内
      // let city = this.$store.state.geo.position.city.replace('市','')

      // 不在服务区内
      let city = this.$store.state.geo.position.city.length==0?'北京':this.$store.state.geo.position.city.replace('市','')


      this.searchList = []
      let {status,data:{top}} = await this.$axios.get('/search/top',{
        params:{
          input:this.search,
          city
        }
      })
      this.searchList = top.slice(0,10)
    },300)
  },
  computed:{
    isHotPlace(){
      return this.isFocus && !this.search
    },
    isSearchList(){
      return this.isFocus && this.search
    }

  },
  components:{},
  watch:{
    $route(newVal,oldVal){
      console.log(newVal)
    }
  }
}
</script>
<style lang="scss" >
</style>