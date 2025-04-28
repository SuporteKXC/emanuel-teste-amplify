import { combineReducers } from "redux";
import { selectedFilter } from "./filter";
import { language } from './language';
import { auth, forgot } from "./auth";
import {
  createAlert,
  deleteAlert,
  fetchAlert,
  listAlerts,
  paginateAlerts,
  updateAlert,
} from "./settings/alerts";
import {
  paginateAlertEmailLogs,
  fetchAlertEmailLog,
} from "./settings/alert-email-logs";
import {
  createUserAlert,
  deleteUserAlert,
  fetchUserAlert,
  listUserAlerts,
  paginateUserAlerts,
  updateUserAlert,
} from "./settings/user-alerts";
import {
  createCompany,
  deleteCompany,
  fetchCompany,
  listCompanies,
  listCompaniesFilter,
  paginateCompanies,
  updateCompany,
} from "./settings/companies";
import {
  createCompanyCarrier,
  deleteCompanyCarrier,
  paginateCompanyCarriers,
} from "./settings/company-carriers";
import {
  createCarrier,
  deleteCarrier,
  fetchCarrier,
  listCarriers,
  paginateCarriers,
  updateCarrier,
} from "./settings/carriers";
import {
  createClient,
  deleteClient,
  fetchClient,
  listClients,
  paginateClients,
  updateClient,
} from "./settings/clients";
import {
  createClientType,
  deleteClientType,
  fetchClientType,
  listClientTypes,
  paginateClientTypes,
  updateClientType,
} from "./settings/client-types";
import { listCities } from "./cities";
import { listRoles } from "./roles";
import { cep } from "./cep";
import { listModules } from "./modules";
import {
  createBusiness,
  deleteBusiness,
  fetchBusiness,
  listBusiness,
  paginateBusiness,
  updateBusiness,
} from "./settings/business";
import {
  createBusinessUnit,
  deleteBusinessUnit,
  fetchBusinessUnit,
  listBusinessUnits,
  paginateBusinessUnits,
  updateBusinessUnit,
} from "./settings/business-unit";
import {
  createUserBusinessLine,
  createUserCompany,
  createUserGroup,
  createUser,
  deleteUserBusinessLine,
  deleteUserCompany,
  deleteUserGroup,
  deleteUser,
  fetchUser,
  fetchUserBusinessLine,
  fetchUserGroup,
  fetchUserCompany,
  listUsers,
  paginateUsers,
  updateUser,
  updateUserPassword,
  createUserSecondaryEmail,
  fetchUserSecondaryEmail,
  deleteUserSecondaryEmail,
} from "./settings/users";
import {
  createProduct,
  deleteProduct,
  fetchProduct,
  listProducts,
  listStockProducts,
  paginateProducts,
  updateProduct,
} from "./settings/products";
import {
  listProductRisks,
} from "./settings/product-risks";
import {
  createProductCompany,
  deleteProductCompany,
  fetchProductCompany,
  listProductCompanies,
  paginateProductCompanies,
  updateProductCompany,
} from "./settings/product-companies";

import {
  createProductType,
  deleteProductType,
  fetchProductType,
  listProductType,
  paginateProductType,
  updateProductType,
} from "./settings/product-type";

import {
  createProductException,
  deleteProductException,
  fetchProductException,
  listProductException,
  paginateProductException,
  updateProductException,
} from "./settings/product-exceptions";

import {
  createPalletType,
  deletePalletType,
  fetchPalletType,
  listPalletType,
  paginatePalletType,
  updatePalletType,
} from "./settings/pallet-type";


import { listGroups } from "./settings/groups";

import {  selectedCompany } from "./companies";

import {
  createVehicle,
  deleteVehicle,
  fetchVehicle,
  listVehicles,
  paginateVehicles,
  updateVehicle,
} from "./settings/vehicles";
import {
  createVehicleType,
  deleteVehicleType,
  fetchVehicleType,
  listVehicleTypes,
  paginateVehicleTypes,
  updateVehicleType,
} from "./settings/vehicle-types";

import {
  paginateStocks,
  exportStocks,
  paginateStockMovement,
  exportStockMovement
} from './wms'

const reducers = combineReducers({
  auth,
  forgot,
  cep,
  language,
  listCities,
  createCarrier,
  deleteCarrier,
  fetchCarrier,
  listCarriers,
  paginateCarriers,
  updateCarrier,
  createAlert,
  deleteAlert,
  fetchAlert,
  listAlerts,
  paginateAlerts,
  updateAlert,
  createUserAlert,
  deleteUserAlert,
  fetchUserAlert,
  listUserAlerts,
  paginateUserAlerts,
  updateUserAlert,
  createCompany,
  deleteCompany,
  fetchCompany,
  listCompanies,
  listCompaniesFilter,
  paginateCompanies,
  updateCompany,
  createClient,
  deleteClient,
  fetchClient,
  listClients,
  paginateClients,
  updateClient,
  createBusiness,
  deleteBusiness,
  fetchBusiness,
  listBusiness,
  paginateBusiness,
  updateBusiness,
  createBusinessUnit,
  deleteBusinessUnit,
  listBusinessUnits,
  fetchBusinessUnit,
  paginateBusinessUnits,
  updateBusinessUnit,
  listRoles,
  createUserBusinessLine,
  createUserCompany,
  createUserGroup,
  createUser,
  deleteUserBusinessLine,
  deleteUserCompany,
  deleteUserGroup,
  deleteUser,
  fetchUser,
  fetchUserBusinessLine,
  fetchUserGroup,
  fetchUserCompany,
  listUsers,
  paginateUsers,
  updateUser,
  updateUserPassword,
  createUserSecondaryEmail,
  fetchUserSecondaryEmail,
  deleteUserSecondaryEmail,
  createClientType,
  deleteClientType,
  fetchClientType,
  listClientTypes,
  paginateClientTypes,
  updateClientType,
  listGroups,
  listModules,
  createProduct,
  deleteProduct,
  fetchProduct,
  listProducts,
  paginateProducts,
  updateProduct,
  createProductCompany,
  deleteProductCompany,
  fetchProductCompany,
  listProductCompanies,
  paginateProductCompanies,
  updateProductCompany,
  createProductType,
  deleteProductType,
  fetchProductType,
  listProductType,
  paginateProductType,
  updateProductType,
  createProductException,
  deleteProductException,
  fetchProductException,
  listProductException,
  paginateProductException,
  updateProductException,
  selectedFilter,
  createVehicle,
  deleteVehicle,
  fetchVehicle,
  listVehicles,
  paginateVehicles,
  updateVehicle,
  createVehicleType,
  deleteVehicleType,
  fetchVehicleType,
  listVehicleTypes,
  paginateVehicleTypes,
  updateVehicleType,
  selectedCompany,
  createPalletType,
  deletePalletType,
  fetchPalletType,
  listPalletType,
  paginatePalletType,
  updatePalletType,
  listProductRisks,
  createCompanyCarrier,
  deleteCompanyCarrier,
  paginateCompanyCarriers,
  paginateAlertEmailLogs,
  fetchAlertEmailLog,
  paginateStocks,
  exportStocks,
  listStockProducts,
  paginateStockMovement,
  exportStockMovement
});

export default reducers;
