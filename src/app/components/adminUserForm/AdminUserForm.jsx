"use client"

import { addUser } from "@/server/action";
import styles from "./adminUserForm.module.css";
import { useFormState } from "react-dom";

function AdminUserForm(){

    const [state, formAction] = useFormState(addUser, undefined);

    return (
        <form action={formAction} className={styles.container}>
            <h2>Add New User</h2>
            <input type="text" name="username" placeholder="username" />
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <input type="text" name="img" placeholder="img" />
            <select name="isAdmin">
                <option value="false">Is Admin?</option>
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>
            <button>Add</button>
            {state?.error}
        </form>
    );
}

export default AdminUserForm