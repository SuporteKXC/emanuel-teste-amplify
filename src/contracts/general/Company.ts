export default interface Company {
  id: number;
  nameFantasy: string;
  cnpj: string;
  consignee: string;
  plantCode: null | string;
  country: string | null;
  accountId: number | string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  isShowStock: number;
  isShow: number;
  [key: string]: any;

}
