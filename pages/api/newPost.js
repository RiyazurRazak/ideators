import db from '../../Utils/db' 

import Post from '../../Models/Post'

import cloudinary from 'cloudinary'


cloudinary.config({
    cloud_name: "ddjddflnh",
    api_key: "864525559257271",
    api_secret: "ujDaRla9EeoYmZ1jEPyTcwYabrg",
});

 export default async (req, res)=>{
    
    const {title, description, abstract, content, image, author, createdAt, createdBy, contact} = req.body

    db();


    const cloudURI =  await cloudinary.v2.uploader.upload(image , (err , result)=>{
            if(err) return "https://i.stack.imgur.com/y9DpT.jpg"
            else return result
    })

    
    const post = new Post({
        title,
        description,
        abstract,
        content,
        contact,
        createdAt,
        likes : 0,
        createdBy,
        author,
        imageUrl : cloudURI.secure_url,
     
    })

    post.save((err)=>{
        if(err){
            console.log(err)
            res.status(500)
            return 
        }
        else{
            res.status(200).json({isUpload: true})
        }
    })

 }