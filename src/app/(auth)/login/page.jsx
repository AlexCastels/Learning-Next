import LoginForm from "@/app/components/loginForm/LoginForm"
import styles from "./loginPage.module.css"
import { handleGithubLogin } from "@/server/action"

//auth() ci permette di poter loggare tutte le info sull'autenticazione 

function LoginPage(){
    // const session = async () => {
    //     "use server"
    //     const session = await auth()
    //     console.log(session);
    // }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form action={handleGithubLogin}>
                    <button className={styles.github}>Login With Github</button>
                </form>
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginPage