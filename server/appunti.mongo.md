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
esistono molti altri metodi che possono essere trovati nella docs
