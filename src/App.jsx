import "./App.css";
import { sistema, servers, avvisi } from "./dati";
import { statoServer, contaPerStato, cpuMedia, piuLento, trovaServer } from "./calcoli";
import Intestazione from "./Intestazione";
import Riepilogo from "./Riepilogo";
import SchedaServer from "./SchedaServer";


function App() {
const online = servers.filter((s) => s.online).length;

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
      <SchedaServer
        server={servers[5]}
      />
    </div>
  );
}

export default App;