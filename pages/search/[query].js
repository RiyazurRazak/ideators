import Axios from 'axios';
import {useRouter} from 'next/router';

import { base } from '../../Utils/baseUrl';

import {useSelector, useDispatch} from 'react-redux';
import {user} from '../../actions/index';
import cookie from 'cookie';

import Card from '../../components/Card';
import Meta from '../../components/Meta';


function search({data , isAuthunticated}) {


    const loggedUser = useSelector(state => state['userReducer'])

    const dispatch = useDispatch()

    if(isAuthunticated && loggedUser == null){
      dispatch(user(isAuthunticated))
    } 

    const router = useRouter()
    const {query} = router.query

    


    return (
        <div>

            <Meta 
              title={`Search for ${query}`}
            />
            <h1>Search Results For {query}</h1>

            {
                data.map((idea, index)=>{
                    return(
                        <Card 
                          key={index}
                          idea={idea}
                        />
                    )
                })
            }
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

    const query = ctx.params.query;

    const res = await Axios.get(`${base}/api/search?searchQuery=${query}`)

    const data = await res.data

    return{
        props:{
            data,
            isAuthunticated
        }
    }




}

export default search
