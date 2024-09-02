"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import styles from "./registerForm.module.css"
import { register } from "@/server/action";

//useFormState (in react diventa useActionState), è un hook che permette di gestire lo state di un form, dove il secondo param
//formAction trigghera la funzione che deve essere specificata come primo argomento, il secondo argomento è il valore iniziale
//state conterra tutti i valori della funzione register (action) che deve contenere necessariamente come primo parametro il
//"previousState" che indica il valore precedende dello stato dell'hook, state in questo caso conterrà tutti i valori che 
//vengono ritornati dalla funzione a seconda dell'esito
//in useEffect creiamo una condizione che se il parametro success in state esiste allora si viene renderizzati a login, e 
//questo avviene solamente nel momento in cui la stessa variabile state cambia, lo state cambierà nel momento in cui il form
//viene triggherato facendo partire la formAction che attiva register

function RegisterForm(){
    const router = useRouter()
    const [state , formAction] = useFormState(register , {})

    useEffect(() =>{
        state?.success && router.push("/login")
    },[state?.success , router])
    
    return(
        <form className={styles.form} action={formAction}>
            <input type="text" placeholder="Username" name="username" />
            <input type="text" placeholder="Email" name="email" />
            <input type="text" placeholder="Password" name="password" />
            <input type="text" placeholder="Repeat password" name="passwordRepeat" />
            <button>Register</button>
            {state?.error}
            <Link href="/login">Have an account? <b>Login</b></Link>
        </form>
    )
}

export default RegisterForm