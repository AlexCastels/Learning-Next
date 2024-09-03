import { getPosts } from "@/server/data"
import styles from "./adminPost.module.css"
import Image from "next/image"
import { deletePost } from "@/server/action"

async function AdminPost(){
    
    // const posts = await getPosts()

    //fake data per vedere graficamente il risultato, bisogna sistemare prima il server
    const posts = [
        {
            id : 1,
            title : "Post 1",
        } ,
        {   id : 2,
            title : "Post 2",
        }
    ]

    async function deletePostWithId(id){
        "use server"
        return deletePost.bind(null , id)
    }
    //in action deletePost richiede neccessariamente un id per matchare il post da cancellare, abbiamo due alternative
    //la prima è inserire un input e recuperare il suo valore, la seconda è creare una funzione che al click
    //mandi l'id alla funzione deletePost in action, nell'input forziamo il passaggio dell'id, perche viene recuperato
    //direttamente dal formData della funzione, ed il suo value è  definito con post.id

    return (
        <div>
            <h2>Posts</h2>
            {posts.map((post) => (
                <div className={styles.post} key={post.id}>
                    <div>
                        <Image src={post.img || "/noAvatar.png"} alt="" width={50} height={50}></Image>
                        <span className={styles.postTitle}>{post.title}</span>
                    </div>
                    <form action={deletePostWithId}>
                        <input type="hidden" name="id" value={post.id}/> 
                        <button className={styles.postButton}>Delete</button>
                    </form>
                </div>
            ))}
        </div>
    )
}

export default AdminPost