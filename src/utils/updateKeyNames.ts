export function updateKeyNames(arrayOfObjects: any[]): any[] {
  const updatedKeyNames: { [key: string]: string } = {
    "origem": "Origem",
    "business_unit": "Business unit",
    "bu": "BU",
    "product_id": "CÓDIGO",
    "product_description": "DESCRIÇÃO DO PRODUTO",
    "sale_qtd": "MÉDIA MENSAL FORECAST",
    "average_total": "Média Mensal / Total",
    "percentage": "%",
    "abc_category": "CURVA ABC FORECAST",
    "stock_qtd": "Estoque",
    "stock_sales_avg" : "Estoque / Média Mensal",
    "stock_sales_monthly_avg": "Estoque / Média Mensal * 30 dias",
    "abc_category_final": "CURVA ABC FINAL",
  };

  const updatedArray = arrayOfObjects.map(obj => {
    const { saleId, ...rest } = obj;
    return rest;
  });

  const renamedArray = updatedArray.map(obj => {
      const updatedObj: { [key: string]: any } = {};
      for (const key in obj) {
          if (updatedKeyNames[key]) {
              updatedObj[updatedKeyNames[key]] = obj[key];
          } else {
              updatedObj[key] = obj[key];
          }
      }
      return updatedObj;
  });

  return renamedArray;
}