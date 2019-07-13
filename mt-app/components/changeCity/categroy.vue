<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-'+item">{{item}}</a>
      </dd>
    </dl>
    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="'city-'+item.title">{{item.title}}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{c}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
  import pyjs from 'js-pinyin'
export default {
  props: [],

  data () {
    return {
      list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block:[]
    };
  },

  created(){},

  async mounted(){
    let blocks = []
    let {status,data:{city}} = await this.$axios.get('/geo/city')
    if(status==200){
      let p   //获取首字母
      let c   //返回指定位置的字符的 Unicode 编码
      let d = {}    //临时对象{'a':['属于a的所有城市']}
      city.forEach(item => {
        p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
        c = p.charCodeAt(0)
        if(c>96&&c<123){  //小写a-z 97-122   大写a-z:65-90
          if(!d[p]){
            d[p]=[]
          }
          d[p].push(item.name)
        }
      });
      for (let [k,v] of Object.entries(d)){
        blocks.push({
          title:k.toUpperCase(),
          city:v
        })
      }
      blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
      this.block = blocks
    }
  },

  methods: {},

  components: {},

  computed: {}
}

</script>
<style lang='scss' >
@import '@/assets/css/changeCity/categroy.scss';
</style>