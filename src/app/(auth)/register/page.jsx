import styles from "./register.module.css"
import RegisterForm from "@/app/components/registerForm/RegisterForm"

function RegisterPage(){
    return ( 
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <RegisterForm/>
            </div>
        </div>
    )
}

export default RegisterPage