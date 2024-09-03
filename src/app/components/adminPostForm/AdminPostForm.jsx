"use client"

import { addPost } from "@/server/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";

function AdminPostForm({userId}){

    const [state, formAction] = useFormState(addPost, undefined);

    return (
        <form action={formAction} className={styles.container}>
            <h2>Add New Post</h2>
            <input type="hidden" name="userId" value={userId} />
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="slug" placeholder="slug" />
            <input type="text" name="img" placeholder="img" />
            <textarea type="text" name="desc" placeholder="desc" rows={10} />
            <button>Add</button>
            {state && state?.error}
        </form>
    );
}

export default AdminPostForm