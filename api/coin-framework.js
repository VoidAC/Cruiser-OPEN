const fs = require("fs")
const {standardEmbed} = require("./util-framework.js")

function random(min, max) {  
    return Math.floor(Math.random() * (max - min) + min)
}


module.exports = {

createVault(message) {
    if (!fs.existsSync(`./appStorage/vaults/${message.author.id}.vault`)) {
        console.log(`[-] ${message.author.username} created a vault successfully!`.blue)
        fs.appendFile(`./appStorage/vaults/${message.author.id}.vault`, `15`, (err) => { //aq m jb 
            if (err) message.channel.send(`${"`"}An error has occured while trying to create new currency vault${"`"}`)
            standardEmbed("GTECoin Vault", "Created a new coin vault successfully!", message)
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
    standardEmbed("Random Cash", `Payed out ${rando} coins to your wallet, you now have ${newbalance} coins.`, message)
    console.log(`[!] Paid out ${message.author.tag} ${rando} coins. `.blue)
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
        standardEmbed("Cash Transfer", `Sent **${amount} coins**  successfully!`, message)
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
    console.log(`[!] ${message.author.tag} added ${amount} coins into the economy.`.blue)
} 

},

checkVault(message) {
    let userdata = fs.readFileSync(`./appStorage/vaults/${message.author.id}.vault`,'utf8')
    let userbalance = userdata
    
    standardEmbed("GTECoin Vault", `Current balance: **${userbalance}** coins.`, message)
},

}