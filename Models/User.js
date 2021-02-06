import mongoose from 'mongoose'

const newUser = mongoose.Schema({
    username: {
        type: String, 
        required:true, 
        unique:true
    }, 
    name:{
        type: String, 
        required: true
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
})


export default  mongoose.models.User || mongoose.model("User", newUser)