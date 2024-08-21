import Image from "next/image"
import styles from "./postCards.module.css"
import Link from "next/link"

function PostCard({post}){
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src="https://images.pexels.com/photos/10647646/pexels-photo-10647646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="post img" fill className={styles.img}/>
                </div>
                <span className={styles.date}>011.01.2024</span>
            </div>
            <div className={styles.bottom}>
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.desc}>{post.body}</p>
                <Link className={styles.link} href={`/blog/${post.id}`}>READ MORE</Link>
            </div>
        </div>
    )
}

export default PostCard