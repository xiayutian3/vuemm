<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span class="name">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import _ from 'lodash'
import { async } from 'q';
export default {
  props: [],

  data () {
    return {
        province:[],
        pvalue:'',
        city:[],
        cvalue:'',
        input:'',
        cities:[]     //全国的城市列表
    };
  },

  created(){},

  async mounted(){
    let {status,data:{province}}=await this.$axios.get('/geo/province')
    if(status==200){
      this.province = province.map(item => {
        return {
          value:item.id,
          label:item.name
        }
      })
    }
  },

  methods: {
    //延时处理 debounce函数   此处不能用箭头函数，找不到this
    querySearchAsync:_.debounce(async function(query,cb){   
      if(this.cities.length){
        cb(this.cities.filter(item => item.value.indexOf(query)>-1))
      }else{
        let {status,data:{city}} = await this.$axios.get('/geo/city')
        if(status==200){
          this.cities = city.map(item=>{
            return {
              value:item.name
            }
          })
          cb(this.cities.filter(item => item.value.indexOf(query)>-1))
        }else{ 
          //如果不是200，处理为[]
          cb([])
        }
      }
    },200),
    handleSelect(item){
      //美团官网是选中后跳转
      console.log(item.value)
    }
  },

  components: {},

  computed: {},
  watch:{
    pvalue:async function(newPvalue){
      let {status,data:{city}} = await this.$axios.get(`/geo/province/${newPvalue}`)
      if(status==200){
        this.city=city.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
        this.cvalue = ''
      }
    }
  }
}

</script>
<style lang='scss' >
@import '@/assets/css/changeCity/iselect.scss';
</style>