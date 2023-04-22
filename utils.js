// import Excel from "exceljs";
// import { Chalk } from "chalk";

const {Workbook} = require('exceljs');
const cc = require('chalk');

globalThis.chalk = cc

module.exports.readExcelFile = function (filename, sheetName, containsHeader) {
  return new Promise((resolve, reject) => {

    const workbook = new Workbook();
    
    workbook.xlsx.readFile(filename).then((ws) => {

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
