import fs from 'fs';
import PDFDocument from 'pdfkit';
import { IParticipantData, LoadData } from './LoadData';

export class GenerateCertification {
  async execute() {
    const load_data = new LoadData();
    load_data
      .execute('src/data/data.csv')
      .then((participants: IParticipantData[]) => {
        participants.map((participant) => {
          const IMAGE = fs.readFileSync('src/images/certificado.jpg');
          const pdf = new PDFDocument({
            layout: 'landscape',
          });

          pdf.image(IMAGE, -56, -25, { width: 900, height: 662 });
          pdf.moveDown(16);
          pdf
            .font('Times-Roman')
            .fontSize(25)
            .fillColor('#025999')
            .text(`${participant.name}`, { align: 'center' });
          pdf.pipe(
            fs.createWriteStream(`src/export-pdf/${participant.cpf}.pdf`),
          );
          pdf.end();
        });
      });
  }
}
