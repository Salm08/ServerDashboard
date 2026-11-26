import "./App.css";
import { sistema, servers, avvisi } from "./dati";
import { statoServer, contaPerStato, cpuMedia, piuLento, trovaServer } from "./calcoli";
import Intestazione from "./Intestazione";
import Riepilogo from "./Riepilogo";
import GrigliaServer from "./GrigliaServer";
import ServerInEvidenza from "./ServerInEvidenza";
import Avvisi from "./Avvisi";

function App() {
const online = servers.filter((s) => s.online).length;
const cercato = "db-01";
const serverTrovato = trovaServer(servers, cercato);

  return (
    <div className="pannello">
      <Intestazione
        nome={sistema.nome}
        aggiornato={sistema.aggiornato}
        online={online}
        totale={servers.length}
      />
      <Riepilogo
        ok={contaPerStato(servers, "ok")}
        attenzione={contaPerStato(servers, "attenzione")}
        critici={contaPerStato(servers, "critico")}
        offline={contaPerStato(servers, "offline")}
        mediaCpu={cpuMedia(servers)}
        lento={piuLento(servers)}
      />
      <GrigliaServer servers={servers} />
      <ServerInEvidenza cercato={cercato} server={serverTrovato} />
      <Avvisi elenco={avvisi} />
    </div>
  );
}

export default App;


/*
  1. Con 7 server nella griglia si vedrebbero comunque solo i primi 6 server, il settimo verrebbe ignorato e non comparirebbe sullo schermo.
    Con 5 server l'app andrebbe in crash con la pagina completamente bianca e servers[5] sarebbe undefined.

  2. Il principio del flusso unidirezionale delle props.

  Rchiesta 9:
  1.Perché non si fa: In React le props sono in sola lettura: un componente figlio non deve mai modificare direttamente gli oggetti che riceve dall'alto.
    Anche scrivendo server.online = true, React non si accorgerebbe della modifica e non aggiornerebbe la pagina.
    Dove vive il dato e chi deve cambiarlo: Il dato vive dentro l'array servers gestito da App e lo distribuisce a tutti i componenti. Deve essere App ad aggiornare i dati.

  2. È impossibile perché l'interfaccia è governata da due principi che garantiscono la coerenza:
    Unica fonte di verità: durante lo stesso render, App passa esattamente lo stesso array servers sia a GrigliaServer sia alle funzioni di conteggio per riepilogo.
    Funzione pura e regola unica: statoServer(server) è una funzione pura che a parità di input restituisce sempre lo stesso identico risultato,
    senza dipendere da variabili esterne o casuali e contaPerStato non inventa un criterio diverso, ma chiama statoServer(s) === "critico".
    Applicando la stessa logica agli stessi dati, il numero nella casella e i colori delle schede non possono mai differire.

  3. Scelta: BadgeStato. Passare a BadgeStato solo la stringa stato offre due vantaggi principali:
    BadgeStato non sa nulla di server, indirizzi IP, CPU o soglie. Associa soltanto un colore e un'etichetta a quattro stringhe ("ok", "attenzione", "critico", "offline"). 
    Questo permette di riutilizzarlo ovunque nell'applicazione.
    inoltre se domani cambiasse la struttura dell'oggetto server o cambiassero le regole per decidere quando un server è critico,
    BadgeStato continuerebbe a funzionare senza doverlo toccare.
*/
