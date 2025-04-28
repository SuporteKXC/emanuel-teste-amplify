export interface CarrierPrediction {
  id: number;
  invoice_id: number;
  carrier_id: number;
  invoice_geolocation_id: number;
  delivery_prediction_date: string;
  created_at: string;
}
