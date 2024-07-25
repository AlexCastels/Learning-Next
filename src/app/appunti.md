E' un framework di react , in Next cambia l'idea classica di routing, dove il tutto viene comandato dal ''App routing''
Si tratta di poter creare cartelle che altro non saranno il path corrispondente alla pagina al loro interno, il tutto viene 
suddiviso tra cartelle che conterranno le page.jsx , all'interno conterranno la pagine in se con i vari componenti, che poi saranno
contenuti in una cartella esterna in src, app dovrà contenere soltanto le route per le varie pagine
Il path dell'homepage di defauilt è settato a "/"

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

NEXT HOOKS
Next mette a disposizione ulteriori hooks diversi da quelli di react base
-usePathname() : recupera la parte finale del link, utilizzato per poter creare controlli e verifiche sul path corrente (simile a useLocation in react)