import { JustificationSales } from "../justificationSales"
import { SalesOrderItem } from "../salesOrderItem"
import { Document } from "../trackingDelivery"

export interface SalesOrder {
  document: Document
  id: number
  order_reference: string
  company_id: string
  status: string
  delivery_document_number: string | null
  delivery_date: string
  deadline_date: string
  emission_date: string
  client_id?: string
  company: Company
  client: Client
  carrier_id:string
  carrier: Carrier
  document_id?: number
  sales_order_itens: SalesOrderItem[]
  justification_sales: JustificationSales[];
  route: string
}

export interface Company {
  id: number
  nameFantasy: string
  plantCode: string
}

export interface Client {
  id: number
  tradeName: string
}

export interface Carrier {
  id: number
  tradeName: string
}

export interface Indicators {
  salesOrdertotal: number;
  pending: {
    total: number;
    withDelay: number;
    percentageOfTotal: number;
  };
  sales: {
    total: number;
    percentageOfTotal: number;
  };
  inTransit: {
    total: number;
    percentageOfTotal: number;
  };
  delivered: {
    total: number;
    percentageOfTotal: number;
  };
}