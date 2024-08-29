import { Post } from "@/app/server/models";
import connectToDb from "@/app/lib/utils";
import { NextResponse } from "next/server";

//NextResponse.json permette di poter elaborare la richiesta tramite next, visto ceh stiamo creando API attraverso il framework
//in questo caso abbiamo creato l'endpoint http://localhost:3000/api/blog che una volta navigato o fetchato avvierà la funzione
//che si occuperà di recuperare tutti i Post creati nel models.js

export async function GET(req , res){
    try {
        connectToDb();
        const posts = await Post.find()
        return NextResponse.json(posts)
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch posts")
    }
}