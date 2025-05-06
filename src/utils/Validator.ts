import { Formatter } from 'utils';
import { CompanyDocumentType } from 'contracts/Common';
import { differenceInDays } from 'date-fns';
import { IValidator } from 'contracts/Validator';

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

  public static isValidCNH: IValidator = (CNH, { createError }) => {
    if (!CNH) return true;

    try {
      const cleanCNH = CNH.replace(/[^\d]+/g, '');

      if (cleanCNH.length !== 11) {
        throw new Error('CNH inválido');
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

      if (invalidOnes.includes(cleanCNH)) {
        throw new Error('CNH inválido');
      }

      var s1, s2;
      for (var c = (s1 = s2 = 0), p = 9; c < 9; c++, p--) {
        s1 += parseInt(cleanCNH[c]) * p;
        s2 += parseInt(cleanCNH[c]) * (10 - p);
      }
      const mood = s1 % 11;
      const D1 = mood > 9 ? 0 : mood;
      const D2 = (s2 % 11) - (D1 > 9 ? 2 : 0);
      const check = D2 < 0 ? D2 + 11 : D2 > 9 ? 0 : D2;

      if (!(cleanCNH.slice(-2) === String(D1) + String(check))) {
        throw Error('CNH inválido');
      }

      return true;
    } catch (error: any) {
      return createError({
        message: error?.message,
      });
    }
  };

  public static validateDocument(
    document: string,
    documentType: CompanyDocumentType
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

  public static validateDriverName: IValidator = (value, { createError }) => {
    try {
      if (!value) return true;
      const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
      if (!regex.test(value)) {
        throw new Error('Nome inválido');
      }
      return true;
    } catch (error: any) {
      return createError({
        message: error?.message,
      });
    }
  };

  public static validateExpiration(date: string, base = 60): string | void {
    const validDate = Formatter.date(date, { format: 'yyyy-MM-dd' });
    const expiryDate = differenceInDays(new Date(validDate), new Date());

    if (expiryDate >= base) {
      return;
    } else if (expiryDate < base && expiryDate > 0) {
      return 'alert';
    } else {
      return 'expired';
    }
  }

  public static validateVehiclePlate: IValidator = (plate, { createError }) => {
    if (!plate) return true;

    try {
      plate = plate.replace(/\s+/g, '').toUpperCase();

      if (!/^[A-Z]{3}\d{4}$/.test(plate)) {
        throw new Error('Placa inválida');
      }

      const invalidSequences = [
        'AAA0',
        'AAA1',
        'AAA2',
        'AAA3',
        'AAA4',
        'AAA5',
        'AAA6',
        'AAA7',
        'AAA8',
        'AAA9',
        'A0A0',
        'A1A1',
        'A2A2',
        'A3A3',
        'A4A4',
        'A5A5',
        'A6A6',
        'A7A7',
        'A8A8',
        'A9A9',
        '000A',
        '111A',
        '222A',
        '333A',
        '444A',
        '555A',
        '666A',
        '777A',
        '888A',
        '999A',
        '0000',
        '1111',
        '2222',
        '3333',
        '4444',
        '5555',
        '6666',
        '7777',
        '8888',
        '9999',
      ];

      const isInvalid = invalidSequences.some((value) => plate.includes(value));

      if (isInvalid) throw new Error('Placa inválida');

      return true;
    } catch (error: any) {
      return createError({
        message: error?.message,
      });
    }
  };
}
