const fs = require("fs")
const {standardEmbed} = require("./util-framework.js")

global["currency_name"] = "hexcoin"

function random(min, max) {  
    return Math.floor(Math.random() * (max - min) + min)
}


module.exports = {

createVault(message) {
    if (!fs.existsSync(`./appStorage/vaults/${message.author.id}.vault`)) {
        console.log(`[-] ${message.author.username} created a vault successfully!`.blue)
        fs.appendFile(`./appStorage/vaults/${message.author.id}.vault`, `15`, (err) => { 
            if (err) message.channel.send(`${"`"}An error has occured while trying to create new currency vault${"`"}`)
            standardEmbed(`${currency_name} Vault`, `Created a new ${currency_name} vault successfully!`, message)
            let userid = message.author.id
            let userdata = fs.readFileSync(`./appStorage/vaults/${userid}.vault`,'utf8')
            let datasplit = userdata.split(" ");
            let userbalance = Number(datasplit[0])  
        
        });
    }
},

randomPay(message){
    let id = message.author.id
    let userdata = fs.readFileSync(`./appStorage/vaults/${id}.vault`,'utf8')
    let datasplit = userdata
    let rando = random(1, 45)
    let newbalance = Number(datasplit) + rando
    let c_data = `${newbalance}`
    fs.writeFile(`./appStorage/vaults/${id}.vault`, c_data, (err) => {
    standardEmbed("Random Cash", `Payed out ${rando} ${currency_name} to your wallet, you now have ${newbalance} ${currency_name}.`, message)
    console.log(`[!] Paid out ${message.author.tag} ${rando} ${currency_name}. `.blue)
    });
},

transferFunds(message, amount, id){

    let sendID = message.author.id
    let senderData = fs.readFileSync(`./appStorage/vaults/${sendID}.vault`,'utf8')
    let recieverData = fs.readFileSync(`./appStorage/vaults/${id}.vault`,'utf8')


    if(senderData > amount) {
        if(amount > 0) {

    let newSend = Number(senderData) - Number(amount)
    let newRecieve = Number(recieverData) + Number(amount)


    fs.writeFile(`./appStorage/vaults/${sendID}.vault`, `${newSend}`, (err) => {
        standardEmbed("Cash Transfer", `Sent **${amount} ${currency_name}**  successfully!`, message)
        console.log(`[!] ${message.author.tag} transfered ${amount} coins. `.blue)
    });

    fs.writeFile(`./appStorage/vaults/${id}.vault`, `${newRecieve}`, (err) => {});
    }
  } 
},

addFunds(message, amount, id){
    let recieverData = fs.readFileSync(`./appStorage/vaults/${id}.vault`,'utf8')
    if(amount > 0) {

    let newRecieve = Number(recieverData) + Number(amount)

    fs.writeFile(`./appStorage/vaults/${id}.vault`, `${newRecieve}`, (err) => {});
    console.log(`[!] ${message.author.tag} added ${amount} ${currency_name} into the economy.`.blue)
} 

},

checkVault(message) {
    let userdata = fs.readFileSync(`./appStorage/vaults/${message.author.id}.vault`,'utf8')
    let userbalance = userdata
    
    standardEmbed(`${currency_name} Vault`, `Current balance: **${userbalance}** ${currency_name}.`, message)
},

}
