<template>
  <div :id="id" :style="{width:width+'px',height:height+'px',margin:'34px auto'}" class="m-map">

  </div>
</template>

<script>
export default {
  props: {
    width: {
      type:Number,
      default:300
    },
    height: {
      type:Number,
      default:300
    },
    point: {
      type:Array,
      default(){
        return [116.46,39.92]
      }
    }
  },
  data(){
    return {
      id: `map`,
      key: '8cbaff2a3de97b42ee1382fdc7918965'
    }
  },
  created(){},
  mounted(){
    let self = this
    //初始化地图的时候，在生成id，不然名字对应不上
    self.id = `map${Math.random().toString().slice(4,6)}`


    
    window.onmaploaded = () =>{
      //  1 初始化地图实例
      var map = new AMap.Map(self.id,{
      resizeEnable: true ,  //是否监控地图容器尺寸变化，默认值为false
      zoom: 10,  //设置地图显示的缩放级别
      center: self.point,//设置地图中心点坐标
      });
      self.map = map

      //2 创建maker
      var marker = new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point,   // 点标记在地图上显示的位置，默认为地图中心点
      });

      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
      self.marker = marker


      // 3  加载工具条插件
      map.plugin(["AMap.ToolBar"],function(){
        //加载工具条
        var tool = new AMap.ToolBar();
        map.addControl(tool);    
      });
    }

    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
  methods:{},
  computed:{},
  components:{},
  watch:{
    point(val,old){
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  }
}
</script>
<style lang="scss">

</style>