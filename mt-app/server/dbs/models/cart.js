import mongoose from 'mongoose'
const Schema = mongoose.Schema
// Schema里边的内容写与不写都可以查询到，但最好是要写上
// const PoiSchema = new Schema({

// })


//****创建购物车 */
const CartSchema = new Schema({
  id: {
    type: String,
    require: true
  },
  detail:{
    type:Array,
    require:true
  },
  cartNo:{
    type:String,
    require:true
  },
  user:{
    type:String,
    require:true
  },
  time:{
    type:String,  //如果存取的是Date类型。会有时区的概念，东八时区，存字符串就不会有这个问题
    require:true
  }
})
export default mongoose.model('Cart',CartSchema)