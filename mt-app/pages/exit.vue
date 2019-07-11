<template>
  <div class="wrapper"></div>
</template>

<script>
export default {
  layout:'blank',
  middleware:async(ctx)=>{
    let {status,data} = await ctx.$axios.get('/users/exit')
    if(status == 200 && data && data.code == 0){
      window.location.href = '/'
    }
  },
  props:{},
  data(){
    return {

    }
  },
  created(){},
  //在 mounted中退出也是可以的
//   async mounted(){
//     let {status,data} = await this.$axios.get('/users/exit')
//     if(status == 200 && data && data.code == 0){
//       window.location.href = '/'
//     }
//  },
  methods:{},
  computed:{},
  components:{},
  watch:{}
}
</script>
<style lang="scss">

</style>