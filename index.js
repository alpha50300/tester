// --- Web server عشان Render ما يوقف التطبيق ---
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Bot is alive!"));
app.listen(3000, () => console.log("Express server is running"));

// --- كود البوت ---
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// --- التوكن مباشر داخل الكود (مو آمن، لكن يمشي للتجربة) ---
const TOKEN = "MTIxNjg0MzY2NzA3MTk2MzI4OA.GnWN0j.30HG9oa1jbSO16xgj59eG5TqZVbB2o1l03Hl5A";

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", message => {
  if (message.content === "ping") {
    message.reply("pong!");
  }
});

client.login(TOKEN);
