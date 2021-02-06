import styles from '../styles/Footer.module.css';

import IconButton from '@material-ui/core/IconButton';

import FacebookIco from '@material-ui/icons/Facebook';
import TwitterIco from '@material-ui/icons/Twitter';
import PinterestIco from '@material-ui/icons/Pinterest';
import EmailIco from '@material-ui/icons/EmailTwoTone';
import { useEffect, useRef } from 'react';

function Footer({fun}) {

    const footer = useRef()

    useEffect(()=>{
        fun(footer.current && footer.current.offsetTop)
    })
  
    return (
        <div ref={footer} id="footer" className={styles.root}>
           <div className={styles.col_1}>
              <IconButton className={styles.icons}><FacebookIco /></IconButton>
              <IconButton className={styles.icons}><TwitterIco /></IconButton> 
              <IconButton className={styles.icons}><PinterestIco /></IconButton> 
              <IconButton className={styles.icons}><EmailIco /></IconButton> 
              <br />
              <ul className={styles.ul}>
                  <li><a href="#">Terms & Conditions</a></li>
                  <li><a href="#">Policy</a></li>
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Code Of Conduct</a></li>
                  <li><a href="#">Help</a></li>
              </ul>
           </div>
           <div className={styles.col_2}>
               <p>Designed & Developed By Riyazur Razak</p>
               <br />
               <p>Made With ❤ By React JS</p>
           </div>
        </div>
    )
}

export default Footer
