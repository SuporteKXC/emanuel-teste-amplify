type Product = {
    id: number;
    code: number;
    name: string;
    deletedAt: string | null;
  };
  
  type ProductUnit = {
    id: number;
    name: string;
  };
  
  type Warehouse = {
    id: number;
    tradeName: string;
    logoUrl: string | null;
    documentType: string;
    document: string;
    addressStreet: string;
    addressNumber: string;
    addressComplement: string;
    addressNeighborhood: string;
    addressCity: string;
    addressState: string;
    addressUf: string;
    addressZipcode: string;
    addressLatitude: string;
    addressLongitude: string;
    countryId: number;
    ibge: string;
    deletedAt: string | null;
    operationTypeOptions: null | any;
    companiesOptions: null | any;
    carriersOptions: null | any;
    vehicleTypesOptions: null | any;
    address: string;
    meta: object;
  };
  
  type Company = {
    id: number;
    tradeName: string;
    addressStreet: string;
    addressNumber: string;
    addressNeighborhood: string;
    addressZipcode: string;
    addressCity: string;
    addressState: string;
    addressLatitude: string;
    addressLongitude: string;
    deletedAt: string | null;
    address: string;
  };
  
  type Meta = {
    productCode: number;
    productName: string;
  };
  
  export interface IStocksList {
    id: number;
    warehouseId: number;
    companyId: number;
    productId: number;
    productUnitId: number;
    quantity: number;
    batch: string;
    price: number;
    invoiceNumber: string;
    time: number;
    stockType: string;
    startDate: string | null;
    dueDate: string | null;
    manufacturingDate: string;
    expirationDate: string;
    entranceDate: string;
    product: Product;
    productUnit: ProductUnit;
    warehouse: Warehouse;
    company: Company;
    invoices: any[];
    coverageInvoices: any[];
    totalPrice: number;
    status: string;
    meta: Meta;
  }