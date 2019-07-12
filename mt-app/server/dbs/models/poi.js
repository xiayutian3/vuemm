import mongoose from 'mongoose'
const Schema = mongoose.Schema
// Schema里边的内容写与不写都可以查询到，但最好是要写上
// const PoiSchema = new Schema({

// })
const PoiSchema = new Schema({
  name: {
    type: String//景点名
  },
  province: {
    type: String
  },
  city:{
    type:String
  },
  county:{
    type:String
  },
  areaCode:{
    type:String
  },
  tel:{
    type:String
  },
  area:{
    type:String
  },
  addr:{
    type:String
  },
  type:{
    type:String
  },
  module:{
    type:String
  },
  longitude:{     //经度
    type:Number
  },
  latitude:{     //纬度
    type:Number
  }
})
export default mongoose.model('Poi',PoiSchema)