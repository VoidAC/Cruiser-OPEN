const colors = require("colors")
const fs = require("fs")
const si = require("systeminformation")
const NetworkSpeed = require('network-speed');
const testNetworkSpeed = new NetworkSpeed();

global["botversion"] = "ム឵ | gte-cruiser-open"



module.exports = {

    standardEmbed(title, content, message) {
        message.channel.send({
            embed: {
                title: `GTE Cruiser`,
                color: 1,
                fields: [{
                     name: `**${title}**`,
                    value: (`${content}`)
                }],
                footer: {
                    text: `${botversion}`
                }
            }
        });
    },


    complexEmbed(title, content1, content2, message) {
        message.channel.send({
            embed: {
                title: `GTE Cruiser`,
                color: 1,
                fields: [{
                    name: `**${title}**`,
                    value: (`${content1}\n\n${content2}`)
                }],
                footer: {
                    text: `${botversion}`
                }
            }
        });
    },

    async downloadSpeed() {
        const baseUrl = 'http://eu.httpbin.org/stream-bytes/50000000';
        const fileSizeInBytes = 50000000;
        const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
        if (speed.kbps < 1000){console.log(`[!] Connectivity speed detected at lower than 1 MB/s, speed/efficiency may be reduced.`.red)}
        console.log(`[!] Current download speed: ${speed.mbps} MB/s | ${speed.kbps} KB/s`.yellow)
    },

    async uploadSpeed() {
        const options = {
          hostname: 'www.google.com',
          port: 80,
          path: '/catchers/544b09b4599c1d0200000289',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const fileSizeInBytes = 2000000
        const speed = await testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);
        if (speed.kbps < 1000){console.log(`[!] Connectivity speed detected at lower than 1 MB/s, speed/efficiency may be reduced.`.red)}
        console.log(`[!] Current upload speed: ${speed.mbps} MB/s | ${speed.kbps} KB/s`.yellow)
    },
}