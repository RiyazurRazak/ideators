import { useState } from "react";
import styles from '../styles/Ideas.module.css'

import Axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import {user} from '../actions/index';
import cookie from 'cookie';

import { base } from "../Utils/baseUrl";

import Pagination from '@material-ui/lab/Pagination';

import Card from "../components/Card";



function Ideas({data , isAuthunticated}) {
    
    const PER_PAGE = 5;

    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch()

    const loggedUser = useSelector(state => state['userReducer'])
  
    if(isAuthunticated && loggedUser == null){
      dispatch(user(isAuthunticated))
    }

    
    
    const indexOfLastPost = currentPage * PER_PAGE
    const indexOfFirstPost = indexOfLastPost - PER_PAGE
    const currentPageIdeas = data.slice(indexOfFirstPost , indexOfLastPost)

    const totalPages = Math.ceil(data.length / PER_PAGE)


    const changePageHandller = (e, value)=>{
      setCurrentPage(value)
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    return (
        <>
            {currentPageIdeas.map((idea, index)=>{
                return(
                    <Card key={index} 
                     idea={idea}
                    />
                )
            })}

            <Pagination className={styles.numbers} count={totalPages}  color="secondary" onChange={changePageHandller} />

       
        </>
    )
}

export async function getServerSideProps(ctx){

    const {ideators} = cookie.parse(ctx.req.headers.cookie || "")

    const auth = await Axios.get(`${base}/api/verifyToken` , {
        headers:{
          authorization : 'Bearer ' +  ideators
        }})

    const res = await Axios.get(`${base}/api/ideas`)    
    
        
    
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
        return{
            props :{
                data
            }
        }
      }
   
}

export default Ideas
