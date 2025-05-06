import {
  CompanyData,
  UserAlertData,
  ProductData,
  AlertTypeData,
} from "contracts";
import { TimelineTypeData } from "./Timeline";
import { SupplierData } from "./Supplier";
import { OrderFile } from "./OrderFile";

export interface OrderItemAlertData {
  id: number;
  message: string;
  alert_type_id: number;
  order_item_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  alert_type: AlertTypeData;
  userAlerts: UserAlertData[];
  order_item: OrderItemData;
}

export interface OrderItemData {
  id: number;
  [key: string]: any;
  gr_requested_date: Date;
  gr_expected: Date;
  gr_original: Date;
  gr_effective: Date;
  gr_actual: Date;
  ncm: string;
  po_number: string;
  customer_po: string;
  bdp_ref: string;
  eta_date: Date;
  qty: string;
  process_status: string;
  delay_status: string;
  process_critical: "0" | "1";
  register_date: string;
  data_do_registro_da_di: Date;
  item: string;
  doc_num: string;
  transport_doc_delivery_date: Date;
  uom: string;
  gross_weight: string;
  net_weight: string;
  invoice_currency: string;
  invoice_value: string;
  invoice_date: Date;
  order_id: number;
  modal: string;
  shipper: string;
  last_historic_update: Date;
  last_historic: string;
  shipper_address: string;
  destination: string;
  plant_destiny: string;
  carrier: string;
  agente_carga: string;
  channel: "VERDE" | "AMARELO" | "VERMELHO" | null;
  etd_date: Date;
  booking_confirmation_date: Date;
  booking_number: string;
  atd_date: Date;
  ata_date: Date;
  etb_date: Date;
  atb_date: Date;
  port_entry_date: Date;
  loading_at_the_terminal: Date;
  plant_delivery: Date;
  timeline: Date;
  docs_received_date: Date;
  protocol_mapa_in26_date: Date;
  post_import_license_release_date: Date;
  destination_harbor: string;
  revised_eta_date: Date;
  process_type: string;
  port_clearance: string;
  created_at: Date;
  updated_at: string;
  deleted_at: Date;
  canceled_at: Date;
  order: {
    id: number;
    order_reference: string;
    responsible_po: string;
    csr_name: string;
    product_id: number;
    company_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    company: Company;
    order_files:OrderFile[]
  };
  product_id: number;
  product: ProductData;
  timeline_type: TimelineTypeData
  order_item_alert: OrderItemAlertData[];
  shipment_tracking_code: string;
  current_vessel?: string;
  current_vessel_code?: string;
  current_latitude?: string;
  current_longitude?: string;
  last_position_update?: Date | null;
  carrier_code?: string;
  container_code?: string;
  user_favorit?: IUserFavorite[];
  customs_clearance_date?: Date;
  angle_rotate: string;
  container_type?: string;
  timelineEdited: RequestHistory;
  previsionEdited: RequestHistory;
  justification: any[]
  supplier: SupplierData
}

interface RequestHistory {
  created_at: Date;
  user: any;
  id: number;
  user_id: number;
  process: string;
  operation: string;
  description: string;
  status: string;
  status_message: string;
  body_response: string;
}
export interface IOrderItemLocation {
  lat: number;
  lng: number;
  rotate?: string | number;
}
export interface IOrderItemStatus {
  label: string;
  value: string;
}

export interface IOrderItemProcessTypes {
  label: string;
  value: string;
}

export interface IShipmentTracking {
  originPortActualDepartureUtc: string;
  finalPortPredictiveArrivalUtc: string;
  finalPortPredictiveArrivalUtcLast: string;

  transportationPlan?: IShipmentTrackingTransportationPlan;
}

export interface IShipmentTrackingTransportationPlan {
  vessels: IShipmentTrackingVessels[];
  events: IShipmentTrackingEvents[];
}

export interface IShipmentTrackingEvents {
  eventDatetime: string;
  eventTypeCode: "CDT" | "CLT";
  vessel: { shipId: number };
}

export interface IShipmentTrackingVessels {
  shipId: number;
  vesselName: string;
  vesselIMONumber: number;
  vesselMMSINumber: number;
  cdtDate?: string | null;
  cltDate?: string | null;
}

export interface IOrderItemDelay {
  delayTotal: DelayTotal;
  orderItemDelayCompany: DelayTotal[];
  tabelaDays: { [key: string]: TabelaDay };
}

export interface DelayTotal {
  adiantado: number;
  atrasado: number;
  total: number;
  adiantadoPorcent: number;
  atrasadoPorcent: number;
  company?: CompanyData;
}

export interface Company {
  [x: string]: any;
  id: number;
  name_fantasy: string;
  cnpj: string;
  consignee: string;
  plant_code: null | string;
  country: string | null;
  account_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface TabelaDay {
  itensTotal: number;
  numeroDateTotal: number;
  porcent: number;
  media: number;
  transitTime: number;
}

export interface IUserFavorite {
  id: string;
  user_id: string;
  order_item_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IFlightAddress {
  code: string;
  code_icao: string;
  code_iata: string;
  code_lid: string;
  timezone: string;
  name: string;
  city: string;
  airport_info_url: string;
}
export interface IFlightTracking {
  ident: string;
  ident_icao: string;
  ident_iata: string;
  fa_flight_id: string;
  operator: string;
  operator_icao: string;
  operator_iata: string;
  flight_number: string;
  registration: string;
  atc_ident: string | null;
  inbound_fa_flight_id: string;
  codeshares: Array<string>;
  codeshares_iata: Array<string>;
  blocked: boolean;
  diverted: boolean;
  cancelled: boolean;
  position_only: boolean;
  origin: IFlightAddress;
  destination: IFlightAddress;
  departure_delay: number;
  arrival_delay: number;
  filed_ete: number;
  foresight_predictions_available: boolean;
  scheduled_out: string;
  estimated_out: string;
  actual_out: string;
  scheduled_off: string;
  estimated_off: string;
  actual_off: string;
  scheduled_on: string;
  estimated_on: string;
  actual_on: string;
  scheduled_in: string;
  estimated_in: string;
  actual_in: string;
  progress_percent: number;
  status: string;
  aircraft_type: string;
  route_distance: number;
  filed_airspeed: number;
  filed_altitude: string;
  route: string;
  baggage_claim: string;
  seats_cabin_business: string;
  seats_cabin_coach: string;
  seats_cabin_first: string;
  gate_origin: string;
  gate_destination: string;
  terminal_origin: string;
  terminal_destination: string;
  type: string;
}

export interface ExportOrderItem {
  id: string;
	plant_destiny: string;
	po: string;
	item: string;
  customer_po: string;
	process_status: string;
	delay_status: string;
	process_critical: string;
	product_code: string;
	product_description: string;
	quantity: string;
	unity_of_measure: string;
	invoice_value: string;
	ncm: string | null;
	register_date: string;
	etd_date: string;
	atd_date: string | null;
	eta_date: string;
	ata_date: string;
	gr_original: string | null;
	gr_actual: string;
	booking_confirmation_date: string | null;
	booking_number: string;
	port_entry_date: string;
	docs_received_date: string | null;
	post_import_license_release_date: string | null;
	protocol_mapa_in26_date: string | null;
	data_do_registro_da_di: string;
	customs_clearance_date: string;
	invoice_date: string | null;
	doc_num: string;
	transport_doc_delivery_date: string;
	loading_at_the_terminal: string;
	plant_delivery: string;
	gr_effective: string;
	justifications: string | null;
  channel: "VERDE" | "AMARELO" | "VERMELHO" | null;
	updated_at: string;
  supplier_code: string;
  supplier_description: string;
  supplier_is_special: boolean | string;
}
