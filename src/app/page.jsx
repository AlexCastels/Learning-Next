import Image from "next/image"
import styles from "./home.module.css"

function Homepage(){
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Creative Thoughts Agency.</h1>
                <p className={styles.desc}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Similique corrupti magni aliquam facere nihil dolorem.
                </p>
                <div className={styles.btnContainer}>
                    <button className={styles.btn}>Learn More</button>
                    <button className={styles.btn}>Contact</button>
                </div>
                <div className={styles.brands}>
                    <Image src="/brands.png" alt="brands" fill className={styles.brandsImg}/>
                </div>
            </div>
            <div className={styles.imgContainer}>
                <Image src="/hero.gif" alt="heroImg" unoptimized fill className={styles.heroImg}/>
            </div>
        </div>
    )
}

export default Homepage
