import db from '../../Utils/db' 

import Post from '../../Models/Post'


export default async(req, res)=>{

    const {id} = req.query

    db();

    Post.findOne({_id : id}, (err, doc)=>{
        if(err) return res.status(500).json({isNull : true})

        res.status(200).json(doc)
    })

}