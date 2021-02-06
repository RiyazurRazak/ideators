import db from '../../Utils/db'

import User from '../../Models/User'

import bcrypt from 'bcrypt'

import jwt from '../../Utils/jwt'

import cookie from 'cookie'



export default async (req, res)=>{
    const {username, password} = req.body;

    db();

    User.findOne({username}).then((user)=>{
        if(!user){
            res.json({isNoUser: true, message: "No Account Is Find On This Username"})
            return 
        }

        bcrypt.compare(password , user.password, (err, isMatch)=>{
            if(err){
                res.status(500).json({isErr: true, message: "Try Again Later"})
                return
            }
            else if(isMatch){
                const token = jwt({user: user.username})

                res.setHeader('Set-Cookie', cookie.serialize('ideators', token, {
                    httpOnly: true,
                    secure : process.env.NODE_ENV != "development",
                    sameSite : 'strict' ,
                    maxAge: 172800,
                    path: '/'
                  }))
                return res.status(200).json({
                    username: user.username,
                    name : user.name,
                    email : user.email,
                })
            }
            else{
              res.status(401).json({isInvalidPaaword : true, message: "Your Password is invalid to the username"})
              return
            }
        })

    })



}