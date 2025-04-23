const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const express = require("express");
const { processarMensagem } = require("./chatbot");

const app = express();
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu"
    ]
  }
});

// Gerar QR Code para login
client.on("qr", qr => {
  qrcode.generate(qr, { small: true });
});

// Confirmação quando o cliente está pronto
client.on("ready", () => {
  console.log("✅ Cliente WhatsApp está pronto!");
});

// Processa as mensagens recebidas
client.on("message", async msg => {
  // Chama a função que processa a mensagem e retorna a resposta
  const resposta = await processarMensagem(msg.from, msg.body);

  // Envia a resposta para o usuário
  if (resposta) {
    client.sendMessage(msg.from, resposta);
  }
});

// Inicia o cliente WhatsApp
client.initialize();

// Configuração do servidor Express
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("🤖 Chatbot rodando com WhatsApp Web.js"));
app.listen(PORT, () => console.log(`🌐 Servidor rodando na porta ${PORT}`));
