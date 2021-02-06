import { useState } from 'react'
import styles from '../styles/Login.module.css'

import Router from 'next/router'

import Axios from 'axios'

import { useDispatch }from 'react-redux'
import {user} from '../actions/index'
import cookie from 'cookie';

import { base } from '../Utils/baseUrl';
import Meta from '../components/Meta';

import { InputBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import UserIco from '@material-ui/icons/VerifiedUser';
import PassIco from '@material-ui/icons/VpnKey';






function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

   

    const loginHandller = async()=>{
       if(username.length > 0 && password.length > 0){
           const res = await Axios.post("/api/login", {username, password}).then((res))

           const data = await res.data

           if(data.isNoUser){
               alert(data.message)
           }
           else if(data.isInvalidPaaword){
               alert(data.message)
           }
           else if(data.isErr){
               alert(data.message)
           }
           else{
            dispatch(user(data))
            Router.back()
           }
       }
       else{
           alert("Some Fields Are Missing")
       }
    }

    const keyPressHandller = (e)=>{
        if(e.key == 'Enter'){
            loginHandller()
        }
    }

  
    return (
        <div className={styles.root}>
            <Meta 
            title="Login"
            />
            <h1>Login</h1>
         
            <InputBase 
                className={styles.input}  
                placeholder="username" 
                value={username} 
                startAdornment={<UserIco className={styles.ico} />} 
                onChange={(e) => setUsername(e.target.value)}    
            />

            <br />
            <br />

            <InputBase 
                className={styles.input}  
                placeholder="Password" 
                value={password} 
                endAdornment={<PassIco className={styles.ico} />} 
                type="password"
                onChange={(e) => setPassword(e.target.value)}   
                onKeyUp={keyPressHandller} 
            />

            <br />
            <br />

            <Button color="secondary" onClick={loginHandller}>Login</Button>
            
        </div>
    )
}

export async function getServerSideProps(ctx){

    const {ideators} = cookie.parse(ctx.req.headers.cookie || "")
  
  
    const auth = await Axios.get(`${base}/api/verifyToken` , {
      headers:{
        authorization : 'Bearer ' +  ideators
      }})
    
  
    const isAuthunticated = await auth.data
  
  
    if(isAuthunticated.username){
        return{
            redirect :{
                destination : "/",
                permanent: false
              }
        }
    }
    else {
        return{
            props:{

            }
        }
    }
       
  
  }


export default Login
