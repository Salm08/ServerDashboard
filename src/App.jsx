import "./App.css";
import { sistema, servers, avvisi } from "./dati-blackout";
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
*/