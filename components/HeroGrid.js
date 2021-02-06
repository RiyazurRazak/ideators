import styles from '../styles/HeroGrid.module.css'

import Link from 'next/link'

import Grid from '@material-ui/core/Grid';

function HeroGrid({ideas}) {
 return (
     
    <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
         <Link href={`/idea/${ideas[0]._id}`}>
           <div className={styles.img_container}>
             <img className={styles.g_img + " " + styles.g1_img} src={ideas[0].imageUrl} loading="eager" alt={ideas[0].title} />
             <div className={styles.textBlock}>
              <h4>{ideas[0].title}</h4>
              <p>Click To Explore</p>
            </div>
           </div>
         </Link>   
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Link href={`/idea/${ideas[1]._id}`}>
          <div className={styles.img_container}>
             <img className={styles.g_img + " " +styles.g2_img} src={ideas[1].imageUrl} loading="eager" alt={ideas[1].title} />
             <div className={styles.textBlock}>
              <h4>{ideas[1].title}</h4>
              <p>Click To Explore</p>
             </div>
          </div>
          </Link>

          <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Link href={`/idea/${ideas[2]._id}`}>
                  <div className={styles.img_container}>
                     <img className={styles.g_img + " " +styles.g3_img} src={ideas[2].imageUrl} loading="eager" alt={ideas[2].title} />
                     <div className={styles.textBlock}>
                       <h4>{ideas[2].title}</h4>
                       <p>Click To Explore</p>
                     </div>
                  </div>
                </Link>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Link href={`/idea/${ideas[3]._id}`}>
                  <div className={styles.img_container}>
                    <img className={styles.g_img + " " +styles.g3_img} src={ideas[3].imageUrl} loading="eager" alt={ideas[3].title} />
                    <div className={styles.textBlock}>
                       <h4>{ideas[3].title}</h4>
                       <p>Click To Explore</p>
                    </div>
                  </div>
                </Link>
              </Grid>
          </Grid>
        </Grid>

    </Grid>
            
       
    )
}

export default HeroGrid
