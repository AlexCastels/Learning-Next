import { handleGithubLogin, login } from "@/app/server/action"
import { auth, signIn } from "@/app/server/auth"

//auth() ci permette di poter loggare tutte le info sull'autenticazione 

function Login(){
    // const session = async () => {
    //     "use server"
    //     const session = await auth()
    //     console.log(session);
    // }

    return (
        <>
            <form action={handleGithubLogin}>
                <button>Login With Github</button>
            </form>
            <form action={login}>
                <input type="text" placeholder="Username" name="username" />
                <input type="text" placeholder="Password" name="password" />
                <button>Login with credentials</button>
            </form>
        </>
    )
}

export default Login