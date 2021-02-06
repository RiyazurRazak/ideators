
import styles from '../styles/UpperNav.module.css'

import md5 from 'md5'

import {useSelector} from 'react-redux'


function UpperNav() {


    const loggedUser = useSelector(state => state['userReducer'])
    let name;
    let avatar;


    if(loggedUser){
        avatar = `https://s.gravatar.com/avatar/${md5(loggedUser.email)}?s=40;`;
        name = loggedUser.name;
    }


    return (
        <div className={styles.root}>
            <p className={styles.text}>{`Welcome ${name ? name : "You Are Not Logged In"}`}</p>
            <div className={styles.avatar}>
                <img className={styles.img} src={avatar ? avatar : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt="avatar"   />
            </div>
        </div>
    )
}

export default UpperNav
