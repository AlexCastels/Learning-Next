import { getUser } from "@/server/data";
import styles from "./adminUser.module.css"
import Image from "next/image";
import { deleteUser } from "@/server/action";

async function AdminUser() {
    // const users = await getUser();
    const users = [
        {
            id : 1,
            username : "User 1",
        } ,
        {   id : 2,
            username : "PoUserst 2",
        }
    ]
    return (
        <div className={styles.container}>
            <h2>Users</h2>
            {users.map((user) => (
                <div className={styles.user} key={user.id}>
                    <div className={styles.detail}>
                        <Image src={user.img || "/noAvatar.png"} alt="" width={50} height={50}/>
                        <span>{user.username}</span>
                    </div>
                    <form action={deleteUser}>
                        <input type="hidden" name="id" value={user.id} />
                        <button className={styles.userButton}>Delete</button>
                    </form>
                </div>
            ))}
        </div>
    );
}

export default AdminUser;
