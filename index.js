const express = require('express');
const app = express();

app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require("discord.js"); 
const client = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');
const firebase = require("firebase");

client.config = config;
client.fs = fs;
client.commands = new Discord.Collection();

var firebaseConfig = {
    apiKey: "AIzaSyBbfAAzrPVt7WhZmwdkHNo09BIiotAhbR4",
    authDomain: "badlandersmvp.firebaseapp.com",
    databaseURL: "https://badlandersmvp-default-rtdb.firebaseio.com",
    projectId: "badlandersmvp",
    storageBucket: "badlandersmvp.appspot.com",
    messagingSenderId: "90142387590",
    appId: "1:90142387590:web:2702118910ac51f3ed1007"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database()

client.on('message', async (message) => {

	let user = message.author;
	let db = database.ref(`Users/${user.id}`);
  
	let dbValor = await database.ref(`Users/${user.id}`).once('value');

if(message.channel.id == "834023774009032744"){
		message.react('👍').then(r => {
			message.react('👎').then(r => {})
		})

if(dbValor.val() == null){
 db.set({
        nome: `${message.author}`,
      msg_id: `${message.id}`,
				like: 1
        })

} else {

//const like = dbValor.val().like
//ar conta = 1 + like

const infosFilter = (reaction, user) => reaction.emoji.name === '👍' && user.id //=== message.author.id;
const infos = message.createReactionCollector(infosFilter);

	infos.on('collect', async (r2) => {
	//	message.channel.send("ajuda")
	let dbV = await database.ref(`Users/${message.author.id}`).once('value');
	await	database.ref(`Users/${message.author.id}`).update({
			like: 1 + dbV.val().like
  })
})
	//    const emojis = ["✔️", "❎"];

  // for (const i in emojis) {
  //   await message.react(emojis[i])
  // 	}
}
}

     if (message.author.bot) return;
		 if(message.content.startsWith("<@!"+client.user.id+">")) return message.reply(`cu`)
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix)) return;
		const args = message.content.trim().slice(config.prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();
    try {
			const commandFile = require(`./commands/${command}.js`)
			commandFile.run(client, message, args);
    } catch (err) {
			console.error('algo deu errado... nº do erro:' + err);
		}
});

client.on('MessageReactionAdd', async (reaction) =>{
	console.log("funfpu")
});
// client.on('message', message => {
// 	if (message.author.bot) return;
//   let responseObject = {
// 	  'oi': "opa", 
//     "pq?" : "sou um bot ue ;-; da nem pra joga...",
// 		 "ou" : "oi",
// 		 "boa noite" : "boa noite"
// 	};
	
  
//   if(responseObject[message.content]){
//     message.channel.send(responseObject[message.content]);
//   }
// });

/*
client.on('raw', async dados => {
   if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return;
   if(dados.d.message_id != "ID da mensagem que a reação será adicionada") return;

   let servidor = client.guilds.cache.get("ID da sua guilda");
   let membro = servidor.members.cache.get(dados.d.user_id);

   let cargo = servidor.roles.cache.get('ID da role');

   if(dados.t === "MESSAGE_REACTION_ADD"){
       if(dados.d.emoji.name === "nome do emoji/emoje em unicode que será usado na reação"){ // caso queira usar um emoji personalizado use: if(dados.d.emoji.id === "id do emoji"){
         if(membro.roles.cache.has(cargo)) return;
           if(membro.roles.cache.has(cargo.id)) return;
           membro.roles.add(cargo.id);
       }
   }
   if(dados.t === "MESSAGE_REACTION_REMOVE"){
       if(dados.d.emoji.name === "nome do emoji/emoje em unicode que será usado na reação"){ // caso queira usar um emoji personalizado use: if(dados.d.emoji.id === "id do emoji"){
           if(!membro.roles.cache.has(cargo.id)) return;
           membro.roles.remove(cargo.id);
       }
   }
});*/


client.on("ready", () => {
  let activities = [
    `Badlanders`,
  ]
  i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`,{
    type: "PLAYING"
  }), 1000);
  client.user
   .setStatus("Online")
   .catch(console)
console.log("to vivo")
});

client.login(process.env.TOKEN); 
