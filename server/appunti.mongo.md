MONGO.DB CON MONGOOSE
Attualmente il sistema non funziona tramite mongo per problemi di import, non viene utilizzato

Tramite Mongoose facilitiamo il collegamento al nostro DB, 
tramite mongoose.connection(secret_key) possiamo collegarci al nostro db, la key viene ottenuta dal Server direttamente

mongoose permette di poter creare tabelle nel DB attraverso gli Schemi, altro non sono che la rappresentazioni delle tabelle sottoforma di obj, questi costituiranno i model per il DB
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true,
        unique: true,
        min:3,
        max:20,
    },
    password:{...},
    email:{...}
});

E' poi possibile esportare questo modello e poterlo utilizzare per recuperare o inserire i dati nel db
in questo caso eseguiamo prima un controllo, se il modello esiste o se 
deve essere creato tramite "mongoose.model("User", userSchema)"

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

Questi modelli sono poi utilizzati per poter creare le vere e proprie Query, mongoose ha sintassi diversa e permette diverse azioni, che sono viste come metodi dei model, come:
User.findByid(id) -> recupera un user trovato per id
User.find() -> recupera tutti gli elementi contenuti in User
User.findOne({dato}) -> recupera il primo elemento che contiene il dato inserito
Post.findByIdAndDelete(id) -> trova e cancella il determinato elemento trovato dal parametro passato
esistono molti altri metodi che possono essere trovati nella docs

ACTION IN NEXT
E' possibile manipolare il server attraverso delle action definite, sono delle funzioni asincrone che che possono essere avviate tramite l'attributo "action" e sono ad uso esclusivo del server "use server"
Caratteristiche principali delle Server Actions:
1.-Esecuzione sul Lato Server: Le Server Actions sono sempre eseguite sul server, anche se sono definite all'interno di componenti
React. Questo aiuta a migliorare la sicurezza e la performance, poiché le operazioni sensibili non vengono mai esposte al client.
2.-Automaticamente Server-Side: Non richiedono l'uso esplicito di API routes, ma sono comunque sicure come se fossero funzioni server-side.
3.-Gestione delle Richieste in Modo Diretto: Possono essere chiamate direttamente dai componenti client senza necessità di configurare endpoint API separati.
Dunque tramite le action possiamo andare a manipolare il nostro server direttamente creando richieste all'interno dei componenti, senza dover creare endpoint ulteriori, in automatico una action di default effettua una richiesta [POST]
guardare meglio appunti in "ServerActionTest" e "Action.js"
Le action sono comode per poter manipolare il server senza il bisogno di funzioni complesse o specificare delle API dirette
ovviamente quest'ultime sono possibili da implementare ugualmente
