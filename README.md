# Nodej-Read-Any-File-And-Extract-Data-From-It
Rename Or copy any file in selected directory
pdf2json is a node.js module that parses and converts PDF from binary to json format, it's built with pdf.js and extends it with interactive form elements and text content parsing outside browser.

The goal is to enable server side PDF parsing with interactive form elements when wrapped in web service, and also enable parsing local PDF to json file when using as a command line utility.


Install
npm install pdf2json

Or, install it globally:

sudo npm install pdf2json -g

To update with latest version:

sudo npm update pdf2json -g

To Run in RESTful Web Service or as Commandline Utility

More details can be found at the bottom of this document.
Test
npm i npm run test

Check ./test/target/ for output JSON and test files.

Code Example
Parse a PDF file then write to a JSON file:
    let fs = require('fs'),
        PDFParser = require("pdf2json");
 
    let pdfParser = new PDFParser();
 
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
    });
 
    pdfParser.loadPDF("./pdf2json/test/pdf/fd/form/F1040EZ.pdf");
	
	Find more info...
	https://www.npmjs.com/package/pdf2json
