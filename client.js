//8-27-20


const discord = require("discord.js")
const colors = require("colors")
const fs = require("fs")


const toolbox = require("./api/util-framework.js")
const {createVault, checkVault, randomPay, transferFunds, addFunds} = require("./api/coin-framework.js")
const RFSA = require("./api/RFSA.js")

const authorization = require("./appStorage/auth.json")

const gteClient = new discord.Client()


const prefix = ">"


gteClient.on("ready", async () => {
setInterval(() => {
toolbox.downloadSpeed()
toolbox.uploadSpeed()
}, 600000);
console.log("GTE Cruiser launched and primed.".green)
});


gteClient.on("message", async (message) => {

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    const extension = messageArray[1];
    message.content.toLowerCase();
    if (message.author.bot) {return;}
 
  

    if(cmd === `${prefix}ping` || cmd === `${prefix}status`) {
        toolbox.complexEmbed("Ping", `Ping speed: **${Math.round(gteClient.ws.ping)} ms**`, `Invite: **https://discord.com/api/oauth2/authorize?client_id=739189845104263278&permissions=268443668&scope=bot**`, message)
    }
    
    if(cmd === `${prefix}help` || cmd === `${prefix}cmds`) {
        message.channel.send({
            embed: {
                title: `GTE Cruiser`,
                description: "Help",
                color: 15844367,
                fields: [
                    {
                    name: `**ping**`,
                    value: ("`Returns a semi-detailed information embed, as well as the current ping of the bot.`")
                    },
                    {
                    name: `**create-vault / balance / random-pay / send / add**`,
                    value: ("`Basic currency commands that allow you to manage the standard GTE currency.`")
                    },
                    {
                    name: `**encrypt / decrypt**`,
                    value: ("`Using a complex cipher, plaintext will be encrypted into ciphertext using GTE-RFSA.`")
                    },
                    {
                    name: `**kick / ban**`,
                    value: ("`Standard moderation commands.`")
                    },        
                ],
                footer: {
                    text: `${botversion}`
                }
            }
        });     
}

    
    if (cmd === `${prefix}create-vault`) {
        createVault(message)
        
    }

    if (cmd === `${prefix}balance`) {
        checkVault(message)
    }

    if (cmd === `${prefix}random-pay`) {
        randomPay(message)
    }

    if (cmd === `${prefix}send`) {
        let mention = messageArray[1]
        let amount = messageArray[2]
        transferFunds(message, amount, mention)
    }

    if (cmd === `${prefix}add`) {
        if(message.author.id == "771007665257709599" || message.author.id == "644210033374134306") {
        let mention = messageArray[1]
        let amount = messageArray[2]
        addFunds(message, amount, mention)
    }
}


if (cmd === `${prefix}encrypt`) {
        let encryptPacket = message.content.split(`${prefix}encrypt `).join("");
        toolbox.standardEmbed("RFSA Encryption", `**Encryption Result**:\n\n${"`"}${RFSA.RFSAEncrypt(encryptPacket)}${"`"}`, message)
}

if (cmd === `${prefix}decrypt`) {
        let decryptPacket = message.content.split(`${prefix}decrypt `).join("");
        toolbox.standardEmbed("RFSA Encryption", `**Decryption Result:**\n\n${"`"}${RFSA.RFSADecrypt(decryptPacket)}${"`"}`, message)
}

if (cmd === `${prefix}ban`) {
    if(message.author.id == "771007665257709599" || message.author.id == "644210033374134306") {
    let target = message.mentions.members.first()
    target.ban("[GTE-CRUISER] Ban")
    toolbox.standardEmbed("Ban", `Banned **${target.user.tag}** successfully.`, message)
  }
}


if (cmd === `${prefix}kick`) {
    if(message.author.id == "771007665257709599" || message.author.id == "644210033374134306") {
    let target = message.mentions.members.first()
    target.kick("[GTE-CRUISER] Kick")
     toolbox.standardEmbed("Kick", `Kicked **${target.user.tag}** successfully.`, message)
    }
}

    
});
gteClient.login(authorization.token)

