import "intl";
import "intl/locale-data/jsonp/pt-BR";

export const cnpj = (value: any) => {
  if (!value) return "";
  return value.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
};

export const cpf = (value: any) => {
  if (!value) return "";
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const telefone = (value: any) => {
  if (!value) return "";
  if (value.length <= 10) {
    return value.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  if (value.length >= 11) {
    // para o formato (21) 98989-9898
    return value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
};

export const moeda = (value: any, currency = "BRL") => {
  if (!value) value = 0;
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency,
  });
};

export const riskClass = (value: number) => {
  if(!isNaN(value)) {
    if(parseInt(value.toString()) !== parseFloat(value.toString())) {
      return value.toFixed(1);
    }
  }

  return value;
}

export const cep = (value: any) => {
  if (!value) return "";
  return value.replace(/^(\d{5})(\d{3})/, "$1-$2");
};

export const extension = (filename: string) => {
  return filename.substring(filename.lastIndexOf(".") + 1);
};

export const validaCPF = (value: any) => {
  const cpf = value.replace(/[^\d]+/g, "");
  if (cpf === "") return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  )
    return false;
  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i += 1) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i += 1) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
};

export const validaCNPJ = (value: any) => {
  if (!value) return false;

  // Aceita receber o valor como string, número ou array com todos os dígitos
  const validTypes =
    typeof value === "string" ||
    Number.isInteger(value) ||
    Array.isArray(value);

  // Elimina valor em formato inválido
  if (!validTypes) return false;

  // Guarda um array com todos os dígitos do valor
  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false;

  // Elimina inválidos com todos os dígitos iguais
  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  // Cálculo validador
  const calc = (x: any) => {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  };

  // Separa os 2 últimos dígitos de verificadores
  const digits = numbers.slice(12);

  // Valida 1o. dígito verificador
  const digit0 = calc(12);
  if (digit0 !== digits[0]) return false;

  // Valida 2o. dígito verificador
  const digit1 = calc(13);
  return digit1 === digits[1];
};
