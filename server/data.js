import { Post, User } from "./models";
import { connectToDb } from "./utils";

export async function getPosts(){
    try {
        connectToDb();
        const posts = await Post.find()
        return posts
    } catch (error) {
        console.log(error);
        throw new Error("Failed to Fetch posts")
    }
}

export async function getSinglePost(slug){
    try {
        connectToDb();
        const post = await Post.findOne({slug}) 
        return post
    } catch (error) {
        console.log(error);
        throw new Error("Failed to Fetch post")
    }
}

export async function getUser(id){
    try {
        connectToDb();
        const user = await User.findByid(id)
        return user
    } catch (error) {
        console.log(error);
        throw new Error("Failed to Fetch User")
    }
}

export async function getAllUser(){
    try {
        connectToDb();
        const users = await User.find()
        return users
    } catch (error) {
        console.log(error);
        throw new Error("Failed to Fetch User")
    }
}