export const authConfig = {
    pages:{
        signIn: "/login"
    },
    providers: [],
    callbacks:{
        //utilizziamo jwt per aggiungere delle info alla sessione utente che in auth() non sono presenti,
        //come il parametro isAdmin che non viene preso in considerazione durante il processo di autenticazione
        //sia da socialMedia che da credenziali
        async jwt({token , user}){ 
            if(user){
                token.id = user.id //assegnamo al token id e il parametro isAdmin dell'utente recuperati dal DB
                token.isAdmin = user.isAdmin 
            }
            return token
        },
        async session({session , token}){
            if(token){
                session.user.id = token.id //assegnamo a session i parametri precedentemente aggiunti a token
                session.user.isAdmin = token.isAdmin
                return session
            }
        },
        authorized({auth , request}){
            const user = auth?.user
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin")
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog")
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login")
            console.log(auth);
            //ONLY ADMIN CAN REACH ADMIN PANEL
            if(isOnAdminPanel && !user?.isAdmin){
                return false
            }
            //ONLY AUTHENTICATED USERS CAN REACH BLOG PAGE
            if(isOnBlogPage && !user){
                return false
            }
            //ONLY AUTHENTICATED USERS CAN REACH LOGIN PAGE
            if(isOnLoginPage && user){
                return Response.redirect(new URL("/" , request.nextUrl))
            }
            return true
        }
    }
}

//questa configurazione ci permette di poter gestire gli utenti non autorizzati a visionare il sito, 
//recuperiamo i dati da auth sull'utente che in precedenza abbiamo modificato con jwt per aggiungere isAdmin, e della request
//per poter andare a creare delle condizioni per limitare l'accesso dell'utente al sito, dunque tramite la richiesta salviamo
//in delle variabili se l'utente si trova in quel determinato path, dopo di che blocchiamo la navigazione preventivamente 
//nel caso in cui l'utente non dispone dei requisiti per poter accedere alla sezione
//questa funzione autoConfig viene triggherata ad ogni richiesta di navigazione del sito perchè viene richiamata nella middleware

//di file auth ne può esistere solamente uni, e deve essere configurato sempre con providers e callbacks
//utilizzeremo poi lo spread per poter aggiungere questa funzione authorized collegata ad una middleware,
//che siccome non possono essere implementate direttamente in file che utilizzano librerie esterne, abbiamo creato in un nuovo
//file pulito per poterla utilizzare