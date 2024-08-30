import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import connectToDb, { User } from "./models";
//questa funzione è servita da auth per poter controllare le richieste dei provider, in handlers specifichiamo quali richieste
//dovranno essere gestite, in questo caso solamente GET e POST, le altre funzioni sono importate da NextAuth e:
export const {
    handlers: { GET, POST },
    auth, //serve per poter tracciare i dati delle chiamate per un controllo, ritorna un obj
    signIn, //è una funzione che permette di poter iscriversi tramite il provider selezionato
    signOut, //permette di potersi sloggare con il proprio account
} = NextAuth({
    providers: [ //in providers possiamo dichiarare quali provider la nostra app può gestire, le config sono sul sito "auth"
        GitHub({
            clientId: process.env.GITHUB_ID, //si trovano nel file .env , sono i dati dell'utente collegato di github
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    //con il parametro callback possiamo ricevere le informazioni di ritorno quando viene mandata una richiesta tramite un
    //social media, in questo caso stiamo utilizzando solamente github e stiamo utilizzando queste informazioni per registrare
    //un nuovo utente nel nostro DB, tramite la funzione signIn, dove destrutturiamo user , account e profile che contengono
    //i dati della richiesta, con un log di profile avremo un obj contenente tutte le informazioni, quando dobbiamo assegnare
    //le info di questo obj per poterle salvare dobbiamo fare attenzione a quale social media appartiene, perchè ognuno ha
    //il suo opj con i suoi params, ad esempio lo username su github viene chiamato login, su google dysplayname ecc ecc
    //tramite questa funzione controlliamo se il provider è github innanzitutto, e dopo di che cerchiamo se esiste già nel nostro
    //DB tramiote il controllo su User.findOne e verifichiamo la mail, se non esiste creiamo un nuovo user utilizzando lo schema
    //creato in models.js e assegnamo i parametri che ci interessando, poi salviamo newUser con .save()
    callbacks:{
        async signIn({user ,account, profile}){
            console.log(user ,account, profile);
            if(account.provider === "github"){
                connectToDb()
                try {
                    const user = await User.findOne({email : profile.email})
                    if(!user){
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.image,
                        });
                        await newUser.save();
                    }
                } catch (error) {
                    console.log(error);
                    return false
                }
            }
            return true
        }
    }
});
