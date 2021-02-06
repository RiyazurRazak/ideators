import {useState } from 'react';
import styles from '../../styles/Idea.module.css';

import Axios from 'axios';

import {useRouter} from 'next/router';

import {useSelector, useDispatch} from 'react-redux';
import {user} from '../../actions/index';
import cookie from 'cookie';

import { base } from '../../Utils/baseUrl';
import Meta from '../../components/Meta';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import LikeIco from '@material-ui/icons/FavoriteTwoTone';

import parser from 'html-react-parser';




function Idea({idea, isAuthunticated}) {

    const [content , setContent] = useState("<h3>Loading...</h3>")

    const dispatch = useDispatch()

    
    const loggedUser = useSelector(state => state['userReducer'])

    if(isAuthunticated && loggedUser == null){
      dispatch(user(isAuthunticated))
    }

    const router = useRouter()
    const {slug} = router.query

    let isApproved;



      if(loggedUser){
        if(idea.visibleTo.includes(loggedUser.username)){
          isApproved = true
        }
      }

      const likeHandller = async()=>{
        const res = await Axios.get(`/api/like?id=${slug}`)

        const data = await res.data
        
        if(data.isUpdated) alert("You Liked This Idea!! ❤❤")
        else alert("Something Wrong 😢 Try Again")
      }
        



    if(isApproved){
      Axios.get(`/api/getProtectedContent?id=${slug}`).then((res)=>{
        setContent(res.data.content)
      })
    }

    
    return (
        <div>
             <Meta 
              title={idea.title}
              description={idea.description}
              author={idea.author}
             />

             <h1 className={styles.title}>{idea.title}</h1>

             <img className={styles.image} src={idea.imageUrl} alt={idea.title} loading="lazy" />
             
             <h4>{`Author :  ${idea.author}`}</h4>

             <div className={styles.like_container}>
               <Badge badgeContent={idea.likes} overlap="circle" max={99} color="secondary">
                 <IconButton color="secondary" onClick={likeHandller}>
                   <LikeIco fontSize="large" className={styles.likeIco} />
                 </IconButton>
               </Badge>

             </div>

             <h3 className={styles.title}>Concept Of Idea</h3>

             <p className={styles.desc}>{idea.abstract}</p>

             <h3 className={styles.title}>Brief Explanation</h3>

             {isApproved ? 
             <div>
               {parser(content)}
             </div>
             :
             <div className={styles.protected_container}>
               <img className={styles.lock_img} src="https://res.cloudinary.com/dqf7aonc2/image/upload/v1612174790/1491253404-15document-lock_82886_trh2gb.png" alt="locked_content" />
               <h2>Contact Author To Aprove You To Read This!</h2>
               <h4>{`Mail ID : ${idea.contact}`}</h4>
             </div>}

             
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
  
     const res = await Axios.get(`${base}/api/idea?id=${ctx.params.slug}`)

     const data = await res.data


     if(data.isNull){
       return{
          redirect :{
             destination : "/404",
             permanent: false
          }
        }
     }

  return {
    props: {
      idea :{
        title: data.title,
        description: data.description,
        author: data.author,
        visibleTo : data.visibleTo,
        abstract : data.abstract,
        contact : data.contact,
        imageUrl : data.imageUrl,
        likes : data.likes
      },
      isAuthunticated
    }
  }

}else{
  return{
    redirect :{
      destination : "/login",
      permanent: false
    }
  }
}
}

export default Idea
