import db from '../../Utils/db' 

import Post from '../../Models/Post'



export default async (req, res)=>{

    const id= req.body.id
    const username = req.body.user

    db();

    Post.updateOne({_id: id} , {
        $push:{
            visibleTo : username,
    } 
    },(err)=>{
        if(err) {
            console.log(err)
            res.status(500).json({isUpdated : false})
            res.end()
        }
        res.status(200).json({isUpdated : true})
        res.end()
    })
}

