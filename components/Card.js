import styles from '../styles/Card.module.css'
import Link from 'next/link'

function Card({idea}) {

    return (
        <div className={styles.root}>
           <h1 className={styles.title}>{idea.title}</h1> 
           <h4 className={styles.author}><span>🧍 </span>{idea.author}</h4>
           <p className={styles.desc}>{idea.description}</p>
           <Link href={`/idea/${idea._id}`}><p className={styles.link}>View More</p></Link>
         
        </div>
    )
}

export default Card
