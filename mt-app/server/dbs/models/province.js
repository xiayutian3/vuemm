import mongoose from 'mongoose'
const Schema = mongoose.Schema
//里边有值，查的出来 （推荐）
// const ProvinceSchema = new Schema({
//   id:{
//     type:String,
//     require:true
//   },
//   value:{
//     type:String,
//     require:true
//   }
// })

//也可以不写里边的值，也可以查的出来
const ProvinceSchema = new Schema({

})

export default mongoose.model('Province',ProvinceSchema)