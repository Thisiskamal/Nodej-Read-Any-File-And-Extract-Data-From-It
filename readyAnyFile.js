/* const { PdfReader } = require('pdfreader');
// Initialise the readerconst reader = new PdfReader();
new PdfReader().parseFileItems("D027913608_9694359672011657_SCHEDULESC.pdf", function (err, item) {
  if (err) {
    callback(err)
  } else if (!item) {
    callback()
  } else if (item.text) {
    // if (item.text.search("UPL")) {
      console.log(item.text)
    // }
  }
}); */


let fs = require('fs'),
  PDFParser = require("pdf2json");
var arrNotRen = [], arrRen = [], arrWrongRen = [];
const path = require("path");
const { callbackify } = require('util');

const getAllFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []
  var i = 0;
  files.forEach(function (file) {
    i = i + 1;
    if (fs.statSync(dirPath + "/" + file).isFile()) {
      // arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      if (file.indexOf('.pdf') >= 0) {
        // console.log('-- found: ', file);
        let pdfParser = new PDFParser();
        pdfParser.loadPDF(`${dirPath}/${file}`);
        pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
        pdfParser.on("pdfParser_dataReady", pdfData => {
          // console.log(JSON.stringify(pdfData))
          if (fs.existsSync(dirPath + "\\uploads\\" + file)) {
            // callbackify(err);
           var filename = `${dirPath}\\uploads\\${pdfData.formImage.Pages[0]['Texts'][36]['R'][0]['T']}_i__${i}.pdf`;
          }else{
            var filename = `${dirPath}\\uploads\\${pdfData.formImage.Pages[0]['Texts'][36]['R'][0]['T']}.pdf`;
          }

          fs.copyFile(`${dirPath}\\${file}`, filename, function (err, data) {
            if (err) {
              // console.log(err);
              arrNotRen.push(file);
              console.log(`${file} : Not Rename`);
            } else {
              arrRen.push(file);
              // console.log(`${dirPath}\\${file} : Rename`);
            }
          });

        });
      } else {
        arrWrongRen.push(file);
        console.log(`${file} : Wrong`);
      };

    } else {
      console.log(`${file} : Not Rename`);
      // arrayOfFiles.push(path.join(__dirname, dirPath, file))
    }
  })

  return arrayOfFiles
}

const result = getAllFiles("D:\\Project\\eVIM\\01-01-2021\\EVIM\\zip for 2 Folder\\3rd lot..500");
console.log("COmplete");

