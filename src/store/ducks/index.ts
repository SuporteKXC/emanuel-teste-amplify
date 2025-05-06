import { combineReducers } from 'redux';

import { fetchAddressByZipcode } from './addressLookup';
import {
  createAdmin,
  deleteAdmin,
  fetchAdmin,
  paginateAdmins,
  updateAdmin,
} from './admins';
import {
  auth,
  generatePasswordResetToken,
  impersonate,
  login,
  logout,
  resetPassword,
  updateAccount,
} from './auth';
import {
  createCompany,
  fetchCompany,
  listCompanies,
  paginateCompanies,
  updateCompany,
} from './companies';
import {
  createCompanyMember,
  deleteCompanyMember,
  fetchCompanyMember,
  paginateCompanyMembers,
  updateCompanyMember,
} from './companyMembers';
import { paginationParamsCache } from './paginationCache';
import {
  listAvailableStocks,
  listStockRelatedCompanies,
  listStockRelatedWarehouses,
} from './stockManager';
import {
  createStockOrder,
  fetchStockOrder,
  paginateStockOrders,
} from './stockOrders';
import { listStocks, paginateStocks, exportStocks } from './stocks';
import {
  createWarehouseMember,
  deleteWarehouseMember,
  fetchWarehouseMember,
  paginateWarehouseMembers,
  updateWarehouseMember,
} from './warehouseMembers';
import {
  createWarehouse,
  fetchWarehouse,
  listWarehouses,
  paginateWarehouses,
  updateWarehouse,
} from './warehouses';
import { fetchVehicleType, listVehicleTypes } from './vehicleTypes';

export default combineReducers({
  // auth
  auth,
  generatePasswordResetToken,
  impersonate,
  login,
  logout,
  resetPassword,
  updateAccount,
  // pagination cache
  paginationParamsCache,
  // address lookup
  fetchAddressByZipcode,
  // admins
  createAdmin,
  deleteAdmin,
  fetchAdmin,
  paginateAdmins,
  updateAdmin,
  // companies
  createCompany,
  fetchCompany,
  listCompanies,
  paginateCompanies,
  updateCompany,
  // company members
  createCompanyMember,
  deleteCompanyMember,
  fetchCompanyMember,
  paginateCompanyMembers,
  updateCompanyMember,
  // warehouses
  createWarehouse,
  fetchWarehouse,
  listWarehouses,
  paginateWarehouses,
  updateWarehouse,
  // warehouse members
  createWarehouseMember,
  deleteWarehouseMember,
  fetchWarehouseMember,
  paginateWarehouseMembers,
  updateWarehouseMember,
  // stocks
  paginateStocks,
  listStocks,
  exportStocks,
  // stock orders
  createStockOrder,
  fetchStockOrder,
  paginateStockOrders,
  // stock manager
  listAvailableStocks,
  listStockRelatedCompanies,
  listStockRelatedWarehouses,
  // vehicle types
  fetchVehicleType,
  listVehicleTypes,
});
