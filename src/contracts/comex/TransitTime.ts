export interface ITransitTime {
  id?: number;
  cnpj?: string;
  modal?: string;
  critical?: boolean | number;
  port_entry_date?: number;
  post_import_license_release_date?: number;
  protocol_mapa_in26_date?: number;
  data_do_registro_da_di?: number;
  nf_date?: number;
  customs_clearance_date?: number;
  transport_doc_delivery_date?: number;
  loading_at_the_terminal?: number;
  entrega_na_planta?: number;
  gr_efetivo?: number;
  product_id?: number;
  account_id?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}
