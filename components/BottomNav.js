import { useState } from 'react';
import styles from '../styles/NavBar.module.css'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import {useSelector} from 'react-redux'

import Link from 'next/link';

import HomeIco from '@material-ui/icons/HomeTwoTone';
import IdeaIco from '@material-ui/icons/EmojiObjectsRounded';
import LoginIco from '@material-ui/icons/LockOpenRounded';
import CreateIco from '@material-ui/icons/AddRounded';
import DashboardIco from '@material-ui/icons/DashboardTwoTone';
import RegisterIco from '@material-ui/icons/FiberNew';

function BottomNav() {

    const [value, setValue] = useState(0)
    let isLogin;

    const loggedUser = useSelector(state => state['userReducer'])

    if(loggedUser){
        if(loggedUser.name){
            isLogin = true
        }
    }

    return (
        <div>

            <BottomNavigation showLabels value={value} className={styles.bottom_nav_root} onChange={(event, newValue) => setValue(newValue)}>
               <Link href="/"><BottomNavigationAction label="Home" className={styles.bottom_nav_label} icon={<HomeIco className={styles.btn}/>} /></Link>
               <Link href="/ideas"><BottomNavigationAction label="Ideas" className={styles.bottom_nav_label} icon={<IdeaIco className={styles.btn} />} /></Link>
               {isLogin && <Link href="/dashboard"><BottomNavigationAction className={styles.bottom_nav_label} label="Dashboard" icon={<DashboardIco className={styles.btn} />} /></Link>}
               {isLogin && <Link href="/dashboard/new-idea"><BottomNavigationAction className={styles.bottom_nav_label} label="New-Idea" icon={<CreateIco className={styles.btn} />} /></Link>}
               {!isLogin && <Link href="/login"><BottomNavigationAction label="Login" className={styles.bottom_nav_label} icon={<LoginIco className={styles.btn} />} /></Link>}
               {!isLogin && <Link href="/register"><BottomNavigationAction label="Register" className={styles.bottom_nav_label} icon={<RegisterIco className={styles.btn} />} /></Link>}
            </BottomNavigation>
            
        </div>
    )
}

export default BottomNav
