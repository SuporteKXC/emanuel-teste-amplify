export interface Country {
  id: number;
  description: string;
}

export interface PaginatedCountry extends Country {}

export interface ListedCountry extends Country {}
