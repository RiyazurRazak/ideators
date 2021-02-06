import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/NavBar.module.css'

import Button from '@material-ui/core/Button';
import { InputBase } from '@material-ui/core';

import {useSelector} from 'react-redux'


import HomeIco from '@material-ui/icons/HomeTwoTone';
import IdeaIco from '@material-ui/icons/EmojiObjectsRounded';
import AboutIco from '@material-ui/icons/EmojiPeopleRounded';
import LoginIco from '@material-ui/icons/LockOpenRounded';
import CreateIco from '@material-ui/icons/AddRounded';
import DashboardIco from '@material-ui/icons/DashboardTwoTone';
import SearchIco from '@material-ui/icons/YoutubeSearchedFor';
import RegisterIco from '@material-ui/icons/FiberNew';

function NavBar() {
    
    const router = useRouter();
    let isLogin;
    const [search , setSearch] = useState("")


    const loggedUser = useSelector(state => state['userReducer'])

    const inputChangeHandller = (e)=>{
           setSearch(e.target.value)
    }

    const searchHandller = (e)=>{
         if(e.key == "Enter"){
             if(search.length > 0){
                router.push(`/search/${search}`)
                setSearch("")
             }
             else{
                 alert("Type Someting To Search")
             }
         }
    }

    if(loggedUser){
        if(loggedUser.name){
            isLogin = true
        }
    }

    return (
        <div>
            <h2 className={styles.title}>💡 ideators</h2>
            <div className={styles.link_container}>
            <Link href="/"><Button className={styles.btn}  startIcon={<HomeIco />}>Home</Button></Link>
            <br />
            <Link href="/ideas"><Button className={styles.btn}  startIcon={<IdeaIco />}>ideas</Button></Link>
            <br />
            <Link href="/about"><Button className={styles.btn}  startIcon={<AboutIco />}>About</Button></Link>
            <br />
            {
                isLogin ?
                   <>
                     <Link href="/dashboard"><Button className={styles.btn}  startIcon={<DashboardIco />}>Dashboard</Button></Link>
                     <br />
                     <Link href="/dashboard/new-idea"><Button className={styles.btn}  startIcon={<CreateIco />}>Create New Idea</Button></Link>
                     <br />
                   </>
                   :
                   <>
                     <Link href="/login"><Button className={styles.btn}  startIcon={<LoginIco />}>Login</Button></Link>
                     <br />
                     <Link href="/register"><Button className={styles.btn}  startIcon={<RegisterIco />}>Register</Button></Link>
                     <br />

                   </>
               }
               <InputBase 
                className={styles.search}  
                placeholder="Search Ideas..." 
                value={search} 
                startAdornment={<SearchIco className={styles.searchico} />} 
                onChange={inputChangeHandller} 
                onKeyUp={searchHandller} 
               />
            </div>
           
           
        </div>
    )
}

export default NavBar
