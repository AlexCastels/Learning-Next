import { Suspense } from "react";
import styles from "./adminPage.module.css";
import AdminPost from "../components/adminPost/AdminPost";
import AdminPostForm from "../components/adminPostForm/AdminPostForm";
import AdminUser from "../components/adminUser/AdminUser";
import AdminUserForm from "../components/adminUserForm/AdminUserForm";
import { auth } from "@/server/auth";

async function AdminPage() {
    const session = await auth();
    // const session = { user : {id : 1}}

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminPost />
                    </Suspense>
                </div>
                <div className={styles.col}>
                    <AdminPostForm userId={session?.user.id} />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminUser />
                    </Suspense>
                </div>
                <div className={styles.col}>
                    <AdminUserForm />
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
