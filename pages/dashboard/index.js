
import Axios from "axios";

import { base } from '../../Utils/baseUrl'

import {useSelector, useDispatch} from 'react-redux'
import {user} from '../../actions/index'
import cookie from 'cookie'

import Accordation from "../../components/Accordation";
import Meta from "../../components/Meta";




function Dashboard({data, isAuthunticated}) {

    
    const dispatch = useDispatch()

    
    const loggedUser = useSelector(state => state['userReducer'])

    if(isAuthunticated && loggedUser == null){
      dispatch(user(isAuthunticated))
    }


    return (
        <div>
            <Meta 
              title="Dashboard"
            />

            <h1>Visibility Controller</h1>

            {
                data.length > 0 ?
                data.map((idea, index)=>{
                    return(
                        <Accordation 
                          key={index}
                          idea={idea}
                        />
                    )
                })
                :
                <h1>No Ideas. Create One</h1>
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
  
  
      if(isAuthunticated.username){
          const res = await Axios.get(`${base}/api/dashboard?username=${isAuthunticated.username}`)

          const data = await res.data

          return {
              props :{
                  data,
                  isAuthunticated
              }
          }
      }
      else{
        return{
            redirect :{
              destination : "/login",
              permanent: false
            }
          }
      }

}





export default Dashboard
