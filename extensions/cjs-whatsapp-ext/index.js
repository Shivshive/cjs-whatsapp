import cl, { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { readExcelFile } from "./utils.js";
import path from "path";

const dataFileName = "data.xlsx";
const sheetname = "Sheet1";

//Read QRcode only one time
const client = new Client({
  authStrategy: new cl.LocalAuth(),
  authTimeoutMs: 60000,
  puppeteer: {
    handleSIGINT: true,
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

  for (const numberId of number_array) {
    await sendMsg(excelData, numberId, msgdata, imagePath, caption);
  }

  console.log(globalThis.chalk.blueBright(`Execution Completed..`));
  
  // await client.destroy();
});

// use this function to send message that itself determine based on data wether it needs to send image or simple msg
function sendMsg(excelData, numberId, msgdata, imagePath, caption){
  return new Promise(async (resolve, rejects) =>{
    setTimeout(async () => {
      if ("readOnlyMsg" in excelData && excelData.readOnlyMsg == true) {
        await send_message(numberId, msgdata);
        resolve(true);
      } else {
        await send_message_with_image_caption(numberId, imagePath, caption);
        resolve(true)
      }
    }, 5000);
  })
 
}

// Sending a image message with caption.
async function send_message_with_image_caption(number, imagePath, caption) {
  const isRegistered = await client.isRegisteredUser(number);
  if (isRegistered) {
    console.log(number + " Registrado");
    const imagepath_resolved = await path.resolve(imagePath);
    console.log(imagepath_resolved);
    const media = await cl.MessageMedia.fromFilePath(imagepath_resolved);
    await client.sendMessage(number, media, {
      media: true,
      caption: caption,
    });
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

client.initialize();
