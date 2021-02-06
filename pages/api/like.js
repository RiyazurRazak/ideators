import db from '../../Utils/db' 

import Post from '../../Models/Post'



export default async (req, res)=>{
      const {id} = req.query

      db();

      Post.findOneAndUpdate({_id: id} , {
          $inc :{
              likes : 1,
          }
      }, {
          new : true
      }, (err)=>{
          if(err) return res.status(500).json({isUpdated : false})
          else res.status(200).json({isUpdated : true})
      })
}