import { UserData } from "contracts/general";
import { IImportFilter } from "store/ducks/management";


export interface ImportListQuery {
    snapshotDate: string;
    companyId?: number;
    productId?: number;
    batch?: string;
    page?: number;
    limit?: number;
  }

interface StockOrderProduct {
  id: number
  orderId: number
  productId: number
  complaintId: number | null
}
interface Order {
    id: number
    order_reference: string
    responsible_po: string
    stockOrderProduct: StockOrderProduct
    csr_name: string
    product_id: number
    company_id: number
    created_at: string
    updated_at: string
    deleted_at: any
    company: Company
    product: Product
    status: keyof typeof STATUS
    orderItem: any[]
  }

  interface Company {
    id: number
    nameFantasy: string
    cnpj: string
    consignee: string
    plantCode: string
    accountId: number
    country: any
  }

  interface Product {
    id: number
    description: string
    code: string
    consignee: any
    alertCritical: number
    createdAt: string
    updatedAt: string
    deletedAt: any
  }

  export interface ImportExportData extends ImportListData {}
  export interface ImportExportQuery extends IImportFilter {}

  interface Totals{
    comex: number,
    sap: number,
    wms: number
  }
  export interface ImportListData {
    id: number
    orderReference: string
    invoiceNumber: string
    total: Totals
    orderId: number
    order: Order
    createdAt: string
    updatedAt: string
    status?: string
    stockMovementsSnapshot: StockMovementsSnapshot[]
    productId: number
    product: Product
  }

  export enum STATUS {
    FINALIZADO = 'FINALIZADO',
    // AGUARDANDO_WMS = 'AGUARDANDO PLANILHA WMS',
    AGUARDANDO_SAP = 'AGUARDANDO PLANILHA SAP',
    AGUARDANDO_RECEBIMENTO = 'AGUARDANDO RECEBIMENTO FÍSICO',
    AGUARDANDO_COMPLAINT = 'AGUARDANDO COMPLAINT',
    AGUARDANDO_FINALIZACAO = 'AGUARDANDO FINALIZAÇÃO',
    // AGUARDANDO_PLANILHAS = "AGUARDANDO PLANILHAS"
  }

  export interface StockMovementsSnapshot {
    id: number
    stockOrderId: number
    stockElementId: number
    sapQty: string
    wmsQty: string
    status: keyof typeof STATUS
    divergencyQty: string
    sapImportDate: string
    wsmImportDate: string
    regularizerId: any
    regularizedAt: string
    createdAt: string
    updatedAt: string
    defectTypeId: number
    defectQty: number
    stockElement: StockElement
    complaint: Complaint[]
    whoisRegularizer: WhoisRegularizer
  }

  export interface WhoisRegularizer {
    id: number
    name: string
    email: string
  }

  interface StockElement {
    id: number
    batch: string
    companyId: number
    productId: number
    storageLocationId: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    product: Product
  }

  export interface ComplaintResponsible {
    id: number
    name: string
    description: string
    createdAt: any
    updatedAt: any
    deletedAt: any
  }

  export interface Complaint {
    id: number
    stockMovementsSnapshotId: number
    userId: number
    number: number
    description: string
    createdAt: any
    updatedAt: any
    deletedAt: any
    user: UserData
    responsible?: ComplaintResponsible
  }
  
  export interface InsertComplaintData {
    stockMovementsSnapshotId: number
    userId: number
    number: number
    description: string
    createdAt: string
    updatedAt: string
    id: number
  }
  