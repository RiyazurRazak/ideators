import db from '../../Utils/db' 

import Post from '../../Models/Post'



export default async (req, res)=>{

    db();

    Post.find({}).sort({createdAt: -1}).exec((err, docs)=>{
        if(err) console.log(err)
        res.status(200).send(docs)
    })
}