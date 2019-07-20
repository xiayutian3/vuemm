 <template>
   <div class="m-products-list" >
     <dl>
       <dd v-for="item in nav" :key="item.name" :class="[item.name,item.active?'s-nav-active':'']" @click="navSelect(item,$event)">{{item.txt}}</dd>
     </dl>
     <ul ref="ulList">
       <Item v-for="(item,idx) in lists" :key="idx" :meta="item"></Item>
     </ul>
   </div>
 </template>
 
 <script>
 import Item from './product.vue'
 export default {
   props:{
     list:{
       type:Array,
       default(){
         return []
       }
     }
   },
   data(){
     return {
         nav: [
        {
          name: 's-default',
          txt: '智能排序',
          active: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
     }
   },
   created(){},
   mounted(){
     this.initMmapTops()
   },
  //  async asyncData({app}){
  //    let {data} = await app.$axios.get('/searchList')
  //    return {list:data.list}
  //  },
   methods:{
    navSelect(one) {
      // console.log('select')
      this.nav.forEach((item)=>{
          item.active = false
      })
      one.active = true
      switch(one.txt){
        case '智能排序':
          this.lists.sort((a,b)=>a.name<b.name?1:-1)
          break;
        case '价格最低':
          this.lists.sort((a,b)=>a.price>b.price?1:-1)
          break;
        case '人气最高':
          this.lists.sort((a,b)=>a.rate<b.rate?1:-1)
          break;
        case '评价最高':
          this.lists.sort((a,b)=>a.comment<b.comment?1:-1)
          // console.log(this.list)
          break;
      }
    },
    initMmapTops(){
      const mapTops = []
      let divTops = this.$refs.ulList.getElementsByClassName('s-item')
      // let firstTop = divTops[0].getBoundingClientRect().bottom
      let top = 0
      mapTops.push(top)
        Array.from(divTops).forEach((item)=>{
          top = item.getBoundingClientRect().bottom
          mapTops.push(top)
        })
        this.$emit('mapTops',mapTops)
      }
      
   },
   computed:{
     lists(){
       return this.list
     }
   },
   components:{
     Item
   },
   watch:{}
 }
 </script>
 <style lang="scss">

 </style>