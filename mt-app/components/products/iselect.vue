<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>{{ name }}<i class="el-icon-caret-bottom el-icon--right"/></dt>
      <dd>
        <h3>{{name}}</h3>
        <span v-for="(item,idx) in list" :key="idx">{{item}}</span>
      </dd> 
    </dl>
  </div>
</template>

<script>
export default {
  props:{
    name:{
      type:String,
      default:''
    },
    list:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
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
<style lang="scss" >
</style>