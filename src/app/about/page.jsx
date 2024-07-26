import Image from "next/image"
import styles from "./about.module.css"

function AboutPage(){
    return (
        <div className={styles.imgContainer}>
            <Image src="/about.png" alt="about" width={300} height={300}/>    
        </div>
    )
}

//il comp Image di next richiede obbligatoriamente una width e una height, per poter associare una classe dovremo
//specificare "fill classname={}"

export default AboutPage