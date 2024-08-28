"use client"

import { useEffect, useState } from "react"
import PostCard from "../components/postCard/postCard"
import styles from "./blog.module.css"
import { getPosts } from "../../../server/data"

function BlogPage(){

    const [data , setData] = useState()

    //in next di default tutti i dati fetchati sono chachati, per poter prevenire questo comportamento possiamo specificare
    //nel fetch {cache : "no-store"}, come secondo argomento

    async function getData(){
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts' , {cache : "no-store"})
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
            {data && data.map((item) => {
                return (<div className={styles.post} key={item.id}>
                    <PostCard post={item}/>
                </div>
            )})}
        </div>
    )
}

export default BlogPage