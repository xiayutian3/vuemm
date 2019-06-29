<template>
  <div class="search">
    <div class="hearder">
      我是search的头部
    </div>
    <nuxt/>  
    <!-- <div class="footer">我是search的dibu</div> -->
    <footer>我是search的底部</footer>
  </div>
</template>

<script>
export default {
  props: [],

  data () {
    return {

    };
  },

  created(){},

  mounted(){},

  methods: {},

  components: {},

  computed: {}
}

</script>
<style lang='less' scoped>
.search{
  color: red;
}
</style>