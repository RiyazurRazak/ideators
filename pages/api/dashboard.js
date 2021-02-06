import db from '../../Utils/db' 

import Post from '../../Models/Post'


export default async (req, res)=>{

    const {username} = req.query
    db();

    Post.find({createdBy : username} ,"title , visibleTo ").sort({createdAt: -1}).exec((err, docs)=>{
        if(err){
         res.status(500)
         console.log(err)
        } 
        res.status(200).json(docs)
    })
}

