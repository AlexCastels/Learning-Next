import connectToDb, { Post } from "@/app/server/models";
import { NextResponse } from "next/server";

//in questa maniera invece creiamo un endpoint dinamico che verrà generato in base al'id del singolo post navigato
//all'interno della cartella dinamica con le [] creando il file route.js possiamo estrapolare i params
//che sarà l'arg della func (sempre definita dopo req e res) , e da li possiamo prendere il parametro del post singolo navigato
//http://localhost:3000/api/blog/[id] -> navigato, recupererà dal DB il post corrispondente all'id
//i metodi HTTP cdevono essere specificati come funzioni ed è possibile utilizzarli tutti 
//possiamo anche specificare più metodi all'interno dello stesso endpoint, per poter utilizzare un metodo piuttosto che un altro
//dovrà essere specificato durante la richiesta (fetch)
//es: fetch("http://localhost:3000/api/blog/${id}" , {method: "DELETE"})

export async function GET(req , res , {params}){
    
    const {id} = params

    try {
        connectToDb();
        const post = await Post.findOne({id})
        return NextResponse.json(post)
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch post")
    }
}

export async function DELETE(req , res , {params}){
    
    const {id} = params

    try {
        connectToDb();
        const post = await Post.deleteOne({id})
        return NextResponse.json("Post deleted")
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete post")
    }
}