<template>
  <div class="page-changeCity">
    <el-row>
      <el-col>
        <i-select/>
      </el-col>
    </el-row>
     <el-row>
      <el-col>
        <Hot/>
      </el-col>
    </el-row>
     <el-row>
      <el-col>
        <categroy/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import Hot from '@/components/changeCity/hot.vue'
import Categroy from '@/components/changeCity/categroy.vue'
export default {
  props: [],

  data () {
    return {

    };
  },

  created(){},

  methods: {},

  components: {
    iSelect,
    Hot,
    Categroy
  },

  computed: {}
}

</script>
<style lang='scss' >

</style>