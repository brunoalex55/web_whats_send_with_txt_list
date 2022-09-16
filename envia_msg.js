const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
var sleep = require('sleep');
const fs = require('fs');

const client = new Client({ puppeteer: { headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']} });
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});
client.on('ready', async () => {
        console.log('Iniciou!');
        var array = fs.readFileSync('prospect.txt').toString().split("\n"); //reading file
        for (i in array) {
            console.log("enviando");
            numero = array[i];
            console.log('Enviando para : '+numero)
            envia_msg(array[i])
            await sleep.sleep(5);        
        }
    });

 
function envia_msg(numero){
    console.log(numero)
    // Number where you want to send the message.
    const number = numero;
    // Your message.
    const text = 'Me chamo Roberto sou consultor de vendas da Direct Brasil TV.\n'+
    'Somos um provedor de TV por assinatura através da internet.\n'+
    '\n'+
    'Hoje estamos com uma ótima promoção relâmpago\n'+
    '\n'+
    'Plano com  + de 2000 canais e 10mil filmes \n'+
    ' \n'+
    'Apenas  R$ 73,50 mensal FIXO 😱\n'+
    '\n'+
    '✅ 3 PONTOS\n'+
    '✅ INSTALAÇÃO GRATIS\n'+
    '✅ SEM CONSULTAS\n'+
    '✅ ATIVAÇÃO IMEDIATA \n'+
    '✅ CANCELA A HORA QUE QUER.\n'+
    '✅ SEM MULTA.\n'+
    '\n'+
    'Gostaria de conhecer a nossa grade de canais promocional?\n'+
    '\n'+
    'Fale com um de nossos consultores agora mesmo, teremos o prazer em atendê-lo\n'+
    'https://bit.ly/3QQMOLo';
    
    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";
    // Sending message.
    sleep.sleep(1);
    client.sendMessage(chatId, text);
    console.log("enviou para o numero "+numero)
}
client.initialize();