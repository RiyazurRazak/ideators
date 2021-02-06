import mongoose from 'mongoose'

const newPost = mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description: {
        type : String,
        required : true,
    },
    abstract : {
        type : String,
        required : true,
    },
    author: {
        type : String,
        required : true,
    },
    createdBy: {
        type : String,
        required : true,
    },
    likes:{
        type : Number,
    },
    imageUrl: {
        type : String,
        required : true,
    },
    content: {
        type : String,
        required : true,
    },
    contact: {
        type: String,
        required : true,
    },
    visibleTo : Array,
    createdAt :{
        type : Date,
        required : true,
    }
})

export default  mongoose.models.Post || mongoose.model("Post", newPost)