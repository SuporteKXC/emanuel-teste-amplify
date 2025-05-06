import { SalesOrder } from '@/contracts/salesOrder'
import { DateTime } from 'luxon'

export function generateSalesIndicators(salesOrder: SalesOrder[]): any {

  const salesOrderArray = (salesOrder: SalesOrder[]) => {
    // console.log("TOTAL -> ",salesOrder.length)
    const deliveryArray: SalesOrder[] = [];
    const inTransitArray: SalesOrder[] = [];
    const salesArray: SalesOrder[] = [];
    const pendingArray: SalesOrder[] = [];
    
    salesOrder.forEach((element) => {
      if(element.status === "entregue") {
        deliveryArray.push(element);
      } else if(element.status === "em_transito") {
        inTransitArray.push(element);
      } else if(element.status === "faturado") {
        salesArray.push(element);
      } else {
        pendingArray.push(element);
      }
    })

    return {
      deliveryArray,
      inTransitArray,
      salesArray,
      pendingArray
    }
  }


  const salesOrdertotal = salesOrder.length;
  const { deliveryArray, inTransitArray, salesArray, pendingArray } = salesOrderArray(salesOrder);

  const deliveryTotal = deliveryArray.length;
  const inTransitTotal = inTransitArray.length;
  const salesTotal = salesArray.length;
  const pendingTotal = pendingArray.length;

  return {
    salesOrdertotal,
    pending: {
      total: pendingTotal,
      percentageOfTotal: Number(((pendingTotal / salesOrdertotal) * 100).toFixed(2)),
    },
    sales: {
      total: salesTotal,
      percentageOfTotal: Number(((salesTotal / salesOrdertotal) * 100).toFixed(2)),
    },
    inTransit: {
      total: inTransitTotal,
      percentageOfTotal: Number(((inTransitTotal / salesOrdertotal) * 100).toFixed(2)),
    },
    delivered: {
      total: deliveryTotal,
      percentageOfTotal: Number(((deliveryTotal / salesOrdertotal) * 100).toFixed(2)),
    },
  }
}