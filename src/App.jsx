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
