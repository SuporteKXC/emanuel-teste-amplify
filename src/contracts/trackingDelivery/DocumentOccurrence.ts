import { Geolocation } from './Geolocation';

export interface DocumentOccurrence {
  id: number,
  documentId: number,
  occurrenceTypeId: number,
  documentGeolocationId: number,
  createdAt: string,
  updatedAt: string,
  documentGeolocation: Geolocation,
  occurrenceType: OccurrenceType,
}

interface OccurrenceType {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
}

