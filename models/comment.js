const mongoose=require('mongoose')
const { Schema } = require('mongoose')
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    blogID:{
        type:Schema.Types.ObjectId,
        ref:"blog"
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const Comment=mongoose.model('comment',commentSchema)

 module.exports={Comment}