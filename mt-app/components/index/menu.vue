<template>
  <div class="m-menu">
    <dl class="nav">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in menu" :key="index">
        <i :class="item.type"/>{{item.name}}<span class="arrow"></span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props:{},
  data(){
    return {
      menu:[
        {
          type:'food',
          name:'美食'
        },
          {
          type:'takeout',
          name:'外卖'
        },
      ]
    }
  },
  created(){},
  mounted(){},
  methods:{},
  computed:{},
  components:{},
  watch:{}
}
</script>
<style lang="scss">
</style>