E' un framework di react , in Next cambia l'idea classica di routing, dove il tutto viene comandato dal ''App routing''
Si tratta di poter creare cartelle che altro non saranno il path corrispondente alla pagina al loro interno, il tutto viene 
suddiviso tra cartelle che conterranno le page.jsx (il file deve essere esclusivamente chiamato in questo modo per essere riconsociuto da next come route da seguire) , all'interno conterranno la pagine in se con i vari componenti, che poi saranno
contenuti in una cartella esterna in src, app dovrà contenere soltanto le route per le varie pagine
Il path dell'homepage di defauilt è settato a "/"

Esistono due tipi di componenti "use client" e "use server"

APP ROUTES

Per una maggiore pulizia del folder app, questo dovrebbe contenere solamente routes, pages e API route e nient'altro

-con (auth) è possibile raggruppare più cartelle per avere più ordine globale
-con le [id] possiamo specificare un path generico, dato da un titolo o un id (esempio dei post nel blog)

COMPONENTI LAYOUT
Un altra funzionalità è quella del layout, si tratta di poter tenere a vista degli elementi, ad esempio una navbar o un footer da poter rendere globale nell'intera app, non ci sarà più il bisogno di dover specificare il componente nel main o in cima agli altri componenti, tramite il file layout possiamo specificare che componenti poter renderizzare sopra o sotto ad altri. {children}
Il layout è possibile crearlo in qualsiasi pagina, non solamente in app globale

-loading.jsx: E'possibile nella cartella app inserire un componente che verrà mostrato durante il caricamento di altre pagine

-error.jsx: sempre nella cartella app, è un componente che verrà visualizzato in caso di errore, esistono due tipi di comp errore
da essere settati, uno è "use client" che dovrà essere specificato in alto nel componente

-not-found.jsx: di default è disponibile già un not found, possiamo personalizzarlo inserento questo componente in app  

STYLING
global.css è il css padre di tutto il progetto, è possibile li definire variabili root che possono essere importate e utilizzate 
in altri css sparsi nel progetto.
Next permette di poter utilizzare i moduli CSS, utilizzando l'estensione del file nomeFile.module.css
per poter utilizzare le classi contenute in un modulo bisognerà importare gli stili dal file, e accedervi come se fossero obj
" import styles from "./nomeFile.module.css" " -> className={styles.nomeClasse}
i moduli durante l'ispezione della pagina garantiscono la creazione automatica di classi uniche, questo dà la possibilità di poter
dare gli stessi nomi a classi su file diversi, evitando conflitti, se in global.css e navbar.css esiste una stessa classe 
.container si creerebbe un conflitto, e una classe sovrascriverebbe l'altra

Next migliora il data caching della nostra applicazione, anche con le immagini mette a disposizione un componente <Image/> che permette di poter cachare le immagini e le sue risoluzioni e ottimizzarle per la visualizzazione per ogni grandezza dello schermo
Next base non ci permette di importare img da siti esterni, per poterlo fare bisognerà specificare il sito di importazione nel file di configurazione, tutte le immagini saranno percepite nella cartella _next creata in fase di build per il data chaching

NEXT HOOKS
Next mette a disposizione ulteriori hooks diversi da quelli di react base
-usePathname() [CSR] : recupera la parte finale del link, utilizzato per poter creare controlli e verifiche sul path corrente (simile a useLocation in react)
-useRouter() [CSR] : permette la navigazione in diversi modi (spiegato più avanti)
-useSearchParams() [CSR] : permette di recuperare le query (richieste)
const search = useSearchParams() -> const q = search.get("q"),  è possibile settare nuove query con .set()

RENDERING COMPONENTS
Next permette di renderizzare componenti in due maniere, in server side e client side.
SSR: un utente che naviga il sito manda una richiesta, come viene processata questa richiesta, viene mandata al server che 
    compilerà HTML statico che verrà poio idratato tramite js per le interazioni della nostra pagina, e dopo questo processo
    sarà possibile utilizzare a pieno la nostra pagina web, dunque la compilazione sarà interamente gestita lato server.
    Ci sono pro e contro, i pro sono il fatto di avere un caricamento della pagina più veloce dipende la connessione internet,
    permette di favorire la navigazione dell'app in dispositivi vecchi e con connessioni anche lente, migliora l'ottimizzazione lato *SEO* ricevendo come prima cosa una pagina precompilata HTML e non una pagina totalmente vuota, ma ci sono anche dei contro, inizialmente (per pochi secondi) si avrà meno interazione, si incrementano le richieste ed il carico di lavoro del server, si potrebbe avvertirè più lentezza nel caricamento di alcune pagine, perchè ogni navigaizone sarà una richiesta a sè, e la gestione dello stato per la manipolazione dei dati sarà molto più complicato da affrontare.
CSR: Tramite il client rendering l'intera app verrà caricata utilizzando le risorse dell'utente (dispositivo), la richiesta viene
    processata inizialmente mandando un file HTML vuoto che verrà poi idratato completamente dal JS durante il caricamento dell'app
    Ovviamente il caricamento dell'app dipenderà esclusivamente dalle risorse che ha a disposizione l'utente, quindi app più pesanti potrebbero risultare più difficoltose da caricare, l'ottimizzazione *SEO* può essere afflitta visto l'HTML vuoto iniziale mandato, come pro si hanno prestazioni iniziali migliori, meno caricamenti da parte del server, e una migliore esperienza interattiva per l'utente

Di default tutti i componenti in NEXT sono renderizzati in SSR, ma è possibile poter combinare i due tipi di render, per poter specificare quale componente deve essere CSR basterà solamente specificare in alto nel componente creato "use client", questo ci permetterà di poter utilizzare hook ed eventi per poter interagire con l'utente. 

UTILIZZANDO COMPONENTI IN SSR NON SARA' POSSIBILE POTER CREARE INTERAZIONI CON L'UTENTE, ANCHE UN CONSOLE.LOG SARA' VISUALIZZATO SOLAMENTE NEL SERVER E NON NEL BROWSER

Durante il rendering di un componente CSR è possibile incontrare un problema con la lettura dei dati, nonostante un componente sia CSR verrà sempre precompilato e letto in SSR, la lettura dei dati avviene in modo asincrono, ed è possibile che lato server venga mostrato un dato, e lato client un altro, per poter evitare questo problema esistono 3 soluzioni:
1- useEffect(()=>{}) con variabile di stato true false, dunque aspettiamo che il dato venga effettivamente letto e registrato e
    tramite un conditional rendering lo mostriamo o utilizziamo nel componente.
2- Disabilitare SSR in componente, importiamo il componente in maniera dinamica tramite "dynamic()" di next, e specifichiamo che
    il componente importato deve avere SRR disabilitato:
    const MioComponente = dynamic(() => import("/pathdelcomponente") , {ssr: false})
    in questa maniera potremo utilizzare il componente importato e avrà SRR disabilitato.
3- Utilizziamo il dato dentro un elemento HTML che avrà come attributo "suppressHydratationWarning" fornito da NEXT
    (metodo solamente per rimuovere l'errore fornito da next, ma non risolve realmente il problema)

Utilizzando un componente "use client" per wrappare altri componenti nell'app, ad esempio un context o un provider, i componenti wrappati saranno comunque SSR (se in principio sono SSR), comunque non verranno "modificati"

NAVIGATION
Ci sono diversi modi per poter navigare in NEXT,
Il componente Link di NEXT avvia un prefetch della pagina a cui riporta, per poter migliorare la velocità dell'esperienza utente, nel caso in cui siano presenti più link però questo comportamento potrebbe ridurre le prestazioni, per poter risolvere questo problema possiamo aggiungere al comp un attributo "prefetch={false}"

Un altro modo per permettere il routing è utilizzare useRouting() (importato da next/navigation più moderno), simili ad useNavigation() in react, permette di poter "pushare" verso un altra pagina dell'app. 
const router = useRouter() [CSR]
router.push("/") -> tramite un evento renderizza al path indicato 
router.replace("/") -> questo permette di non creare una 'cronologia' nella navigazione e di renderizzare al path
router.refresh() -> permette di refreshare la pagina 
router.back() -> permette di navigare la pagina precedente
router.forward() -> permette di navigare la pagina successiva

useSearchParams() [CSR] : permette di recuperare le query (richieste)
const search = useSearchParams() -> const q = search.get("q"),  è possibile settare nuove query con .set()

Lato [SSR] è possibile andare a destrutturare nel componente delle prop specifiche, function MioComp({params , searchParams}){}
params = permette di accedere ai parametri ricevuti attraverso il path (anche generico -> [title])
searchParams = permette di accedere alle query 

FETCHING DATA
In next di default tutti i dati fetchati sono chachati, per poter prevenire questo comportamento possiamo specificare
nel fetch {cache : "no-store"}, come secondo argomento, in questa maniera possiamo anche essere sicuri di avere sempre dati
aggiornati visto il refresh del fetch, sempre nel fetch abbiamo molte altre opzioni da poter settare a disposizione
{next: {revalidate:3600}} così indichiamo di refreshare il fetch ogni ora.
è possibile indicare anche il no-store attraverso una funzione, utilizzato generalmente in node o nel server
import { unstable_noStore } from "next/cache"; unstable_noStore() -> dentro la query per evitare di chachare i dati
(questo metodo in next è ancora instabile)
Next js previente il multifetching, cioè che, nel caso in cui nella stessa pag si tenta di fetchare lo stesso url, non verranno avviati 2 fetch, ma la chiamata sarà sempre una singola

NEXT COMPONENTS
<Suspense fallback={<div>Loading..</div>}>
    <Altro div>
</Suspense> = si tratta di un componente fornito da next che permette di inserire elementi mdurante il caricamento di un altro componente, esempio in blog page con gli autori dei post, in queso esempio verrà mostrata la scritta Loading in attesa che il/i componenti al suo interno vengano tutti caricati e renderizzati

SEO Search Engine Optimization
SSR
Next mette a disposizione un miglioramento per il SEO, dove il tutto viene gestito e organizzato nei metadata.
in layout.js
export const metadata = {
    title: {
        default:"Next Homepage",
        template: "%s | Next App"
    },
    description: "First Next.js App",
};
con %s possiamo rendere dinamico l'inserimento del title recuperando la stringa dalle altre const metadata presenti nell'app
questa funzione di default può essere inserita in tutte le pagine che vogliamo, per poter migliorare la SEO nella nostra app

CSR
import Head from 'next/head';
{/* Utilizza il componente Head per impostare i metadata */}
<Head>
  <title>{metadata.title}</title>
  <meta name="description" content={metadata.description} />
</Head>
Lato client non è possibile gestire i metadata come sopra riportato, Next fornisce un componente Head dove al suo interno e possibile specificare title e meta, per il SEO 

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

API ROUTES IN NEXT
Simile come il routing, next permette di creare facilmente delle API , attraverso il sistema di cartelle , per distinguiere un API da una route la cartella globale dovrà essere chiamata 'api' e al suo interno nelle varie cartelle che staranno ad indicare il path delle API il file dovrà essere nominato route.js/ts, in questo modo sarà riconosciuto come API, come il routing delle pagine anche nelle API è possibile utilizzare il folder dinamico con le []
Altri appunti dentro server/blog/route.jd

NEXT AUTHENTICATION with AUTH.JS