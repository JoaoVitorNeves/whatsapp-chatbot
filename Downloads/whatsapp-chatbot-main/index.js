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

client.on("qr", qr => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ Cliente WhatsApp está pronto!");
});

client.on("message", async msg => {
  const resposta = processarMensagem(msg.from, msg.body);
  if (resposta) {
    client.sendMessage(msg.from, resposta);
  }
});

client.initialize();

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("🤖 Chatbot rodando com WhatsApp Web.js"));
app.listen(PORT, () => console.log(`🌐 Servidor rodando na porta ${PORT}`));