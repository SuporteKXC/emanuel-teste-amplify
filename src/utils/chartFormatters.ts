interface Sale {
  "saleId": number;
  "origem": string;
  "business_unit": string;
  "bu": string;
  "product_id": number;
  "product_description": string;
  "sale_qtd": string;
  "average_total": string;
  "percentage": string;
  "abc_category": string;
  "abc_category_final": string;
}

import { BarDatum } from "@nivo/bar";

export function originGroup(data: Sale[], type: String): BarDatum[] {
  const groupedData: any = data.reduce(
    (acc, entry) => {
      const { origem, abc_category, sale_qtd } = entry;
      if (!acc[origem]) {
        acc[origem] = {
          'Origem': origem,
          'A': 0,
          'B': 0,
          'C': 0,
          'Total': 0,
          'AColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          'BColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          'CColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
        };
      }

      const saleQuantity = parseFloat(sale_qtd);

      // Accumulate the values based on "abc_category_final" or "abc_category"
      if (abc_category === 'A') {
        acc[origem].A += saleQuantity; 
      } else if (abc_category === 'B') {
        acc[origem].B += saleQuantity; 
      } else if (abc_category === 'C') {
        acc[origem].C += saleQuantity; 
      }

      acc[origem].Total += saleQuantity;

      return acc;
    },
    {} as { [key: string]: any }
  );

  //percorrer o groupedData e calcular os % de A, B e C por origem, arredondando os valores pra 2 casas decimais
  if(type === 'percentage') {
    Object.keys(groupedData).forEach((key) => {
      const total = groupedData[key].Total;
      groupedData[key].A = ((groupedData[key].A / total) * 100).toFixed(1);
      groupedData[key].B = ((groupedData[key].B / total) * 100).toFixed(1);
      groupedData[key].C = ((groupedData[key].C / total) * 100).toFixed(1);
    });
  } else {
    Object.keys(groupedData).forEach((key) => {
      groupedData[key].A = groupedData[key].A.toFixed(2);
      groupedData[key].B = groupedData[key].B.toFixed(2);
      groupedData[key].C = groupedData[key].C.toFixed(2);
    });
  }

  // Convert the grouped data object into an array
  return Object.values(groupedData);
}

export function originGroupReclass(data: Sale[], type: String): BarDatum[] {
  const groupedData: any = data.reduce(
    (acc, entry) => {
      const { origem, abc_category, sale_qtd, abc_category_final } = entry;
      if (!acc[origem]) {
        acc[origem] = {
          'Origem': origem,
          'A': 0,
          'B': 0,
          'C': 0,
          'Total': 0,
          'AColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          'BColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          'CColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
        };
      }

      const saleQuantity = parseFloat(sale_qtd);

      // Accumulate the values based on "abc_category"
      if (abc_category === 'A' && abc_category_final === '') {
        acc[origem].A += saleQuantity; 
      } else if (abc_category === 'B' && abc_category_final === '') {
        acc[origem].B += saleQuantity; 
      } else if (abc_category === 'C' || abc_category_final === 'C') {
        acc[origem].C += saleQuantity; 
      }

      acc[origem].Total += saleQuantity;

      return acc;
    },
    {} as { [key: string]: any }
  );

  //percorrer o groupedData e calcular os % de A, B e C por origem, arredondando os valores pra 2 casas decimais
  if(type === 'percentage') {
    Object.keys(groupedData).forEach((key) => {
      const total = groupedData[key].Total;
      groupedData[key].A = ((groupedData[key].A / total) * 100).toFixed(1);
      groupedData[key].B = ((groupedData[key].B / total) * 100).toFixed(1);
      groupedData[key].C = ((groupedData[key].C / total) * 100).toFixed(1);
    });
  } else {
    Object.keys(groupedData).forEach((key) => {
      groupedData[key].A = groupedData[key].A.toFixed(2);
      groupedData[key].B = groupedData[key].B.toFixed(2);
      groupedData[key].C = groupedData[key].C.toFixed(2);
    });
  }

  // Convert the grouped data object into an array
  return Object.values(groupedData);
}

export function businessUnitGroup(data: Sale[], type: String): BarDatum[] {
  const groupedData: any = data.reduce(
    (acc, entry) => {
      const { business_unit, abc_category, sale_qtd } = entry;
      if (!acc[business_unit]) {
        acc[business_unit] = {
          'Business Unit': business_unit,
          'A': 0,
          'B': 0,
          'C': 0,
          'Total': 0,
          'AColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          'BColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          'CColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
        };
      }

      const saleQuantity = parseFloat(sale_qtd);

      // Accumulate the values based on "abc_category"
      if (abc_category === 'A') {
        acc[business_unit].A += saleQuantity; 
      } else if (abc_category === 'B') {
        acc[business_unit].B += saleQuantity; 
      } else if (abc_category === 'C') {
        acc[business_unit].C += saleQuantity; 
      }

      acc[business_unit].Total += saleQuantity;

      return acc;
    },
    {} as { [key: string]: any }
  );

  //percorrer o groupedData e calcular os % de A, B e C por origem, arredondando os valores pra 2 casas decimais
  if(type === 'percentage') {
    Object.keys(groupedData).forEach((key) => {
      const total = groupedData[key].Total;
      groupedData[key].A = ((groupedData[key].A / total) * 100).toFixed(1);
      groupedData[key].B = ((groupedData[key].B / total) * 100).toFixed(1);
      groupedData[key].C = ((groupedData[key].C / total) * 100).toFixed(1);
    });
  } else {
    Object.keys(groupedData).forEach((key) => {
      groupedData[key].A = groupedData[key].A.toFixed(2);
      groupedData[key].B = groupedData[key].B.toFixed(2);
      groupedData[key].C = groupedData[key].C.toFixed(2);
    });
  }

  // Convert the grouped data object into an array
  return Object.values(groupedData);
}

export function businessUnitGroupReclass(data: Sale[], type: String): BarDatum[] {
  const groupedData: any = data.reduce(
    (acc, entry) => {
      const { business_unit, abc_category, sale_qtd, abc_category_final } = entry;
      if (!acc[business_unit]) {
        acc[business_unit] = {
          'Business Unit': business_unit,
          'A': 0,
          'B': 0,
          'C': 0,
          'Total': 0,
          'AColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          'BColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          'CColor': `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
        };
      }

      const saleQuantity = parseFloat(sale_qtd);

      // Accumulate the values based on "abc_category"
      if (abc_category === 'A' && abc_category_final === '') {
        acc[business_unit].A += saleQuantity; 
      } else if (abc_category === 'B' && abc_category_final === '') {
        acc[business_unit].B += saleQuantity; 
      } else if (abc_category === 'C' || abc_category_final === 'C') {
        acc[business_unit].C += saleQuantity; 
      }

      acc[business_unit].Total += saleQuantity;

      return acc;
    },
    {} as { [key: string]: any }
  );

  //percorrer o groupedData e calcular os % de A, B e C por origem, arredondando os valores pra 2 casas decimais
  if(type === 'percentage') {
    Object.keys(groupedData).forEach((key) => {
      const total = groupedData[key].Total;
      groupedData[key].A = ((groupedData[key].A / total) * 100).toFixed(1);
      groupedData[key].B = ((groupedData[key].B / total) * 100).toFixed(1);
      groupedData[key].C = ((groupedData[key].C / total) * 100).toFixed(1);
    });
  } else {
    Object.keys(groupedData).forEach((key) => {
      groupedData[key].A = groupedData[key].A.toFixed(2);
      groupedData[key].B = groupedData[key].B.toFixed(2);
      groupedData[key].C = groupedData[key].C.toFixed(2);
    });
  }

  // Convert the grouped data object into an array
  return Object.values(groupedData);
}