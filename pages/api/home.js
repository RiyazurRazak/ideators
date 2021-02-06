import db from '../../Utils/db' 

import Post from '../../Models/Post'



export default async (req, res)=>{

    db();

  const likedIdeas = await Post.find({}, "title , imageUrl ").sort({likes: -1}).limit(4)

  const recentIdeas = await Post.find({}, "title , imageUrl ").sort({createdAt: -1}).limit(4)

  const randomIdeas = await Post.aggregate([{$sample : {size: 4}} , {$project : {title: 1 , imageUrl: 1}} ])


   res.status(200).json({mostLiked: likedIdeas, recent: recentIdeas, random : randomIdeas})
}