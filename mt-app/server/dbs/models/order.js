import mongoose from 'mongoose'
const Schema = mongoose.Schema
// Schema里边的内容写与不写都可以查询到，但最好是要写上
// const PoiSchema = new Schema({

// })


//**** 订单   */
const OrderSchema = new Schema({
  id: {
    type: String,
    require: true
  },
  user:{
    type:String,
    require:true
  },
  time:{
    type:String,
    require:true
  },
  total:{
    type:Number,
    require:true
  },
  imgs:{
    type:Array,
    require:true
  },
  name:{
    type:String,
    require:true
  },
  status:{
    type:Number,
    require:true
  }
})
export default mongoose.model('Order',OrderSchema)