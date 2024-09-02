import { Suspense } from "react"
import styles from "./admin.model.css"
import AdminPost from "../components/adminPost/AdminPost"
import AdminPostForm from "../components/adminPostForm/AdminPostForm"
import AdminUser from "../components/adminUser/AdminUser"
import AdminUserForm from "../components/adminUserForm/AdminUserForm"

function AdminPage(){
    return (
        <div className={styles.container}>
            <div className={styles.row}></div>
            <div className={styles.col}>
                <Suspense fallback={<div>Loading...</div>}>
                    <AdminPost/>
                </Suspense>
            </div>
            <div className={styles.col}>
                <AdminPostForm/>
            </div>
            <div className={styles.row}></div>
            <div className={styles.col}>
                <Suspense fallback={<div>Loading...</div>}>
                    <AdminUser/>
                </Suspense>
            </div>
            <div className={styles.col}>
                <AdminUserForm/>
            </div>
        </div>
    )
}

export default AdminPage