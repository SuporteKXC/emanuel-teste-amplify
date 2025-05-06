import { format, isValid, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { CompanyDocumentType, WithAddress } from 'contracts/Common';

export class Formatter {
  public static date(
    dateString: string,
    options = { format: 'dd/MM/yyyy' }
  ): string {
    return format(this.getValidDate(dateString), options.format, {
      locale: ptBR,
    });
  }
  
  public static sumHours(
    dateString: string,
    options = { format: 'dd/MM/yyyy' },
    value = 1
  ): string {
    return format(
      addHours(this.getValidDate(dateString), value),
      options.format,
      {
        locale: ptBR,
      }
    );
  }

  public static dayOfWeek(
    dateString: string,
    options = { format: 'EEEE' }
  ): string {
    return format(this.getValidDate(dateString), options.format, {
      locale: ptBR,
    });
  }

  public static document(value: string, type?: CompanyDocumentType): string {
    if (type === 'other') {
      return value;
    }

    const clearValue = value.replace(/\D/g, '');

    if (clearValue.length === 11) {
      return this.cpf(clearValue);
    }

    return this.cnpj(clearValue);
  }

  public static cnpj(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
  }

  public static cpf(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  public static cep(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{3})(\d{3})/g, '$1.$2-$3');
  }

  public static minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;

    const h = hours < 10 ? `0${hours}` : `${hours}`;
    const m = minutesLeft < 10 ? `0${minutesLeft}` : `${minutesLeft}`;
    return `${h}:${m}`;
  }

  public static timeToMinutes(time: string): number {
    const [h, m] = time.split(':');
    return Number(h) * 60 + Number(m);
  }

  private static getValidDate(dateString: string): Date {
    const validString = dateString.replace(' ', 'T');
    if (!isValid(new Date(validString))) {
      throw new Error(
        `A string ${dateString} não pode ser convertida em um objeto do tipo Date`
      );
    }
    return new Date(validString);
  }

  public static weight(weight: number, unit = 'Kg'): string {
    return `${weight.toLocaleString('pt-BR')} ${unit}`;
  }

  public static currency(
    value: number,
    currency: 'BRL' | 'USD' = 'BRL'
  ): string {
    const locale = currency === 'BRL' ? 'pt-BR' : 'en-US';

    return value.toLocaleString(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    });
  }

  public static address(
    subject: Omit<WithAddress, 'addressLatitude' | 'addressLongitude' | 'ibge'>
  ): string {
    const {
      addressStreet,
      addressNumber,
      addressComplement,
      addressNeighborhood,
      addressCity,
      addressZipcode,
      addressState,
    } = subject;

    let address = `${addressStreet}`;

    address += addressNumber ? `, ${addressNumber}` : ', S/N';
    address += addressComplement ? ` - ${addressComplement}` : '';
    address += addressNeighborhood ? `, ${addressNeighborhood}` : '';

    address += ` - ${addressCity}/${addressState}`;

    address += addressZipcode ? `, CEP ${addressZipcode}` : '';

    return address;
  }
}
