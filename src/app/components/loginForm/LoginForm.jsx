"use client"

import { login } from "@/app/server/action"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"
import styles from "./loginForm.module.css"

function LoginForm(){
    const router = useRouter()
    const [state , formAction] = useFormState(login , {})

    // useEffect(() =>{
    //     state?.success && router.push("/")
    // },[state?.success , router])

    return (
        <form className={styles.form} action={formAction}>
            <input type="text" name="username" placeholder="Usernamme"/>
            <input type="text" name="password" placeholder="Password"/>
            <button>Login</button>
            {state?.error}
            <Link href={"/register"}>Don't have an account? <b>Register</b></Link>
        </form>
    )
}

export default LoginForm

//nonsotante le credenziali corrette, verrà però mostrato un errore, questo perchè il redirect() di next (NEXT_REDIRECT error) 
//forza un errore, in modo semplice per poter permettere il redirect forza in primis la chiusura di qualsiasi operazione,
//siccome nel tryCatch di login essendo le credenziali vere la funzione è già eseguita, in automatico entrera nel catch
//mandando l'errore, per prevenire questo ci sono diverse soluzione, come rimuovere il blocco tryCatch, ma è sconsigliato nel
//nostro caso, oppure utilizzare middleware