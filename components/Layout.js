import { useState } from 'react'
import Sticky from 'react-stickynode'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'
import Meta from './Meta'
import NavBar from './NavBar'
import UpperNav from './UpperNav'


import { wrapper } from "../store/store";
import BottomNav from './BottomNav'



function Layout({children}) {

  const [offset , setOffSet]=useState(1052)


  const getOffSet = (value)=>{
          setOffSet(value-20)
  }
  

    return (
      <>
          <Meta />
          <div className={styles.root}>
            <div className={styles.center_layout}>
              <div className={styles.nav_container}>
               <Sticky enabled={true} top={80} bottomBoundary={offset}>
                 <nav className={styles.nav}>
                  <NavBar />
                </nav>
               </Sticky>
             </div>
             <main className={styles.main}>
               <UpperNav />
               {children}
             </main>
            </div>
            <Footer 
              fun={getOffSet}
            /> 
            <div className={styles.bottom_nav}>
              <BottomNav />
            </div>
            
          </div>
    
      </>
    )
}

export default wrapper.withRedux(Layout);
