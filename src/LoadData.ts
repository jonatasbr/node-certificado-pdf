import csvParse from 'csv-parse';
import fs from 'fs';
export interface IParticipantData {
  cpf: string;
  name: string;
}

export class LoadData {
  async execute(file): Promise<IParticipantData[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream('src/data/data.csv');
      const participants: IParticipantData[] = [];

      const parseFile = csvParse({ delimiter: ';' });

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [cpf, name] = line;

          console.log(cpf, name);
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
