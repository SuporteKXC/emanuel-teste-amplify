import { CarrierDocumentType } from 'contracts';

export class Validator {
  public static isValidCNPJ(cnpj: string): boolean {
    const cleanCnpj = cnpj.replace(/[^\d]+/g, '');

    if (cleanCnpj.length !== 14) {
      return false;
    }

    const invalidOnes: Array<string> = [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999',
    ];

    if (invalidOnes.includes(cleanCnpj)) {
      return false;
    }

    const getVerifierDigit = (digits: string): number => {
      let index: number = 2;
      const numbers: number[] = Array.from(digits).map(Number);
      const reverse: number[] = numbers.reverse();

      const sum: number = reverse.reduce((acc, curr) => {
        acc += curr * index;
        index = index === 9 ? 2 : index + 1;
        return acc;
      }, 0);

      const mod: number = sum % 11;
      return mod < 2 ? 0 : 11 - mod;
    };

    let numbers: string = cleanCnpj.substring(0, 12);
    numbers += getVerifierDigit(numbers);
    numbers += getVerifierDigit(numbers);

    return (
      numbers.substring(numbers.length - 2) ===
      cleanCnpj.substring(cleanCnpj.length - 2)
    );
  }

  public static isValidCPF(cpf: string): boolean {
    const cleanCpf = cpf.replace(/[^\d]+/g, '');

    if (cleanCpf.length !== 11) {
      return false;
    }

    const invalidOnes: Array<string> = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ];

    if (invalidOnes.includes(cleanCpf)) {
      return false;
    }

    const getVerifierDigit = (digits: string): number => {
      const numbers: number[] = Array.from(digits).map(Number);
      const multiplied: number[] = numbers.map(
        (n, i) => n * (numbers.length + 1 - i)
      );
      const mod: number = multiplied.reduce((acc, curr) => acc + curr) % 11;
      return mod < 2 ? 0 : 11 - mod;
    };

    let numbers: string = cleanCpf.substring(0, 9);
    numbers += getVerifierDigit(numbers);
    numbers += getVerifierDigit(numbers);

    return (
      numbers.substring(numbers.length - 2) ===
      cleanCpf.substring(cleanCpf.length - 2)
    );
  }

  /**
   * This one will validate both CPF and CNPJ
   * and will throw an error if the document is invalid
   */
  public static validateDocument(
    document: string,
    documentType: CarrierDocumentType
  ): void {
    if (documentType === 'cnpj') {
      if (!document) throw new Error('Informe o CNPJ');
      if (!this.isValidCNPJ(document)) throw new Error('CNPJ inválido');
    }

    if (documentType === 'cpf') {
      if (!document) throw new Error('Informe o CPF');
      if (!this.isValidCPF(document)) throw new Error('CPF inválido');
    }

    if (!document) throw new Error('Informe o documento');
  }
}
