import { useEffect, useState } from "react";
import styles from "./postUser.module.css";

function PostUser({userID}){

    const [user , setUser] = useState([])

    async function getData(){
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}` , {cache : "no-store"})
            const data = await res.json()
            setUser(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    } , [userID])

    //useEffect avvia la funzione o quando viene montato il componente, o quando tramite l'array di dipendenze viene puntata
    //variabile che può essere aggiornata nel tempo, siccome tutto il passaggio dell'id dell'utente dalla blog page è async
    //il fetch parte come prima cosa e non riesce a pescare userID, dunque puntantolo tramite le [] aspettiamo prima che 
    //la variabile venga riempita e poi avviamo il fetch per poter recuperare il nome dell'utente

    return (
        <div className={styles.container}>
            <span className={styles.title}>Author</span>
            <span className={styles.username}>{user.name}</span>
        </div>
    );
}

export default PostUser;
