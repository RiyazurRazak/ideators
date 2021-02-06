import { useState } from 'react';
import styles from '../../styles/NewIdea.module.css';

import Axios from 'axios';

import { base } from '../../Utils/baseUrl';

import {useSelector, useDispatch} from 'react-redux';
import {user} from '../../actions/index';
import cookie from 'cookie';

import Alert from '@material-ui/lab/Alert';
import {Editor} from '@tinymce/tinymce-react';
import { Button, InputBase } from '@material-ui/core';

import Loading from '../../components/Loading';
import Meta from '../../components/Meta';



function NewIdea({isAuthunticated}) {

    const [title, setTitle] = useState("")
    const [abstract, setAbstract] = useState("")
    const [document, setDocument] = useState('')
    const [image , setImage] = useState(null)
    const [loading , setIsLoading] = useState(false)


    const dispatch = useDispatch()

    
    const loggedUser = useSelector(state => state['userReducer'])

    if(isAuthunticated && loggedUser == null){
      dispatch(user(isAuthunticated))
    }


    const uploadImageHandller = (e)=>{
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = ()=>{
          setImage(reader.result)
      }
    }

    const validate = ()=>{
      if(title.length > 0 && abstract.length > 0 && document.length > 0 && image != null){
        return {
          isReady : true,
          body: {
            title,
            description : abstract.slice(0, 147) + "...",
            abstract,
            content: document,
            image : image,
            author : loggedUser.name,
            createdAt : new Date().toLocaleString(),
            createdBy : loggedUser.username,
            contact : loggedUser.email,
          }
        }
      }
      else{
        return false
      }
    }
    
    const submitHandller = async()=>{

        setIsLoading(true)

        const {isReady, body} = validate()
        if(isReady){
           const res = await Axios.post("/api/newPost" , body)

           const data = await res.data


           if(data.isUpload){
             setIsLoading(false)
             alert("Hurray!! Post Successfully Published. We Hope You Can Find Your Inversor Very Early 😊")
           }
           else{
             alert("Something Wrong. Try After Some Minutes")
             setIsLoading(false)
           }
        }
        else{
          alert("Some Fields Are Missing")
          setIsLoading(false)
        }
    }


    return (
        <div>
            
            <Meta 
              title={"Create New Idea"}
            />
            <h1 className={styles.heading}>Create New Idea..</h1>

            <InputBase  className={styles.textfield}  placeholder="Title Of Your Idea" fullWidth onChange={(e)=>setTitle(e.target.value)} value={title} />

            <Alert severity="warning" className={styles.alert+ " "+styles.alert_warning}>Don't Write Your Whole Idea Concept && Your Core Concepts. This Is Visible In Publicly To All </Alert>

            <InputBase   placeholder="Your Idea Abstract" className={styles.textfield}  fullWidth multiline  rowsMax={3} onChange={(e)=>setAbstract(e.target.value)} value={abstract} />  

            <Alert severity="info" className={styles.alert + " " + styles.alert_info}>You Can Briefly Explain Your Idea Here. It Will Be Shown To Users Only You Accept It. You Can Controll The Visibility In Dashboard</Alert>

            <Editor
              apiKey="g9gj0vsn96wub7qjpiryc13ejdnsqux58qk49om8mfne4132"
              id="editor"
              className={styles.editor}
              initialValue={document}
              init={{
                height: 500,
                menubar: true,
                plugins: ['advlist autolink lists link image charmap print preview anchor',
                 'searchreplace visualblocks code fullscreen',
                 'insertdatetime media table paste code help wordcount', ],
                toolbar:
                 'undo redo | formatselect |visualblocks |link | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help | media |image | |',
                 menubar: "file insert view "
              }}
              textareaName="texteditor"
              onEditorChange={(e)=> setDocument(e)}
            />  

            <div className={styles.input_container}>
               <input id="contained-button-file" accept="image/*" className={styles.input} type="file" onChange={uploadImageHandller}  />
               <label htmlFor="contained-button-file">
                 <Button variant="contained" color="secondary" component="span">Upload Image</Button>
               </label>
               <br />
               {image && <img src={image} className={styles.preview_img} alt="preview-img"  />}
            </div>

            <Button variant="contained" className={styles.submit} onClick={submitHandller}>Post Your Idea</Button>


            <Loading isLoading={loading} />
         


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
      return{
        props:{
          isAuthunticated,
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

export default NewIdea
