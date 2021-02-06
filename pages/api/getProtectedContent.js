import db from '../../Utils/db' 

import Post from '../../Models/Post'


export default async(req, res)=>{

    const {id} = req.query

    db();

    Post.findOne({_id : id},"content" ,(err, doc)=>{
        if(err) return res.status(500).send(false)
        res.status(200).json(doc)
    })

}