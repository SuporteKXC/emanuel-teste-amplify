export type CarrierDocumentType = 'cnpj' | 'cpf' | 'other';
export type ClientDocumentType = CarrierDocumentType;

export interface ApiValidationError {
  message: string;
  field: string;
}

export interface SelectOption {
  readonly label: string;
  readonly value: string | number;
  readonly isDisabled?: boolean;
  readonly color?: string;
}

export interface SelectOptionGroup<T extends SelectOption = SelectOption> {
  readonly label: string;
  readonly options: T[];
}

export interface CheckboxOption extends SelectOption {
  readonly id: string;
  readonly color?: string;
}

export interface NavigationMenuEntry {
  label: string;
  action?: () => void;
  route?: string;
  children?: NavigationMenuEntry[];
  depth?: number;
}

/** for sorting on listing pages */
export interface SortingParams {
  orderBy?: string;
  orderByDirection?: 'asc' | 'desc';
  dirty?: boolean;
}

/** for filtering on listing pages */
export interface FindMany extends SortingParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface WithAddress {
  addressStreet: string;
  addressNumber: string | null;
  addressComplement: string | null;
  addressNeighborhood: string | null;
  addressCity: string;
  addressStateName: string | null;
  addressState: string | null;
  addressZipcode: string | null;
  addressLatitude: string | null;
  addressLongitude: string | null;
  ibge: string | null;
  addressCountry: string;
}


// ui
export type FieldDirection = 'row' | 'column' | 'mixed';
