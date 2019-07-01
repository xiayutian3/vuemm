<template>
  <el-row :gutter="0" class="m-header">
    <el-col :span="5"><geo/></el-col>
    <el-col :span="6"><user/></el-col>
    <el-col :span="13"><navbar/></el-col>
  </el-row>
</template>

<script>
import Geo from './geo.vue'
import User from './user.vue'
import Navbar from './nav.vue'
export default {
  props:{},
  data(){
    return {
    }
  },
  created(){},
  mounted(){},
  methods:{},
  computed:{},
  components:{
    Geo,
    User,
    Navbar
  },
  watch:{}
}
</script>
<style lang="scss">
 @import "@/assets/css/public/header/index.scss";
</style>