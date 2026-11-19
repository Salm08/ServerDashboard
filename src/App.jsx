import "./App.css";
import { sistema, servers, avvisi } from "./dati";
import { statoServer, contaPerStato, cpuMedia, piuLento, trovaServer } from "./calcoli";

function App() {
  console.log(servers.length, avvisi.length);
  console.log(statoServer(servers[0]), statoServer(servers[1]), statoServer(servers[2]));
  console.log(statoServer(servers[3]), statoServer(servers[4]), statoServer(servers[5]));
  console.log(contaPerStato(servers, "ok"), contaPerStato(servers, "attenzione"));
  console.log(contaPerStato(servers, "critico"), contaPerStato(servers, "offline"));
  console.log(cpuMedia(servers));
  console.log(piuLento(servers).nome, piuLento(servers).latenza);
  console.log(trovaServer(servers, "db-01").ip);
  console.log(trovaServer(servers, "web-09"));

  return (
    <div className="pannello">
      <h1>{sistema.nome}</h1>
    </div>
  );
}

export default App;