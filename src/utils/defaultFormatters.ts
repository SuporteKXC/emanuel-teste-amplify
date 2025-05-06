export const moeda = (value: any, currency = 'BRL') => {
  if (!value) value = 0;
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency,
  });
};

export const peso = (value: any) => {
  if (!value) value = 0;
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const truncate = (str?: string, maxLength: number = 8) =>{
  if(!str){str = ""} 
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
}
