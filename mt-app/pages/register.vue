<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登陆</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>

        <!-- 增加校验的值 验证码-->
        <!-- 
        <el-form-item label="验证码" prop="code"  
        :rules="[{ required: true, message: '验证码不能为空'},{ type: 'number', message: '验证码必须为数字值'}]">
          <el-input v-model.number="ruleForm.code" maxlength="4"></el-input>
        </el-form-item> -->

       <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" maxlength="20" type="password"></el-input>
        </el-form-item>
        <el-form-item label="请确认密码" prop="cpwd" >
          <el-input v-model="ruleForm.cpwd" maxlength="20" type="password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="register('ruleForm')">同意以下协议并注册</el-button>
          <div class="error">{{error}}</div>
        </el-form-item>
        <el-form-item >
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>

      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: "blank",
  props: {},
  data() {
    return {
      timerid:'',
      statusMsg:'',
      error:'',
      ruleForm:{
        name:'',
        code:'',
        pwd:'',
        cpwd:'',
        email:''
      },
      rules:{
        name:[{
          required:true,type:'string',message:'请输入昵称',trigger:'blur'
        }],
        email:[
          {required:true,message:'请输入邮箱地址',trigger:'blur'},
          {type:'email',message:'请输入正确的邮箱地址',trigger:['blur','change']}
        ],
        pwd:[
          {required:true,message:'创建密码',trigger:'blur'}
        ],
        cpwd:[
          {required:true,message:'确认密码',trigger:'blur'},
          {
            validator:(rule,value,callback)=>{
              if(value === ''){
                callback(new Error('请再次输入密码'))
              }else if(value !== this.ruleForm.pwd){
                callback(new Error('两次输入的密码不一致'))
              }else{
                callback()
              }
            },
            trigger:'blur'
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    sendMsg(){
      let namePass
      let emailPass
      if(this.timerid){  //定时器
        return false
      }
      this.$refs['ruleForm'].validateField('name',(valid)=>{
        //有值返回来说明是不通过的
        namePass = valid
      })
      this.statusMsg = ''
      this.$refs['ruleForm'].validateField('email',(valid)=>{
        //有值返回来说明是不通过的
        emailPass = valid
      })
      if(!namePass && !emailPass){
        this.$axios.post('/users/verify',{
          username:encodeURIComponent(this.ruleForm.name),    //对中文进行编码
          email:this.ruleForm.email
        }).then(({status,data})=>{
          if(status === 200 && data&& data.code === 0){
            let count = 60
            this.timerid = setInterval(()=>{
              if(count == 0){
                clearInterval(this.timerid)
                this.timerid = ''
              }
              console.log('count',count)
              this.statusMsg = `验证码已发送，剩余${count--}秒`  
             
            },1000)
          }else{
            this.statusMsg = data.msg
          }
        })
      }

    },
    register(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.$axios.post('/users/signup',{
            username:window.encodeURIComponent(this.ruleForm.name),
            password:CryptoJS.MD5(this.ruleForm.pwd).toString(),    //CryptoJS.MD5()返回的是数组。toString转化为字符串
            email:this.ruleForm.email,
            code:this.ruleForm.code
          }).then(({status,data})=>{
            if(status ==200){
              if(data&&data.code==0){
                window.location.href = '/login'
              }else{
                this.error = data.msg
              }
            }else{
              this.error = `服务器出错，错误码:${status}`
            }
            setTimeout(()=>{
              this.error = ''
            },1500)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  computed: {},
  components: {},
  watch: {}
};
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>