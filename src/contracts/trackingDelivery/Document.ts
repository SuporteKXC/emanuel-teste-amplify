// import { DateTime } from "luxon"
import { Geolocation } from "./Geolocation"
import { DocumentOccurrence } from "./DocumentOccurrence"
import { InvoiceStatus } from "@/components/trackingDelivery/InvoiceStatusIcons"
import { DocumentItem } from "./DocumentItem"
import { DocumentJustification } from "./DocumentJustification"

export interface Document {
  chaveNfe: any
  id: number
  documentNumber: string
  documentDigit: string
  originAddress: string
  originCity: string
  originState: string
  originCountry: string
  originZipcode: string
  destinationAddress: string
  destinationCity: string
  destinationState: string
  destinationCountry: string
  destinationZipcode: string
  emissionDate: string
  deliveryDate: string
  deadlineDate: string
  canceledAt: string
  companyId: number
  company: Company & { cnpj: string }
  clientId: number
  client: Client & { cnpj: string }
  carrierId: number
  carrier: Carrier & { cnpj: string }
  distance: number
  duration: number
  status: InvoiceStatus
  documentItems: DocumentItem[]
  documentGeolocations: Geolocation[]
  documentOccurrences: DocumentOccurrence[]
  documentJustifications: DocumentJustification[]
  redespacho: boolean
  harbor: Harbor
  harbor_description: string
  location: string
  createdAt: string
  brazilDocument: any
  shipmentNumber?: string | null
  entregaIdMunicipioIbge?: string | number | null 
  entregaLogradouro?: string
  entregaNomeMunicipio?: string
}

interface Harbor {
  lat: number
  long: number
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
  totalDocuments: number;
  pending: {
    total: number;
    withDelay: number;
    withoutDelay: number;
    withoutDeadline: number;
    percentageOfTotal: number;
    percentageWithDelay: number | null;
    percentageWithoutDelay: number | null;
    percentageWithoutDeadline: number | null;
  };
  inTransit: {
    total: number;
    withDelay: number;
    withoutDelay: number;
    withoutDeadline: number;
    percentageOfTotal: number;
    percentageWithDelay: number | null;
    percentageWithoutDelay: number | null;
    percentageWithoutDeadline: number | null;
  };
  delivered: {
    total: number;
    withDelay: number;
    withoutDelay: number;
    withoutDeadline: number;
    percentageOfTotal: number;
    percentageWithDelay: number | null;
    percentageWithoutDelay: number | null;
    percentageWithoutDeadline: number | null;
  };
}