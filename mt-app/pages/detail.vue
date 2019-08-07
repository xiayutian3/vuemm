<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :keyword="keyword" :type="type" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summa :meta="product" />
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24"> 
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <list v-if="login" :list = list />
        <div
          v-else
          class="deal-need-login">
          <img
            src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button
            type="primary"
            round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue'
import Summa from '@/components/detail/summary.vue'
import List from '@/components/detail/list.vue'
export default {
  props:{},
  // 使用asyncData后，data数据基本没什么用了，因为是服务端渲染
  // data(){
  //   return {
  //     keyword:'',
  //     type:'',
  //     product:'',
  //     list:[],
  //     login:''
  //   }
  // },
  created(){},
  mounted(){
    //也可以拿到router参数  keyword, type 
    // console.log('router',this.$route.query)
  },
  async asyncData(ctx){
    // console.log(ctx)
    let {keyword,type} = ctx.query
    let {status,data:{product,more:list,login}} = await ctx.$axios.get('/search/products',{
      params:{
        keyword,
        type,
        city:ctx.store.state.geo.position.city
      }
    })
    if(status == 200){
      return {
        keyword,
        product,
        type,
        list,
        login
      }
    }else{
      return {
        keyword,
        product:{},
        type,
        list:[],
        login:false
      }
    }

  },
  methods:{},
  computed:{
    canOrder(){
      return this.list.filter(item=>item.photos.length).length
    }
  },
  components:{
    Crumbs,
    Summa,
    List
  },
  watch:{}
}
</script>
<style lang="scss" >
@import '@/assets/css/detail/index.scss';
</style>