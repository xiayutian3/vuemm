<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">{{$store.state.geo.position.city.replace('市','')}}美团</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">{{city}}{{decodeURIComponent(keyword)}}</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    keyword:{
      type:String,
      default:''
    }
  },
  data(){
    return {
    }
  },
  created(){},
  mounted(){},
  methods:{},
  computed:{
    ...mapState('geo',{
      city: state => state.position.city.replace('市','')
    })
  },
  components:{},
  watch:{}
}
</script>
<style lang="scss" >

</style>