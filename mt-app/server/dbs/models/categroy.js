import mongoose from 'mongoose'
const Schema = mongoose.Schema
// Schema里边的内容写与不写都可以查询到，但最好是要写上
// const PoiSchema = new Schema({

// })
const CategroySchema = new Schema({
  city: {
    type: String//景点名
  },
  types:{
    type:Array,
    require:true
  },
  areas:{
    type:Array,
    require:true
  }
})
export default mongoose.model('Categroy',CategroySchema)