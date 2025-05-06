interface DefaultCompany {
  id: number;
  tradeName: string;
}
interface Document {
  id: number;
  documentNumber: string;
  documentDigit: string;
  chaveNfe: string;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  emissionDate: string;
  deadlineDate?: string | null;
  deliveryDate: string;
  company: DefaultCompany;
  client: DefaultCompany;
  carrier: DefaultCompany;
}

export type IDeliveryVoucherStatus =
  | "approved"
  | "analise"
  | "rejected"
  | "pending";
export interface DeliveryVoucher {
  id: number;
  fileName: string;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  rejectedReason?: string | null;
  document: Document;
  status: IDeliveryVoucherStatus;
}
