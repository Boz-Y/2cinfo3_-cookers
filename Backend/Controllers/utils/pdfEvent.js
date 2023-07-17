import pdfMake from 'pdfmake'
import htmlToPdfmake from 'html-to-pdfmake'
import Handlebars from "handlebars";
import fs from "fs";
import { JSDOM } from 'jsdom'

///configuration

export async function pdfGenerator(data){
    var { window } = new JSDOM("");
    var fontDescriptors = {
        Roboto: {
            normal: './fonts/Roboto-Regular.ttf',
            bold: './fonts/Roboto-Medium.ttf',
            italics: './fonts/Roboto-Italic.ttf',
            bolditalics: './fonts/Roboto-MediumItalic.ttf'
        }
    };
    
    // init
    const printer = new pdfMake(fontDescriptors);
    
    const pageLayout = {
        pageOrientation: 'portrait',
        pageSize: 'A4',
    };
    
    
    // Define the document definition object
    const documentDefinition = {
        content: [],
        pageSize: {
            width: 700,
            height: 1000
        },
        pageLayout: pageLayout,
        styles: {
            'bb5': {
                borderBottom: '10px solid red'
            }
        },
    
    };

    const html = renderDataIntoTemplate(data)

documentDefinition.content.push(
    htmlToPdfmake(html, { window: window, tableAutoSize: true, })
);

const pdfDoc = printer.createPdfKitDocument(documentDefinition);

pdfDoc.pipe(fs.createWriteStream('./generated/pdf/'+ data.id +'.pdf'));
pdfDoc.end();
}

const renderDataIntoTemplate = (data) => {
    const template = fs.readFileSync('./utils/pdf.html', 'utf-8');
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate(data)
}
