import type { CarrierDocumentType, WithAddress } from "contracts";
import { format, isValid, formatISO, parseISO, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatInTimeZone, format as formatZone } from "date-fns-tz";

export class Formatter {
  public static date(
    dateString: string,
    options = { format: "dd/MM/yyyy" }
  ): string {
    return formatZone(this.getValidDate(dateString), options.format, {
      locale: ptBR,
      timeZone: "America/Sao_Paulo",
    });
  }

  public static datePicker(
    dateString: string,
    options = { format: "yyyy-MM-dd" }
  ): string {
    return formatZone(this.getValidDate(dateString), options.format, {
      locale: ptBR,
      timeZone: "America/Sao_Paulo",
    });
  }

  public static dateFull(
    dateString: string,
    options = { format: "dd/MM/yyyy HH:mm:ss" }
  ): string {
    return formatZone(this.getValidDate(dateString), options.format, {
      locale: ptBR,
      timeZone: "America/Sao_Paulo",
    });
  }

  public static dateHour(
    dateString: string,
    options = { format: "dd/MM/yyyy HH:mm" }
  ): string {
    return formatZone(this.getValidDate(dateString), options.format, {
      locale: ptBR,
      timeZone: "America/Sao_Paulo",
    });
  }

  public static dateToApi(
    dateString: string,
    options = { format: "yyyy-MM-dd HH:mm:ss" }
  ): string {
    return formatZone(this.getValidDate(dateString), options.format, {
      locale: ptBR,
      timeZone: "America/Sao_Paulo",
    });
  }

  public static dateToTime(
    dateString: string,
    options = { format: "yyyy-MM-dd" }
  ): string {
    return formatZone(
      parse(dateString, "dd/MM/yyyy", new Date()),
      options.format
    );
  }

  public static dateToISO(
    dateString: string,
    options = { format: "dd/MM/yyyy" }
  ): string {
    if (!isValid(new Date(dateString))) {
      return "";
    }

    const formatted = formatZone(parseISO(dateString), options.format, {
      locale: ptBR,
      timeZone: "America/Sao_Paulo",
    });

    return formatISO(new Date(formatted));
  }

  public static dayOfWeek(
    dateString: string,
    options = { format: "EEEE" }
  ): string {
    return format(this.getValidDate(dateString), options.format, {
      locale: ptBR,
    });
  }

  private static getValidDate(dateString: string): Date {
    const validString = dateString.replace(" ", "T");
    if (!isValid(new Date(validString))) {
      throw new Error(
        `The string ${dateString} cannot be converted to a valid date.`
      );
    }
    return new Date(validString);
  }

  public static document(value?: string, type?: CarrierDocumentType): string {
    if (!value) return "";
    if (type === "other") return value;

    const clearValue = value.replace(/\D/g, "");

    if (clearValue.length === 11) {
      return this.cpf(clearValue);
    }

    return this.cnpj(clearValue);
  }

  public static cnpj(value: string): string {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
  }

  public static cpf(value: string): string {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }

  public static cep(value: string): string {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{3})(\d{3})/g, "$1.$2-$3");
  }

  public static weight(weight: number, unit = "Kg"): string {
    return `${weight.toLocaleString("pt-BR")} ${unit}`;
  }

  public static currency(
    value: number,
    currency: "BRL" | "USD" = "BRL"
  ): string {
    const locale = currency === "BRL" ? "pt-BR" : "en-US";

    return value.toLocaleString(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    });
  }

  public static decimal(value: number): string {
    const locale = "pt-BR";

    return value.toLocaleString(locale, {
      style: "decimal",
      minimumFractionDigits: 3,
    });
  }

  public static minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;

    const h = hours < 10 ? `0${hours}` : `${hours}`;
    const m = minutesLeft < 10 ? `0${minutesLeft}` : `${minutesLeft}`;
    return `${h}:${m}`;
  }

  public static timeToMinutes(time: string): number {
    const [h, m] = time.split(":");
    return Number(h) * 60 + Number(m);
  }

  public static address(
    subject: Omit<WithAddress, "addressLatitude" | "addressLongitude" | "ibge">
  ): string {
    const {
      addressStreet,
      addressNumber,
      addressComplement,
      addressNeighborhood,
      addressState,
      addressCity,
      addressZipcode,
      addressCountry,
    } = subject;

    let address = `${addressStreet}`;

    address += addressNumber ? `, ${addressNumber}` : ", S/N";
    address += addressComplement ? ` - ${addressComplement}` : "";
    address += addressNeighborhood ? `, ${addressNeighborhood}` : "";

    address += addressState
      ? ` - ${addressCity}/${addressState}`
      : ` - ${addressCity}`;

    address += addressZipcode ? `, CEP ${addressZipcode}` : "";

    address += addressCountry ? ` - ${addressCountry}` : "";

    return address;
  }

  public static snakeToCamel<T>(object: T | T[]): T | any[] {
    if (object === null || typeof object !== "object") {
      return object;
    }

    if (Array.isArray(object)) {
      return object.map((item) => Formatter.snakeToCamel(item)) as any[];
    }

    const camelObj: any = {};

    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        const camelKey = key.replace(/_([a-z])/g, (match, letter) =>
          letter.toUpperCase()
        );
        camelObj[camelKey] = Formatter.snakeToCamel(object[key]);
      }
    }

    return camelObj as T;
  }

  public static dateOrEmpty(probableDate: string | null | undefined): string {
    if (!probableDate) return "--";
    const newDate = new Date(probableDate);
    const date = isValid(newDate);
    return date ? newDate.toLocaleDateString("pt-BR") : "--/--/----";
  }

  public static dateOrSelf(probableDate: string | null | undefined): string {
    if (!probableDate) return "--";
    const newDate = new Date(probableDate);
    const date = isValid(newDate);
    return date
      ? newDate.toLocaleDateString("pt-BR")
      : probableDate || "--/--/----";
  }

  public static nativeFormat(date: string, format = "dd/MM/yyyy"): string {
    return formatInTimeZone(date, 'utc', format)
  }
}
