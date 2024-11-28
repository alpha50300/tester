const { GatewayIntentBits, Integration, ChannelFlags } = require('discord.js');
const {
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,ApplicationCommandOptionType
} = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const { PermissionsBitField } = require('discord.js');
const config = require('./config.json');
const rolesallowed = config.allowed_roles
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages
	],
});
require('dotenv').config();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
const bannedWords = [];

fs.readFile("banned_words.txt", "utf8", (err, data) => {
  if (err) {
    console.error("خطأ في قراءة الملف المحظور: " + err);
    return;
  }
  const lines = data.split("\n").map((line) => line.trim());
  bannedWords.push(...lines);
});

client.on("messageCreate", async (message) => {    
  for (let i = 0; i < bannedWords.length; i++) {
    if (message.content.includes(bannedWords[i])) {
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) &&!message.member.roles.cache.some(role => rolesallowed.includes(role.id))
      ) {
      let member = message.member;
      let embed = new EmbedBuilder()
        .setTitle("**You Are Muted !**")
        .setDescription(
          `**You are muted in \`${message.guild.name}\` server for a ${config.mute_time}**\n**For sharing a bad words or links in the chat !**\n**Your message : \`${message.content}\`**`
        )
        .setThumbnail(message.guild.iconURL({dynamic: true }));
      message.delete();
      await message.channel.send(
        `${message.member} **${config.mute_message}**`
      );
      await member.timeout(ms(config.mute_time), "badward");
      await message.member.send({ embeds: [embed] });
      break;
    }
  }
  }

});

client.login("TOKEN")
