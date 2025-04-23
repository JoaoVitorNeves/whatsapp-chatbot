const flow = {
  inicio: {
    mensagem: "👋 Olá! Você teve algum benefício negado pelo INSS ou conhece alguém que teve?\n\n1 - Sim\n2 - Não",
    proxima: (resposta) => (resposta === "1" ? "tipoBeneficio" : "encerramento"),
  },
  tipoBeneficio: {
    mensagem: "📌 Qual benefício você solicitou e foi negado?\n1 - Aposentadoria\n2 - Auxílio-doença\n3 - BPC/LOAS\n4 - Pensão por morte\n5 - Outro",
    proxima: () => "documento",
  },
  documento: {
    mensagem: "📄 Você possui a carta de indeferimento ou o comprovante do pedido negado?\n1 - Sim, posso enviar agora\n2 - Sim, envio depois\n3 - Não tenho",
    proxima: () => "encerramento",
  },
  encerramento: {
    mensagem: "✅ Obrigado! A Dra. Paula Marcula e equipe estão à disposição para qualquer demanda jurídica. 👍",
    proxima: null,
  },
};

module.exports = flow;