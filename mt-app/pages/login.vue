<template>
  <div class="page-login">
    <div class="login-header ">
      <a href="/" class="logo"></a>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网">
      </div>
      <div class="form">
        <h4
          v-if="error"
          class="tips"><i/>{{ error }}</h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile"></el-input>
        <el-input v-model="password" prefix-icon="password" type="password"></el-input>
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码?</b>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout:'blank',
  props:{},
  data(){
    return {
      checked: '',
      username: '',
      password: '',
      error: ''
    }
  },
  created(){
    // var str = 'asd'
    // console.log(CryptoJS.MD5(str))
    // console.log(CryptoJS.MD5(str).toString())
  },
  mounted(){},
  methods:{
    login(){
      this.$axios.post('/users/signin',{
        username:window.encodeURIComponent(this.username),   //处理编码，处理中文，如果不处理可能会收到乱码，以后对数据库查询不方便
        password:CryptoJS.MD5(this.password).toString()     //CryptoJS.MD5()返回的是数组。toString转化为字符串
      }).then(({status,data}) => {
        if(status == 200){
          if(data && data.code ==0){
            window.location.href = '/'
          }else{
            this.error = data.msg
          }
        }else{
          this.error = '服务器出错'
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  computed:{},
  components:{},
  watch:{}
}
</script>
<style lang="scss">
 @import "@/assets/css/login/index.scss";
</style>