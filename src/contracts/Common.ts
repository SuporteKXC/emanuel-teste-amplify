export type CompanyDocumentType = 'cnpj' | 'cpf' | 'other';

export interface WithAddress {
  addressStreet: string;
  addressNumber: string;
  addressComplement: string | null;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressZipcode: string;
  addressCountry: string;
  addressLatitude: string | null;
  addressLongitude: string | null;
  ibge: string | null;
}

export interface ApiValidationError {
  message: string;
  field: string;
}

export interface SelectOption {
  readonly label: string;
  readonly value: string | number;
  readonly isDisabled?: boolean;
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
  direction?: 'asc' | 'desc';
  dirty?: boolean;
}

/** for filtering on listing pages */
export interface FindMany extends SortingParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface PanelFilter extends FindMany {
  companyId?: number;
  warehouseId?: number;
}
