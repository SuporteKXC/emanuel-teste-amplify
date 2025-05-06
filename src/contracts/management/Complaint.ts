export interface ComplaintData {
  id: number;
  isSentSupplier: number;
  userId: number;
  orderId: number;
  complaintResponsibleId: number;
  complaintImpactedAreaId: number;
  number: number;
  description: string;
  ncClosingDate: string;
  quantityDeviation: string;
  totalAmount: string;
  lote: string;
  materialDescription: string;
  materialCode: string;
  receivingPlant: string;
  responsibleAnalyst: string;
  siteShipper: string;
  invoiceNumber: string;
  po: string;
  receivedDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  user: User;
  complaintTypes: ComplaintType[];
  complaintImages: any[];
  impactedArea: ImpactedArea;
  responsible: Responsible;
  complaintMovementsSnapshot: ComplaintMovementSnapshot[];
  stockOrderProduct: StockOrderProduct
}

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: any;
  imageKey: string;
  isSuper: number;
  isService: number;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  firstAccess: number;
  lastAccess: string;
  passwordResetToken: string;
  rememberMeToken: any;
}

export interface ComplaintType {
  id: number;
  name: string;
  description: string;
  createdAt: any;
  updatedAt: any;
  deletedAt: any;
}

export interface ImpactedArea {
  id: number;
  name: string;
  createdAt: any;
  updatedAt: any;
  deletedAt: any;
}

export interface Responsible {
  id: number;
  name: string;
  description: string;
  created_at: any;
  updated_at: any;
  deleted_at: any;
}

export interface ComplaintMovementSnapshot {
  id: number;
  stockOrderId: number;
  stockElementId: number;
  sapQty: string;
  wmsQty: string;
  divergencyQty: string;
  sapImportDate: any;
  wsmImportDate: string;
  createdAt: string;
  updatedAt: string;
  regularizerId: any;
  regularizedAt: any;
  status?: string;
  stockOrders: StockOrders;
  stockElement: any;
}

export interface StockOrders {
  id: number;
  orderReference: string;
  invoiceNumber: string;
  orderId: number;
  sapImportDate: any;
  createdAt: string;
  updatedAt: string;
  order: Order;
}

export interface Order {
  id: number;
  order_reference: string;
  responsible_po: string;
  csr_name: string;
  product_id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  orderItem: OrderItem[];
  product: Product;
  company: Company;
}
export interface OrderItem {
  id: number;
  po_number: any;
  product_id: number;
  bdp_ref: any;
  eta_date: string;
  qty: string;
  process_status: string;
  delay_status: string;
  process_critical: string;
  register_date: string;
  item: string;
  doc_num: string;
  uom: string;
  gross_weight: any;
  net_weight: any;
  invoice_currency: string;
  invoice_value: string;
  invoice_date: any;
  carrier: string;
  agente_carga: string;
  plant_destiny: string;
  destination: string;
  shipper_address: string;
  last_historic: string;
  shipper: string;
  modal: string;
  post_import_license_release_date: any;
  protocol_mapa_in26_date: any;
  channel: string;
  docs_received_date: string;
  plant_delivery: string;
  loading_at_the_terminal: string;
  port_entry_date: string;
  ata_date: string;
  atd_date: string;
  etd_date: string;
  booking_confirmation_date: any;
  booking_number: string;
  gr_requested_date: any;
  gr_expected: any;
  gr_original: any;
  gr_effective: any;
  gr_actual: string;
  gr_actual_updated_count: number;
  transport_doc_delivery_date: string;
  nf_date: any;
  data_do_registro_da_di: string;
  last_position_update: any;
  current_longitude: any;
  current_latitude: any;
  angle_rotate: any;
  current_vessel_code: string;
  current_vessel: string;
  carrier_code: any;
  container_code: string;
  container_type: string;
  shipment_tracking_code: any;
  ncm: any;
  destination_harbor: string;
  need_li: string;
  li_number: string;
  last_historic_update: any;
  protocol_li_date: any;
  customs_clearance_date: string;
  revised_eta_date: any;
  process_type: string;
  port_clearance: string;
  supplier_id: number;
  order_id: number;
  created_at: string;
  updated_at: string;
  canceled_at: any;
  deleted_at: any;
  gr_actual_old: string;
  supplier: any;
}

interface Product {
  id: number;
  description: string;
  code: string;
  consignee: any;
  alertCritical: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

interface Company {
  id: number;
  nameFantasy: string;
  cnpj: string;
  consignee: string;
  plantCode: string;
  accountId: number;
  isShowStock: number;
  country: string;
}

interface StockOrderProduct {
  id: number
  complaintId: number | null
  productId: number
  orderId: number
}