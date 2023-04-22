import Excel from "exceljs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Chalk } from "chalk";

globalThis.chalk = new Chalk();

export const readExcelFile = function (filename, sheetName, containsHeader) {
  return new Promise((resolve, reject) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const workbook = new Excel.Workbook();
    const filePath = path.join(__dirname, filename);

    workbook.xlsx.readFile(filePath).then((ws) => {

      console.log(chalk.greenBright(`fetched workbook >> ${filename}`));

      const sheet = ws.getWorksheet(sheetName);

      console.log(chalk.greenBright(`read sheet with name >> ${sheetName}`));

      let startIndex = containsHeader ? 2 : 1;
      let totalRows = sheet.actualRowCount;
      
      console.log(chalk.greenBright(`total number of rows >> ${totalRows}`));
      
      const rows = sheet.getRows(startIndex, totalRows - 1);

      let numbers = [];

      const imagePath = rows.at(0).getCell(3).value;
      let caption;
      let readOnlyMsg = false;

      if (imagePath) {
        readOnlyMsg = false;
        caption = rows.at(0).getCell(4).value;
      } else {
        readOnlyMsg = true;
      }

      for (const row of rows) {
        numbers.push(row.getCell(1).value + "@c.us");
      }

      let data = {
        numbers: numbers,
        readOnlyMsg: readOnlyMsg,
        msgdata: rows.at(0).getCell(2).value,
        caption: caption,
        imagePath: imagePath,
      };

      resolve(data);
    });
  });
};
