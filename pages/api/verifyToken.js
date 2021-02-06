import db from "../../Utils/db" 
import Users from '../../Models/User'

import jwt from 'jsonwebtoken'


export default async (req, res)=>{

    db()

    const authHeader = req.headers['authorization']
    if(authHeader === "Bearer null" || authHeader === "Beared undefined") return res.send({username : null})
     const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.send({username : null})

    jwt.verify(token, "grjaejrg@jfg", (err, user) => {
          if (err) return res.send({username : null})
          
          Users.findOne({username: user.user}).then((user)=>{
              if(!user) return res.status(404).send(null)
              if(user){
                  res.status(200).json({
                      username : user.username,
                      name : user.name,
                      email : user.email
                  })
              }
          })
        })
}
