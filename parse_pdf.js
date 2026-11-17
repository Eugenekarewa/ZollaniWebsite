global.DOMMatrix = class DOMMatrix {};
global.ImageData = class ImageData {};
global.Path2D = class Path2D {};

const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'C:\\Users\\Administrator\\Downloads\\gbp-audit-7842.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

async function run() {
  const parser = new PDFParse(new Uint8Array(dataBuffer));
  const data = await parser.getText();
  console.log("=== RESULT ===");
  const text = typeof data === 'string' ? data : (data.text || JSON.stringify(data));
  console.log(text.slice(0, 1000));
  fs.writeFileSync('extracted_pdf_text.txt', text);
}

run().catch(console.error);





