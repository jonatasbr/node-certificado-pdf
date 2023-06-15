import fs from 'fs';
import PDFDocument from 'pdfkit';
import { LoadData } from './LoadData';
import dotenv from 'dotenv';

dotenv.config();
export class GenerateCertification {
  async execute() {
    const load_data = new LoadData();
    const data = await load_data.execute();
    const IMAGE = fs.readFileSync(
      `src/images/${process.env.IDENTIFIER_CODE}.jpeg`,
    );
    data.map(async (participant) => {
      const pdf = new PDFDocument({
        layout: 'landscape',
      });
      pdf.image(IMAGE, 0, 0, { width: 790, height: 610 });
      pdf.moveDown(16);
      pdf
        .font('Times-Roman')
        .fontSize(25)
        .fillColor('#022777')
        .text(`${participant.name}`, { align: 'center' });
      pdf
        .font('Times-Roman')
        .fontSize(20)
        .fillColor('#022777')
        .text(`${participant.cpf}`, { align: 'center' });
      pdf.pipe(
        fs.createWriteStream(
          `src/export-pdf/${process.env.IDENTIFIER_CODE}/${participant.cpf}.pdf`,
        ),
      );
      pdf.end();
    });
  }
}
