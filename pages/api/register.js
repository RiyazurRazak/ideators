// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '../../Utils/db'

import User from '../../Models/User'

import bcrypt from 'bcrypt'

import jwt from '../../Utils/jwt'

import cookie from 'cookie'




export default async (req, res) => {

  const {username, name , email, password} = req.body
   db();

  const register = new User({
       username,
       name,
       email,
  })
  bcrypt.genSalt(10 , (err , salt)=>{
      bcrypt.hash(password , salt , (err , hash)=>{
        register.password = hash
        register.save((err)=>{
           if(err){
            if (err.name === 'MongoError' && err.code === 11000) {
              return  res.send({isUserExsisted : true, message: "Username Taken. Try Another Name"})
            }
            else{
                return res.status(500).send({isErr : true, message: "Try Again SomeTime"})
            }
           }
           else{
             const token = jwt({user : username});

             res.setHeader('Set-Cookie', cookie.serialize('ideators', token, {
               httpOnly: true,
               secure : process.env.NODE_ENV != "development",
               sameSite : 'strict' ,
               maxAge: 172800,
               path: '/'
             }))
             res.status(200).json({
                 username,
                 name,
                 email,
             })
           }
        })
      })
  })
}
