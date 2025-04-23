// chatbot.js
const messages = {
  welcome: `Olá! Seja bem-vindo(a) ao atendimento jurídico do Escritório da Dra. Paula Marcula, especialista em Direito Previdenciário.
Você teve algum benefício negado pelo INSS ou conhece alguém que teve?

1. Sim
2. Não`,

  benefitTypes: `✤️ Ter um benefício do INSS negado não significa que você perdeu o direito.
Na verdade, milhares de segurados têm seus pedidos indeferidos por falhas do próprio INSS — e a grande maioria consegue reverter essa situação com o apoio jurídico adequado.
Posso te ajudar com isso. Me diga:
Qual benefício você solicitou e foi negado?

1. Aposentadoria
2. Auxílio-doença
3. BPC/LOAS
4. Pensão por morte
5. Outro`,

  documentsRequest: `Você possui a carta de indeferimento ou o comprovante do pedido negado?

1. Sim, posso enviar agora
2. Sim, envio depois
3. Não tenho`,

  goodbyeNo: `Sem problemas! O escritório Dra. Paula Marcula agradece e nos colocamos à disposição para qualquer outra demanda jurídica. Nosso corpo de advogados especialistas poderá lhe ajudar em qualquer demanda. Obrigada!`,

  documentInstructions: `Por favor, envie os documentos para nosso email: contato@paulamarcula.com.br
Ou se preferir, você pode enviar agora pelo WhatsApp.`,

  finalMessage: `Obrigado por entrar em contato com o Escritório da Dra. Paula Marcula!
Para mais informações, visite nosso site ou entre em contato pelo telefone: (XX) XXXX-XXXX`
};

// Armazena a sessão de cada usuário
const userSessions = {};

// Função para processar as mensagens recebidas
async function processarMensagem(sender, incomingMsg) {
  if (!userSessions[sender]) {
    userSessions[sender] = { step: 'welcome' };
    return messages.welcome;
  }

  const session = userSessions[sender];
  let response = '';
  let nextStep = '';

  // Verifica o estado atual da conversa
  switch (session.step) {
    case 'welcome':
      if (incomingMsg === '1') {
        response = messages.benefitTypes;
        nextStep = 'benefitTypes';
      } else if (incomingMsg === '2') {
        response = messages.goodbyeNo + '\n\n' + messages.finalMessage;
        nextStep = 'end';
      } else {
        response = 'Opção inválida. Por favor, responda com 1 ou 2.\n\n' + messages.welcome;
      }
      break;

    case 'benefitTypes':
      if (['1', '2', '3', '4', '5'].includes(incomingMsg)) {
        const benefits = {
          '1': 'Aposentadoria',
          '2': 'Auxílio-doença',
          '3': 'BPC/LOAS',
          '4': 'Pensão por morte',
          '5': 'Outro'
        };
        session.benefitType = benefits[incomingMsg];
        response = messages.documentsRequest;
        nextStep = 'documentsRequest';
      } else {
        response = 'Opção inválida. Por favor, escolha um número entre 1 e 5.\n\n' + messages.benefitTypes;
      }
      break;

    case 'documentsRequest':
      if (['1', '2', '3'].includes(incomingMsg)) {
        if (incomingMsg === '1') {
          response = messages.documentInstructions;
        } else {
          response = 'Obrigado pela informação! ' + messages.finalMessage;
        }
        nextStep = 'end';
      } else {
        response = 'Opção inválida. Por favor, escolha um número entre 1 e 3.\n\n' + messages.documentsRequest;
      }
      break;

    default:
      response = messages.welcome;
      nextStep = 'welcome';
  }

  // Atualiza o próximo passo
  if (nextStep === 'end') {
    delete userSessions[sender];
  } else {
    session.step = nextStep;
  }

  return response;
}

module.exports = { processarMensagem };
