"use client"

import Image from "next/image"
import styles from "./singlePost.module.css"
import { Suspense, useEffect, useState } from "react"
import PostUser from "@/app/components/postUser/PostUser"

function SinglePost({params}){

    const [data , setData] = useState([])

    const {id} = params
    //params ritorna un obj con il contenuto del path generico in questo caso [id] che contiene il numero dell'id
    //corrispondente, noi destrutturiamo direttamente questo obj prendendo direttamente il valore di [id] che sarà l'id del
    //post singolo che vogliamo mostrare, questo [id] lo passiamo come argomento del link per renderlo dinamico,
    //un altro modo sarebbe stato quello di non destrutturare params e usare la dot notation -> params.id

    async function getData(){
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}` , {cache : "no-store"})
            const post = await res.json()
            setData(post)
        } catch (error) {
            console.log(error);    
        }
    }

    useEffect(()=>{
        getData()
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image fill  className={styles.img} src="https://images.pexels.com/photos/10647646/pexels-photo-10647646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="post img"></Image>
            </div>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{data.title}</h2>
                <div className={styles.detail}>
                    <Image className={styles.avatar} src="https://images.pexels.com/photos/26347254/pexels-photo-26347254/free-photo-of-bianco-e-nero-uomo-ritratto-giovanotto.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="avatar img" height={50} width={50}></Image>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostUser userID = {data.userId}/>
                    </Suspense>
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>01.01.2024</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <p>{data.body}</p>
                </div>
            </div>
        </div>
    )
}

export default SinglePost

//Tramite le [] possiamo rendere dinamica la ricerca di una pagina nested, in questo esempio dei post generici che prenderanno
//la ricerca per titoli diversi, in altre situiazioni sarebbe stato l'id