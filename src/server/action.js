"use server"
// "use server" nel caso in cui si abbiano più action, piuttosto che specificare use server all'interno di ognuna di esse
//è possibile indicarlo in cima

import { revalidatePath } from "next/cache";
import connectToDb, { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs"

export const addPost = async (data) => {
    // "use server"
    //tramite .get ed il name specifico dell'input possiamo salvare in una var il valore di quell'input
    //dentro la funzione l'arg rispecchia i dati provenienti dal form dov'è specificata la action
    //utilizziamo Object.fromEntries(data) per poter destrutturare data e poter ottenere il valore
    //con i dati ottenuti dunque possiamo creare un nuovo modello di post, definito in models
    //tramite il metodo .save() possiamo salvarlo nel nostro DB
    //questo è un esempio , il modello ha dei parametri richiesti che non sono stati inseriti
    //utilizziamo revalidatePath() per poter refreshare e poter vedere il contenuto aggiunto,
    //i dati vengono cashati ma next non refresha in tempo reale, dunque forziamo la cosa tramite la action

    // const name = data.get("title")
    // const desc = data.get("desc")
    // const id = data.get("id")
    // console.log(name,desc,id);

    const {title , desc , id} = Object.fromEntries(data)
    
    try {
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            id
        })

        await newPost.save()
        console.log("ok! Save to DB");
        revalidatePath("/blog")
        revalidatePath("/admin")
    } catch (error) {
        console.log(error);
    }
}

export async function deletePost(data){
    // "use server"
    const {id} = Object.fromEntries(data)
    try {
        connectToDb()
        await Post.findByIdAndDelete(id);
        console.log("Post deleted!");
        revalidatePath("/blog")
        revalidatePath("/admin")
    } catch (error) {
        console.log(error);
    }
}

export async function handleLogout(){
    await signOut()
}

export async function handleGithubLogin(){
    "use server"
    await signIn("github")
}

//qui stiamo creando un azione per registrarsi, dove recuperiamo i dati dal form e verifichiamo come prima cosa se la pass
//è stata digitata per la seconda volta correttamente, dopo di che ci colleghiamo al DB e come prima cosa controlliamo se
//l'utente esiste tramite username e findOne, se esiste blocchiamo il processo, se non esiste creiamo un nuovo utente con lo
//schema User e salviamo i dati recuperati dal form, (img non è required nello schema) infine salviamo il newUser nel DB
//di norma è sconsigliato storare la password direttamente come inserita nel db, ma bisognerebbe criptarla, per questo
//utilizziamo una libreria esterna bcrypt che permette di criptare le password in hash ed evitare così possibili problemi
//la funzione collegata a RegisterForm.jsx ritorna l'esito dei controlli sottoforma di obj, che vengono recuperati dallo
//state e utilizzati per stampare a video info per l'utente
export async function register(previousState , formData){
    const {username , email, password, passwordRepeat , img} = Object.fromEntries(formData);
    if(password !== passwordRepeat){ 
        return { error : "Passowrd don't match!"}
    };
    try {
        connectToDb()
        const user = await User.findOne({username});
        if(user){ 
            return { error : "User already exist"}
        };

        const salt = await bcrypt.genSalt(10) //viene generato un codice random
        const hashedPassword = await bcrypt.hash(password , salt) //viene combinato il cod con la password in codice hash

        const newUser = new User({
            username,
            email,
            password : hashedPassword, //la password salvata sarà adesso quella criptata
            img,
        })

        await newUser.save()
        console.log("save to DB");
        return {success : true}
    } catch (error) {
        console.log(error);
        return {error : "Something went wrong!"}
    }
}

export async function login(previousState , formData){
    const {username ,password} = Object.fromEntries(formData);
    try {
        //mandiamo un obj con i dati da utilizzare in auth per il provider
        await signIn("credentials" , {username , password})
    } catch (error) {
        console.log(error);
        if(error.message.includes("CredentialsSignin")){
            return { error : "Invalid username or password"}
        }
        throw error
    }
}

export async function addUser(previousState , formData){
    const {username , email , password , img} = Object.fromEntries(formData)
    try {
        connectToDb()
        const newUser = new User({
            username ,
            email,
            password,
            img
        })
        await newUser.save()
        console.log("Saved to DB");
        revalidatePath("/admin")
    } catch (error) {
        console.log(error);
        return {error : "Something went wrong!"}
    }
}

export async function deleteUser(formData){
    const {id} = Object.fromEntries(formData)
    try {
        connectToDb()
        await Post.deleteMany({userId:id})
        await User.findByIdAndDelete(id)
        console.log("Deleted From DB");
        revalidatePath("/admin")
    } catch (error) {
        console.log(error);
        return {error : "Something went wrong!"}
    }
}