<template>
  <el-container class="layout-default">
    <el-header height="197px"><my-header/></el-header>
    <el-main><nuxt /></el-main>
    <el-footer><my-footer/></el-footer>
  </el-container>
</template>
<script>
import MyHeader from '@/components/public/header/index.vue'
import MyFooter from '@/components/public/footer/index.vue'
export default {
  components:{
    MyHeader,
    MyFooter
  }
}
</script>


<style>
html,body{
  background:#F8F8F8;
}
.el-main{
  overflow: visible;
}
</style>
