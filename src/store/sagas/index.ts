import { all, takeLatest } from 'redux-saga/effects';
import {
  FetchVehicleTypeTypes,
  ListVehicleTypesTypes,
} from 'store/ducks/vehicleTypes';
// ducks
import { FetchAddressByZipcodeTypes } from '../ducks/addressLookup';
import {
  CreateAdminTypes,
  DeleteAdminTypes,
  FetchAdminTypes,
  PaginateAdminsTypes,
  UpdateAdminTypes,
} from '../ducks/admins';
import {
  GeneratePasswordResetTokenTypes,
  ImpersonateTypes,
  LoginTypes,
  LogoutTypes,
  ResetPasswordTypes,
  UpdateAccountTypes,
} from '../ducks/auth';
import {
  CreateCompanyTypes,
  FetchCompanyTypes,
  ListCompaniesTypes,
  PaginateCompaniesTypes,
  UpdateCompanyTypes,
} from '../ducks/companies';
import {
  CreateCompanyMemberTypes,
  DeleteCompanyMemberTypes,
  FetchCompanyMemberTypes,
  PaginateCompanyMembersTypes,
  UpdateCompanyMemberTypes,
} from '../ducks/companyMembers';
import {
  ListAvailableStocksTypes,
  ListStockRelatedCompaniesTypes,
  ListStockRelatedWarehousesTypes,
} from '../ducks/stockManager';
import {
  CreateStockOrderTypes,
  FetchStockOrderTypes,
  PaginateStockOrdersTypes,
} from '../ducks/stockOrders';
import { ListStocksTypes, PaginateStocksTypes, ExportStocksTypes } from '../ducks/stocks';
import {
  CreateWarehouseMemberTypes,
  DeleteWarehouseMemberTypes,
  FetchWarehouseMemberTypes,
  PaginateWarehouseMembersTypes,
  UpdateWarehouseMemberTypes,
} from '../ducks/warehouseMembers';
import {
  CreateWarehouseTypes,
  FetchWarehouseTypes,
  ListWarehousesTypes,
  PaginateWarehousesTypes,
  UpdateWarehouseTypes,
} from '../ducks/warehouses';
// sagas
import { fetchAddressByZipcodeRequest } from './addressLookup';
import {
  createAdminRequest,
  deleteAdminRequest,
  fetchAdminRequest,
  paginateAdminsRequest,
  updateAdminRequest,
} from './admins';
import {
  generatePasswordResetTokenRequest,
  impersonateRequest,
  loginRequest,
  logoutRequest,
  resetPasswordRequest,
  updateAccountRequest,
} from './auth';
import {
  createCompanyRequest,
  fetchCompanyRequest,
  listCompaniesRequest,
  paginateCompaniesRequest,
  updateCompanyRequest,
} from './companies';
import {
  createCompanyMemberRequest,
  deleteCompanyMemberRequest,
  fetchCompanyMemberRequest,
  paginateCompanyMembersRequest,
  updateCompanyMemberRequest,
} from './companyMembers';
import { rehydrateToken } from './hydration';
import {
  listAvailableStocksRequest,
  listStockRelatedCompaniesRequest,
  listStockRelatedWarehousesRequest,
} from './stockManager';
import {
  createStockOrderRequest,
  fetchStockOrderRequest,
  paginateStockOrdersRequest,
} from './stockOrders';
import { listStocksRequest, paginateStocksRequest, exportStocksRequest } from './stocks';
import { fetchVehicleTypeRequest } from './vehicleTypes/fetchVehicleType';
import { listVehicleTypesRequest } from './vehicleTypes/listVehicleTypes';
import {
  createWarehouseMemberRequest,
  deleteWarehouseMemberRequest,
  fetchWarehouseMemberRequest,
  paginateWarehouseMembersRequest,
  updateWarehouseMemberRequest,
} from './warehouseMembers';
import {
  createWarehouseRequest,
  fetchWarehouseRequest,
  listWarehousesRequest,
  paginateWarehousesRequest,
  updateWarehouseRequest,
} from './warehouses';

export default function* rootSaga() {
  yield all([
    // hydration
    takeLatest('persist/REHYDRATE', rehydrateToken),
    // address lookup
    takeLatest(
      FetchAddressByZipcodeTypes.REQUEST,
      fetchAddressByZipcodeRequest
    ),
    // admins
    takeLatest(CreateAdminTypes.REQUEST, createAdminRequest),
    takeLatest(DeleteAdminTypes.REQUEST, deleteAdminRequest),
    takeLatest(FetchAdminTypes.REQUEST, fetchAdminRequest),
    takeLatest(PaginateAdminsTypes.REQUEST, paginateAdminsRequest),
    takeLatest(UpdateAdminTypes.REQUEST, updateAdminRequest),
    // auth
    takeLatest(ImpersonateTypes.REQUEST, impersonateRequest),
    takeLatest(LoginTypes.REQUEST, loginRequest),
    takeLatest(LogoutTypes.REQUEST, logoutRequest),
    takeLatest(UpdateAccountTypes.REQUEST, updateAccountRequest),
    takeLatest(
      GeneratePasswordResetTokenTypes.REQUEST,
      generatePasswordResetTokenRequest
    ),
    takeLatest(ResetPasswordTypes.REQUEST, resetPasswordRequest),
    // companies
    takeLatest(CreateCompanyTypes.REQUEST, createCompanyRequest),
    takeLatest(FetchCompanyTypes.REQUEST, fetchCompanyRequest),
    takeLatest(ListCompaniesTypes.REQUEST, listCompaniesRequest),
    takeLatest(PaginateCompaniesTypes.REQUEST, paginateCompaniesRequest),
    takeLatest(UpdateCompanyTypes.REQUEST, updateCompanyRequest),
    // company members
    takeLatest(CreateCompanyMemberTypes.REQUEST, createCompanyMemberRequest),
    takeLatest(DeleteCompanyMemberTypes.REQUEST, deleteCompanyMemberRequest),
    takeLatest(FetchCompanyMemberTypes.REQUEST, fetchCompanyMemberRequest),
    takeLatest(
      PaginateCompanyMembersTypes.REQUEST,
      paginateCompanyMembersRequest
    ),
    takeLatest(UpdateCompanyMemberTypes.REQUEST, updateCompanyMemberRequest),
    // stock manager
    takeLatest(ListAvailableStocksTypes.REQUEST, listAvailableStocksRequest),
    takeLatest(
      ListStockRelatedCompaniesTypes.REQUEST,
      listStockRelatedCompaniesRequest
    ),
    takeLatest(
      ListStockRelatedWarehousesTypes.REQUEST,
      listStockRelatedWarehousesRequest
    ),
    // stock orders
    takeLatest(CreateStockOrderTypes.REQUEST, createStockOrderRequest),
    takeLatest(FetchStockOrderTypes.REQUEST, fetchStockOrderRequest),
    takeLatest(PaginateStockOrdersTypes.REQUEST, paginateStockOrdersRequest),
    // stocks
    takeLatest(PaginateStocksTypes.REQUEST, paginateStocksRequest),
    takeLatest(ListStocksTypes.REQUEST, listStocksRequest),
    takeLatest(ExportStocksTypes.REQUEST, exportStocksRequest),
    // vehicle types
    takeLatest(FetchVehicleTypeTypes.REQUEST, fetchVehicleTypeRequest),
    takeLatest(ListVehicleTypesTypes.REQUEST, listVehicleTypesRequest),
    // warehouse members
    takeLatest(
      CreateWarehouseMemberTypes.REQUEST,
      createWarehouseMemberRequest
    ),
    takeLatest(
      DeleteWarehouseMemberTypes.REQUEST,
      deleteWarehouseMemberRequest
    ),
    takeLatest(FetchWarehouseMemberTypes.REQUEST, fetchWarehouseMemberRequest),
    takeLatest(
      PaginateWarehouseMembersTypes.REQUEST,
      paginateWarehouseMembersRequest
    ),
    takeLatest(
      UpdateWarehouseMemberTypes.REQUEST,
      updateWarehouseMemberRequest
    ),
    // warehouses
    takeLatest(CreateWarehouseTypes.REQUEST, createWarehouseRequest),
    takeLatest(FetchWarehouseTypes.REQUEST, fetchWarehouseRequest),
    takeLatest(ListWarehousesTypes.REQUEST, listWarehousesRequest),
    takeLatest(PaginateWarehousesTypes.REQUEST, paginateWarehousesRequest),
    takeLatest(UpdateWarehouseTypes.REQUEST, updateWarehouseRequest),
  ]);
}
