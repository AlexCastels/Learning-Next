import { auth, signIn } from "@/app/server/auth"

//auth() ci permette di poter loggare tutte le info sull'autenticazione 

function Login(){
    async function handleLogin(){
        "use server"
        await signIn("github")
    }

    // const session = async () => {
    //     "use server"
    //     const session = await auth()
    //     console.log(session);
    // }

    return (
        <form action={handleLogin}>
            <button>Login With Github</button>
        </form>
    )
}

export default Login