import Image from "next/image"
import styles from "./singlePost.module.css"

function SinglePost(){
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image fill className={styles.img} src="https://images.pexels.com/photos/10647646/pexels-photo-10647646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="post img"></Image>
            </div>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>Title</h2>
                <div className={styles.detail}>
                    <Image className={styles.avatar} src="/avatar.png" alt="avatar img" height={50} width={50}></Image>
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Author</span>
                        <span className={styles.detailValue}>Alex Castel</span>
                    </div>
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>01.01.2024</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi rem molestias deleniti at vero minima commodi fugiat voluptas aut laboriosam, animi totam sed iure repellendus. Delectus aliquid mollitia eos natus.
                        Impedit qui similique expedita. Corporis, adipisci! Fugit culpa tempore praesentium dolorum adipisci eius aperiam sequi eveniet earum quo. Vitae incidunt soluta accusantium neque mollitia culpa veritatis dolorum minus repudiandae. Assumenda.
                        Delectus deleniti accusamus ex voluptatum, laudantium qui distinctio libero eos amet cupiditate error, eaque officiis hic ducimus cumque fugit molestiae iste impedit ea maiores magni dolorum necessitatibus! Veniam, suscipit minus.
                        Laudantium aperiam hic quas ipsam atque fugit excepturi animi aut? Vel similique architecto quibusdam, consectetur nisi fuga eveniet consequuntur id. Assumenda odio accusamus sapiente. Soluta similique.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SinglePost

//Tramite le [] possiamo rendere dinamica la ricerca di una pagina nested, in questo esempio dei post generici che prenderanno
//la ricerca per titoli diversi, in altre situiazioni sarebbe stato l'id