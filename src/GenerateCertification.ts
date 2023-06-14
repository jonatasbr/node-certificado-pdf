import fs from 'fs';
import PDFDocument from 'pdfkit';
import { LoadData } from './LoadData';

export class GenerateCertification {
  async execute() {
    const load_data = new LoadData();
    const data = await load_data.execute('src/data/data.csv');
    const IMAGE = fs.readFileSync('src/images/certificado.jpg');
    data.map(async (participant) => {
      const pdf = new PDFDocument({
        layout: 'landscape',
      });
      pdf.image(IMAGE, -56, -25, { width: 900, height: 662 });
      pdf.moveDown(16);
      pdf
        .font('Times-Roman')
        .fontSize(25)
        .fillColor('#022777')
        .text(`${participant.name}`, { align: 'center' });
      pdf.pipe(fs.createWriteStream(`src/export-pdf/${participant.cpf}.pdf`));
      pdf.end();
    });
  }
}
