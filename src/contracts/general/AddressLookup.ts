export interface AddressLookupData {
  igbe: string;
  addressString?: string;
  addressNeighborhood?: string;
  addressCity: string;
  addressState: string;
  addressUf: string;
  addressLatitude: number;
  addressLongitude: number;
}

export interface City {
  id: number;
  name: string;
  state: string;
  ibge: string;
}
