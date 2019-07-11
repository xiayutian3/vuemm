<template>
  <div class="m-user">
    <template v-if="user"> 
      欢迎您，<span class="username">{{user}}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link
      to="/login"
      class="login">
        立即登录
      </nuxt-link>
       <nuxt-link
      to="/register"
      class="register">
        注册
      </nuxt-link>
    </template>  
  </div>
</template>

<script>
export default {
  props:{},
  data(){
    return {
      user:''
    }
  },
  created(){},
  async mounted(){
    let {status,data:{user}} = await this.$axios.get('/users/getUser')
    if(status == 200){
      this.user = user
    }
  },
  methods:{},
  computed:{},
  components:{},
  watch:{}
}
</script>
<style lang="scss" scoped>
</style>