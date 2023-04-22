// import cl, { Client } from "whatsapp-web.js";
// import qrcode from "qrcode-terminal";
// import { readExcelFile } from "./utils.js";

const {Client , MessageMedia} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const {readExcelFile} = require('./utils.js');
const readline = require('readline')

globalThis.sheetname = "Sheet1";

//Read QRcode only one time
const client = new Client({
  puppeteer: {
    handleSIGINT: false,
    headless: false,
    executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("message", (message) => {
  console.log(chalk.greenBright(`Message Received => ${message}`));
});

client.on("ready", async () => {
  console.log(chalk.greenBright(`Client is ready and connected .. `));

  const excelData = await readExcelFile(dataFileName, sheetname, true);

  const msgdata = excelData.msgdata;
  const imagePath = excelData.imagePath;
  const caption = excelData.caption;
  const number_array = excelData.numbers;

  for await (const numberId of number_array) {
    await sendMsg(excelData, numberId, msgdata, imagePath, caption);
  }

  console.log(globalThis.chalk.blueBright(`Execution Completed..`));

});

// use this function to send message that itself determine based on data wether it needs to send image or simple msg
function sendMsg(excelData, numberId, msgdata, imagePath, caption) {
  return new Promise(async (resolve, rejects) => {
    setTimeout(async () => {
      if ("readOnlyMsg" in excelData && excelData.readOnlyMsg == true) {
        await send_message(numberId, msgdata);
        resolve(true);
      } else {
        await send_message_with_image_caption(numberId, imagePath, caption);
        resolve(true);
      }
    }, 5000);
  });
}

// Sending a image message with caption.
async function send_message_with_image_caption(number, imagePath, caption) {
  const isRegistered = await client.isRegisteredUser(number);
  if (isRegistered) {
    console.log(number + " Registrado");

    const media = await MessageMedia.fromFilePath(imagePath);

    await client.sendMessage(number, media, { caption: caption });

    console.log(chalk.greenBright(`${caption} is being sent successfully.`));

  } else {
    console.log(chalk.redBright.bold(`${number} is not Registrado`));
  }
}

// Sending a simple message.
async function send_message(number, text) {
  const isRegistered = await client.isRegisteredUser(number);
  if (isRegistered) {
    console.log(number + " Registrado");
    await client.sendMessage(number, text);
    console.log(chalk.greenBright(`${text} is being sent successfully.`));
  } else {
    console.log(chalk.redBright.bold(`${number} is not Registrado`));
  }
}

(async function () {
  const choice = await askQuestion('What to enter a new excel path? [Y/N] >> ');
  if(choice.toUpperCase() == 'N'){
    globalThis.dataFileName = './data.xlsx';
  }
  else {
    globalThis.dataFileName = await askQuestion("Enter XL Path >> ");
  }
  await client.initialize();

})();

function askQuestion(question) {
  return new Promise((resolve) => {
    const ask = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    ask.question(question, (answer) => {
      ask.close();
      resolve(answer.toString());
    });
  });
}
