const { Schema } = require('mongoose')
const mongoose=require('mongoose')
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }

},{timestamps:true})
 const Blog=mongoose.model('blog',blogSchema)

 module.exports={Blog}