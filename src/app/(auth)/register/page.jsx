import { register } from "@/app/server/action"
import styles from "./register.module.css"

function RegisterPage(){
    return ( 
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form className={styles.form} action={register}>
                    <input type="text" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="text" placeholder="Password" name="password" />
                    <input type="text" placeholder="Repeat password" name="passwordRepeat" />
                    <button>Register</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage