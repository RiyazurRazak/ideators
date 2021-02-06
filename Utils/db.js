import mongoose from 'mongoose'

function initDB(){
    if(mongoose.connections[0].readyState){
        console.log("alredy connected")
        return
    }
    mongoose.connect("mongodb+srv://riyazurrazak:7EmAp0vfLGUxka6z@cluster0.0wtpv.mongodb.net/ideators?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex: true
    })
    mongoose.connection.on('connected',()=>{
        console.log("connected to mongo")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("error connecting",err)
    })
}


export default initDB