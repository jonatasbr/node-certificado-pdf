interface IData {
  cpf: string;
  name: string;
}

export class LoadData {
  execute(): IData[] {
    const data: IData[] = [
      { cpf: '73120804134', name: 'JONATAS BRAZ DE SOUSA' },
      { cpf: '98765432100', name: 'HENOR VATSON HELER' },
      { cpf: '10212348533', name: 'HENRIQUE SILVA BRAZ' },
      { cpf: '45687792315', name: 'JULIA CAROLINE SILVA BRAZ' },
      { cpf: '15642289123', name: 'VICTOR MARQUES FREIRE' },
      { cpf: '75338158742', name: 'DIEGO ALVES DE SOUSA' },
    ];
    return data;
  }
}
