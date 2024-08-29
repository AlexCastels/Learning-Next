"use server"
// "use server" nel caso in cui si abbiano più action, piuttosto che specificare use server all'interno di ognuna di esse
//è possibile indicarlo in cima

import { revalidatePath } from "next/cache";
import connectToDb, { Post } from "./models";
import { signOut } from "./auth";



export const addPost = async (data) => {
    // "use server"
    //tramite .get ed il name specifico dell'input possiamo salvare in una var il valore di quell'input
    //dentro la funzione l'arg rispecchia i dati provenienti dal form dov'è specificata la action
    //utilizziamo Object.fromEntries(data) per poter destrutturare data e poter ottenere il valore
    //con i dati ottenuti dunque possiamo creare un nuovo modello di post, definito in models
    //tramite il metodo .save() possiamo salvarlo nel nostro DB
    //questo è un esempio , il modello ha dei parametri richiesti che non sono stati inseriti
    //utilizziamo revalidatePath() per poter refreshare e poter vedere il contenuto aggiunto,
    //i dati vengono cashati ma next non refresha in tempo reale, dunque forziamo la cosa tramite la action

    // const name = data.get("title")
    // const desc = data.get("desc")
    // const id = data.get("id")
    // console.log(name,desc,id);

    const {title , desc , id} = Object.fromEntries(data)
    
    try {
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            id
        })

        await newPost.save()
        console.log("ok! Save to DB");
        revalidatePath("/blog")
    } catch (error) {
        console.log(error);
    }
}

export async function deletePost(data){
    // "use server"
    const {id} = Object.fromEntries(data)
    try {
        connectToDb()
        await Post.findByIdAndDelete(id);
        console.log("Post deleted!");
        revalidatePath("/blog")
    } catch (error) {
        console.log(error);
    }
}

export async function handleLogout(){
    await signOut()
}