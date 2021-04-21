const Discord = require("discord.js");
const firebase = require("firebase");

exports.run = async (client, message, args, ops, database) => {
	var database = firebase.database();
	let db = await database.ref(`Users`).once('value');
	let botao = new Array();
await db.forEach((e, i)=> {
botao.push(message.channel.send('nome: '+e.val().nome+'\nlikes: '+e.val().like))
});
return botao
}