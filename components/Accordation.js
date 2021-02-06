import { useState } from 'react';
import styles from '../styles/Accordation.module.css';

import Axios from 'axios';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { InputBase } from '@material-ui/core';

import Loading from './Loading';


function Accordation({idea}) {

    const [newUsers, setNewUsers] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const addUsersHandller = async (e)=>{
        if(e.key == 'Enter'){

          setIsLoading(true)

          const res = await Axios.post("/api/addUsers", {id: idea._id, user: newUsers})

          const data = await res.data

          if(data.isUpdated){
            alert("Updated Successfull")
            setIsLoading(false)
          }
          else{
            alert("Not Updated Try Again")
            setIsLoading(false)
          }
        }

    }



    return (
        <>
          <Accordion  className={styles.accord}>
             <AccordionSummary expandIcon={<ExpandMoreIcon className={styles.icon} />} aria-controls="panel1a-content" id="panel1a-header">{idea.title}</AccordionSummary>
             <AccordionDetails>
               <div className={styles.details_container}>
                 <h4>Who Are Allowed to Your Protected Content :</h4>
                 <p>{idea.visibleTo.length != 0 ? idea.visibleTo.toString() : "No Users"}</p>
                 <br />
                 <InputBase className={styles.input} fullWidth placeholder="Add User by typing their username and Enter" onChange={(e)=>setNewUsers(e.target.value)} value={newUsers} onKeyUp={addUsersHandller}/>
               </div>

             </AccordionDetails>
          </Accordion>

          <Loading isLoading={isLoading} />
        </>
    )
}

export default Accordation
