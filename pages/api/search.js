import db from '../../Utils/db' 

import Post from '../../Models/Post'


export default async (req, res)=>{

    const {searchQuery} = req.query

    db();

    Post.find({"title" : { "$regex": new RegExp(searchQuery) , "$options": 'i'}},"title author description", (err , docs)=>{
        if(err) return res.status(500).json({})

        res.status(200).json(docs)
    })

}