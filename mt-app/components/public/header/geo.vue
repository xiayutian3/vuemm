<template>
  <div class="m-geo">
    <i class="el-icon-location"/>
      {{cityName}}
      <nuxt-link
      class="changeCity"
      to="/changeCity">
        切换城市
      </nuxt-link>
       [香河 廊坊 天津]
  </div>
</template>

<script>
export default {
  props:{},
  data(){
    return {
    }
  },
  created(){},
  mounted(){},
  methods:{},
  computed:{
    cityName(){
      return this.$store.state.geo.position.city?this.$store.state.geo.position.city:'北京市'
    }
  },
  components:{},
  watch:{}
}
</script>
<style lang="scss">
</style>