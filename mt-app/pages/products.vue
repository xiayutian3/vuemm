<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy :types="types" :areas="areas"/>
      <list :list="list" @mapTops = "initMapTops"/>
    </el-col>
    <el-col :span="5">
      <amap id="fixedClass" :class="fixedClass" v-if="point.length"  :width="230" :height="290" :point="point"/>
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
export default {
  props:{},
  data(){
    return {
      list:[],
      types:[],
      areas:[],
      keyword:'',
      point:[],
      mapTops:[],
      fixedClass:''
    }
  },
  created(){},
  mounted(){
    // console.log('point',this.point)
    console.log(this.list)
    this.scroll()
  },
  methods:{
    //鼠标滚动监听 改变地图的位置

    scroll() {
      let amapTop = document.getElementById('fixedClass').getBoundingClientRect().top
       var that = this
       //为了保证兼容性，这里取两个值，哪个有值取哪一个
        //scrollTop就是触发滚轮事件时滚轮的高度
       window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        console.log("滚动距离" + scrollTop);
        // 地图fixed定位
        // console.log(that.$refs.fixedClass)
        if(scrollTop>=amapTop){
          console.log(111)
          that.fixedClass = 'fixedClass'
        }else{
           that.fixedClass = ''
        }


        let geoIndex = that.mapTops.findIndex((item,index)=>{

          return scrollTop>=item && scrollTop<=that.mapTops[index+1]
        })
        //修改地图显示的位置
        that.point = that.list[geoIndex].location.split(',')
      }
    },
    initMapTops(mapTops){
      this.mapTops = mapTops
    }
  },
  computed:{},
  components:{
    Crumbs,
    Categroy,
    List,
    Amap
  },
  async asyncData(ctx){
    let keyword = ctx.query.keyword
    let city = ctx.store.state.geo.position.city
    let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
      params:{
        keyword,
        city
      }
    })
    let {status:status2,data:{areas,types}} = await ctx.$axios.get('/categroy/crumbs',{
      params:{
        city
      }
    })
    if(status == 200 && count>0 && status2==200){
      return {
        list: pois.filter(item=>item.photos.length).map(item=>{
          return {
            type:item.type,
            img:item.photos[0].url,
            name:item.name,
            comment:Math.floor(Math.random()*10000),
            rate:Number(item.biz_ext.cost),
            scene:item.tag,
            tel:item.tel,
            status:'可定明日',
            location:item.location,
            module:item.type.split(';')[0]
          }
        }),
        keyword,
        areas: areas.filter(item=>item.type !== '').slice(0,5),
        types: types.filter(item=>item.type !== '').slice(0,5),
        point: (pois.find(item=>item.location).location||'').split(',')
      }
    }

  },
  watch:{}
}
</script>
<style lang="scss">
@import '@/assets/css/products/index.scss';
.page-product{
  width: 1190px;
  margin: 0 auto;
}
.fixedClass{
  position: fixed!important;
  top: -35px;

}
</style>