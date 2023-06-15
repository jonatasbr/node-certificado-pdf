import csvParse from 'csv-parse';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
export interface IParticipantData {
  cpf: string;
  name: string;
}

export class LoadData {
  async execute(): Promise<IParticipantData[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(
        `src/data/${process.env.IDENTIFIER_CODE}.csv`,
      );
      const participants: IParticipantData[] = [];

      const parseFile = csvParse({ delimiter: ';' });

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, cpf] = line;
          participants.push({
            cpf,
            name,
          });
          return participants;
        })
        .on('end', () => {
          resolve(participants);
          return participants;
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
}
