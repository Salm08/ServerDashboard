export const SOGLIE = {
  attenzione: 70,
  critico: 90
};

export function statoServer(server) {
  return !server.online
    ? "offline"
    : server.cpu >= SOGLIE.critico
    ? "critico"
    : server.cpu >= SOGLIE.attenzione
    ? "attenzione"
    : "ok";
}

export function contaPerStato(servers, stato) {
  return servers.filter((s) => statoServer(s) === stato).length;
}