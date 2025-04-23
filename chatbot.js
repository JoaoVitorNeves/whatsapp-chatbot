const flow = require("./flow");

const estados = {};

function processarMensagem(usuario, mensagem) {
  if (!estados[usuario]) {
    estados[usuario] = "inicio";
  }

  const etapaAtual = estados[usuario];
  const etapa = flow[etapaAtual];
  const proximaEtapa = typeof etapa.proxima === "function" ? etapa.proxima(mensagem.trim()) : etapa.proxima;
  estados[usuario] = proximaEtapa;

  const resposta = flow[proximaEtapa]?.mensagem || "❌ Algo deu errado. Tente novamente.";
  return resposta;
}

module.exports = { processarMensagem };