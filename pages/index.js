import { useState } from 'react';
import styles from '../styles/Home.module.css'

import Axios from 'axios'

import {useSelector, useDispatch} from 'react-redux';
import {user} from '../actions/index';
import cookie from 'cookie';

import { base } from '../Utils/baseUrl';

import HeroGrid from '../components/HeroGrid'

import Player from 'react-player'
import VisibilitySensor from 'react-visibility-sensor'

import Grid from '@material-ui/core/Grid';





 function Home({data, isAuthunticated}) {


  const [isVideoVisible, setIsVideoVisible] = useState(false)

  const dispatch = useDispatch()

    
  const loggedUser = useSelector(state => state['userReducer'])

  if(isAuthunticated && loggedUser == null){
    dispatch(user(isAuthunticated))
  }


  return (

    <>


      <h3 className={styles.heading}>Most Liked Ideas</h3>

      <HeroGrid 
       key={1}
       ideas={data.mostLiked}
      />

      <Grid container className={styles.gd_container} spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <img className={styles.bg_img} src="/ideators-world-map.jpg" loading="lazy" />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
            <h1 className={styles.gd_heading}>Find <span className={styles.spn_inv}>Investors</span> For Your <span className={styles.spn_id}>Idea</span> & Vice Versa</h1>
            <p  className={styles.gd_content}>You Can Post Your Ideas And Investors Who Can Eagerly Waiting For A Person Can Find And You Both Start Your StartUp With The Help Of This Platform</p>
            <h4 className={styles.gd_heading}>Every New Idea Is Impossibility Until It Is Born</h4>
        </Grid>
      </Grid>

      <h3 className={styles.heading}>Most Recent Ideas</h3>
      
      <HeroGrid  
        key={2}
        ideas ={data.recent}
      />

      <div className={styles.video_container}>

        <VisibilitySensor onChange={((isVisible)=> setIsVideoVisible(isVisible))}>
           <Player 
            url="https://res.cloudinary.com/dqf7aonc2/video/upload/v1612442139/video_4_gtegfp.mp4" 
            controls={false} 
            loop={true} 
            playing={isVideoVisible} 
            muted={true} 
            width="90%"
           />
        </VisibilitySensor>

        <h2>Get An Idea! 🤔</h2>
        <h3>Why Are You Waiting!! Register Now And Post Your Idea</h3>

      </div>
    

      <h3 className={styles.heading}>Ideas Picked For You</h3>
      
      <HeroGrid 
       key={3}
       ideas={data.random}
      />


      <h3 className={styles.heading}>More Ideas In Ideas Page.......</h3>

    

    </>
  )
}


export async function getServerSideProps(ctx){

  const {ideators} = cookie.parse(ctx.req.headers.cookie || "")


  const auth = await Axios.get(`${base}/api/verifyToken` , {
    headers:{
      authorization : 'Bearer ' +  ideators
    }})

  const res = await Axios.get(`${base}/api/home`)
  
  

  const isAuthunticated = await auth.data

  const data = await res.data


  if(isAuthunticated.username){
      return{
        props:{
           data,
           isAuthunticated
        }
      }
  }
  else{
    return {
      props: {
        data
      }
    }
  }

}


export default Home
