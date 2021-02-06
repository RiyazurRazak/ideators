import { useState } from 'react';
import styles from '../styles/Login.module.css';

import Axios from 'axios';
import Router from 'next/router';


import { useDispatch}from 'react-redux';
import {user} from '../actions/index';

import Meta from '../components/Meta';

import { InputBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';


import UserIco from '@material-ui/icons/PersonAdd';
import NameIco from '@material-ui/icons/PermIdentity';
import EmailIco from '@material-ui/icons/EmailTwoTone';
import PassIco from '@material-ui/icons/VpnKey';
import RepeatIco from '@material-ui/icons/LoopTwoTone';



function Register() {

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conformPass, setConformPass] = useState("")

    const dispatch = useDispatch()
  

    const mailFormat = /\S+@\S+\.\S+/



    const registerHandller = ()=>{
        if(username.length >0 && name.length > 0 && email.length > 0 && password.length > 0){
            if(email.match(mailFormat)){
                if(password == conformPass){
                  const data ={
                    username,
                    name,
                    email,
                    password,
                  }
                  createAccountHandller(data)
                }
                else{
                    alert("password not match")
                }
            }
            else{
                alert("invalid Email. Please Enter Valid Email")
            }
          
        }
        else{
            alert("some fields are missing!!")
        }
    }

    const createAccountHandller = async (data)=>{
     const res = await Axios.post("/api/register" , data).then((res))
     
     const resData = await (res.data)

     if(resData.isUserExsisted){
       alert(resData.message)
     }
     else if(resData.isErr){
       alert(resData.message)
     }
     else{
        dispatch(user(resData))
        Router.push("/")
     }
    }


    const keyPressHandller =(e)=>{
      if(e.key == 'Enter'){
        registerHandller()
    }
    }





    return (
        <div className={styles.root}>

          <Meta 
           title="Register"
          />

          <h2>Register</h2>
          
            
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
            placeholder="Your Name" 
            value={name} 
            startAdornment={<NameIco className={styles.ico} />} 
            onChange={(e) => setName(e.target.value)}    
          />

          <br />
          <br />

          <InputBase 
            className={styles.input}  
            placeholder="mail@example.com" 
            value={email} 
            type="email"
            startAdornment={<EmailIco className={styles.ico} />} 
            onChange={(e) => setEmail(e.target.value)}    
          />

          <br />
          <br />


          <InputBase 
            className={styles.input}  
            placeholder="password" 
            value={password} 
            type="password"
            endAdornment={<PassIco className={styles.ico} />} 
            onChange={(e) => setPassword(e.target.value)}    
          />

          <br />
          <br />

          <InputBase 
            className={styles.input}  
            placeholder="Confirm Password" 
            value={conformPass} 
            type="password"
            endAdornment={<RepeatIco className={styles.ico} />} 
            onChange={(e)=>setConformPass(e.target.value)} 
            onKeyUp={keyPressHandller}   
          />


          <br />
          <br />

          <Button color="secondary" onClick={registerHandller}>Register</Button>

        </div>
    )
}




export default Register
