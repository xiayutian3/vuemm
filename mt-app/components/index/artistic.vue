<template>
    <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人">丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影">电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="(item,index) in cur"
        :key="index">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props:{},
  data(){
    return {
      kind: 'all',
      list:{
        all: [
          {
            title:'kinglove金乐喜来登',
            img:'//p0.meituan.net/msmerchant/7fed2224f3b8ac93de4f5cd29d0331fe113913.jpg@368w_208h_1e_1c',
            pos:['这个好吃','味道还不错'],
            price:100
          },
          {
            title:'kinglove金乐喜来登',
            img:'//p0.meituan.net/msmerchant/7fed2224f3b8ac93de4f5cd29d0331fe113913.jpg@368w_208h_1e_1c',
            pos:['这个好吃','味道还不错'],
            price:100
          },
          {
            title:'kinglove金乐喜来登',
            img:'//p0.meituan.net/msmerchant/7fed2224f3b8ac93de4f5cd29d0331fe113913.jpg@368w_208h_1e_1c',
            pos:['这个好吃','味道还不错'],
            price:100
          },
        ],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  created(){},
  mounted(){},
  methods:{
    over(e){
      // console.log(e.target.nodeName.toLowerCase())
      // console.log(e.target.nodeName)
      if(e.target.nodeName == 'DD'){
         this.kind = e.target.getAttribute('kind')
      }
     
    }
  },
  computed:{
    cur: function () {
      return this.list[this.kind]
    }
  },
  components:{},
  watch:{}
}
</script>
<style lang="scss">
   @import "@/assets/css/index/artistic.scss";
</style>