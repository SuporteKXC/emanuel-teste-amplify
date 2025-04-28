import { all, takeLatest } from "redux-saga/effects";

// Types
import { AuthTypes, ForgotTypes } from "store/ducks/auth";
import {
  CreateAlertTypes,
  DeleteAlertTypes,
  FetchAlertTypes,
  ListAlertsTypes,
  PaginateAlertsTypes,
  UpdateAlertTypes,
} from "store/ducks/settings/alerts";
import {
  PaginateAlertEmailLogsTypes,
  FetchAlertEmailLogTypes,
} from "store/ducks/settings/alert-email-logs";
import {
  CreateUserAlertTypes,
  DeleteUserAlertTypes,
  FetchUserAlertTypes,
  ListUserAlertsTypes,
  PaginateUserAlertsTypes,
  UpdateUserAlertTypes,
} from "store/ducks/settings/user-alerts";
import {
  CreateCompanyTypes,
  DeleteCompanyTypes,
  FetchCompanyTypes,
  ListCompaniesTypes,
  ListCompaniesFilterTypes,
  PaginateCompaniesTypes,
  UpdateCompanyTypes,
} from "store/ducks/settings/companies";
import {
  CreateCompanyCarrierTypes,
  PaginateCompanyCarriersTypes,
  DeleteCompanyCarrierTypes,
} from "store/ducks/settings/company-carriers";
import {
  CreateCarrierTypes,
  DeleteCarrierTypes,
  FetchCarrierTypes,
  ListCarriersTypes,
  PaginateCarriersTypes,
  UpdateCarrierTypes,
} from "store/ducks/settings/carriers";
import {
  CreateClientTypes,
  DeleteClientTypes,
  FetchClientTypes,
  ListClientsTypes,
  PaginateClientsTypes,
  UpdateClientTypes,
} from "store/ducks/settings/clients";
import {
  CreateClientTypeTypes,
  DeleteClientTypeTypes,
  FetchClientTypeTypes,
  ListClientTypesTypes,
  PaginateClientTypesTypes,
  UpdateClientTypeTypes,
} from "store/ducks/settings/client-types";
import { ListGroupsTypes } from "store/ducks/settings/groups";
import { ListCitiesTypes } from "store/ducks/cities";
import { ListRolesTypes } from "store/ducks/roles";
import { CepTypes } from "store/ducks/cep";
import { ListModulesTypes } from "store/ducks/modules";
import {
  CreateBusinessTypes,
  DeleteBusinessTypes,
  FetchBusinessTypes,
  ListBusinessTypes,
  PaginateBusinessTypes,
  UpdateBusinessTypes,
} from "store/ducks/settings/business";
import {
  CreateBusinessUnitTypes,
  DeleteBusinessUnitTypes,
  FetchBusinessUnitTypes,
  PaginateBusinessUnitsTypes,
  UpdateBusinessUnitTypes,
  ListBusinessUnitsTypes,
} from "store/ducks/settings/business-unit";
import {
  CreateUserSecondaryEmailTypes,
  CreateUserBusinessLineTypes,
  CreateUserCompanyTypes,
  CreateUserGroupTypes,
  CreateUserTypes,
  DeleteUserSecondaryEmailTypes,
  DeleteUserBusinessLineTypes,
  DeleteUserCompanyTypes,
  DeleteUserGroupTypes,
  DeleteUserTypes,
  FetchUserTypes,
  FetchUserSecondaryEmailTypes,
  FetchUserBusinessLineTypes,
  FetchUserCompanyTypes,
  FetchUserGroupTypes,
  ListUsersTypes,
  PaginateUsersTypes,
  UpdateUserTypes,
  CreateUserAvatarTypes,
  GetUserAvatarTypes,
  UpdateUserAvatarTypes,
  UpdateUserPasswordTypes,
} from "store/ducks/settings/users";
import {
  CreateProductTypes,
  DeleteProductTypes,
  FetchProductTypes,
  ListProductsTypes,
  PaginateProductsTypes,
  ListStockProductsTypes,
  UpdateProductTypes,
} from "store/ducks/settings/products";
import {
  CreateProductCompanyTypes,
  DeleteProductCompanyTypes,
  FetchProductCompanyTypes,
  ListProductCompaniesTypes,
  PaginateProductCompaniesTypes,
  UpdateProductCompanyTypes,
} from "store/ducks/settings/product-companies";

import {
  CreateProductTypeTypes,
  DeleteProductTypeTypes,
  FetchProductTypeTypes,
  ListProductTypeTypes,
  PaginateProductTypeTypes,
  UpdateProductTypeTypes,
} from "store/ducks/settings/product-type";

import {
  CreateProductExceptionTypes,
  DeleteProductExceptionTypes,
  FetchProductExceptionTypes,
  ListProductExceptionTypes,
  PaginateProductExceptionTypes,
  UpdateProductExceptionTypes,
} from "store/ducks/settings/product-exceptions";

import {
  CreatePalletTypeTypes,
  DeletePalletTypeTypes,
  FetchPalletTypeTypes,
  ListPalletTypeTypes,
  PaginatePalletTypeTypes,
  UpdatePalletTypeTypes,
} from "store/ducks/settings/pallet-type";

import {
  CreateVehicleTypes,
  DeleteVehicleTypes,
  FetchVehicleTypes,
  ListVehiclesTypes,
  PaginateVehiclesTypes,
  UpdateVehicleTypes,
} from "store/ducks/settings/vehicles";

import {
  CreateVehicleTypeTypes,
  DeleteVehicleTypeTypes,
  FetchVehicleTypeTypes,
  ListVehicleTypesTypes,
  PaginateVehicleTypesTypes,
  UpdateVehicleTypeTypes,
} from "store/ducks/settings/vehicle-types";

import {
  ExportStocksTypes,
  PaginateStockMovementTypes,
  PaginateStocksTypes,
  ExportStockMovementTypes
} from 'store/ducks/wms'
// Sagas
import {
  authRehydrateAccessToken,
  authLoginRequest,
  authLogoutRequest,
  forgotRequest,
} from "./auth";

import {
  createAlertRequest,
  deleteAlertRequest,
  fetchAlertRequest,
  listAlertsRequest,
  paginateAlertsRequest,
  updateAlertRequest,
} from "./settings/alerts";

import {
  paginateAlertEmailLogsRequest,
  fetchAlertEmailLogRequest,
} from "./settings/alert-email-logs";

import {
  createUserAlertRequest,
  deleteUserAlertRequest,
  fetchUserAlertRequest,
  listUserAlertsRequest,
  paginateUserAlertsRequest,
  updateUserAlertRequest,
} from "./settings/user-alerts";

import {
  createCompanyRequest,
  deleteCompanyRequest,
  fetchCompanyRequest,
  listCompaniesRequest,
  listCompaniesFilterRequest,
  paginateCompaniesRequest,
  updateCompanyRequest,
} from "./settings/companies";
import {
  createCompanyCarrierRequest,
  paginateCompanyCarriersRequest,
  deleteCompanyCarrierRequest,
} from "./settings/company-carriers";
import {
  createCarrierRequest,
  deleteCarrierRequest,
  fetchCarrierRequest,
  listCarriersRequest,
  paginateCarriersRequest,
  updateCarrierRequest,
} from "./settings/carriers";
import {
  createClientRequest,
  deleteClientRequest,
  fetchClientRequest,
  listClientsRequest,
  paginateClientsRequest,
  updateClientRequest,
} from "./settings/clients";
import {
  createClientTypeRequest,
  deleteClientTypeRequest,
  fetchClientTypeRequest,
  listClientTypesRequest,
  paginateClientTypesRequest,
  updateClientTypeRequest,
} from "./settings/client-types";
import { listGroupsRequest } from "./settings/groups";
import { listCitiesRequest } from "./cities";
import { listRolesRequest } from "./roles";
import { listModulesRequest } from "./modules";
import { fetchCepRequest } from "./cep";
import {
  createProductRequest,
  deleteProductRequest,
  fetchProductRequest,
  listProductsRequest,
  listStockProductsRequest,
  paginateProductsRequest,
  updateProductRequest,
} from "./settings/products";
import {
  createProductCompanyRequest,
  deleteProductCompanyRequest,
  fetchProductCompanyRequest,
  listProductCompaniesRequest,
  paginateProductCompaniesRequest,
  updateProductCompanyRequest,
} from "./settings/product-companies";
import {
  createProductTypeRequest,
  deleteProductTypeRequest,
  fetchProductTypeRequest,
  listProductTypeRequest,
  paginateProductTypeRequest,
  updateProductTypeRequest,
} from "./settings/product-type";
import {
  createProductExceptionRequest,
  deleteProductExceptionRequest,
  fetchProductExceptionRequest,
  listProductExceptionRequest,
  paginateProductExceptionRequest,
  updateProductExceptionRequest,
} from "./settings/product-exceptions";
import {
  createBusinessRequest,
  deleteBusinessRequest,
  fetchBusinessRequest,
  listBusinessRequest,
  paginateBusinessRequest,
  updateBusinessRequest,
} from "./settings/business";
import {
  createBusinessUnitRequest,
  deleteBusinessUnitRequest,
  fetchBusinessUnitRequest,
  paginateBusinessUnitsRequest,
  updateBusinessUnitRequest,
  listBusinessUnitsRequest,
} from "./settings/business-unit";
import {
  createUserSecondaryEmailRequest,
  createUserBusinessLineRequest,
  createUserCompanyRequest,
  createUserGroupRequest,
  createUserRequest,
  deleteUserSecondaryEmailRequest,
  deleteUserBusinessLineRequest,
  deleteUserCompanyRequest,
  deleteUserGroupRequest,
  deleteUserRequest,
  fetchUserRequest,
  listUsersRequest,
  fetchUserSecondaryEmailRequest,
  fetchUserBusinessLineRequest,
  fetchUserCompanyRequest,
  fetchUserGroupRequest,
  paginateUsersRequest,
  updateUserRequest,
  createUserAvatar,
  getUserAvatar,
  updateUserAvatar,
  updateUserPassword,
} from "./settings/users";

import {
  createVehicleRequest,
  deleteVehicleRequest,
  fetchVehicleRequest,
  listVehiclesRequest,
  paginateVehiclesRequest,
  updateVehicleRequest,
} from "./settings/vehicles";

import {
  createVehicleTypeRequest,
  deleteVehicleTypeRequest,
  fetchVehicleTypeRequest,
  listVehicleTypesRequest,
  paginateVehicleTypesRequest,
  updateVehicleTypeRequest,
} from "./settings/vehicle-types";
import {
  createPalletTypeRequest,
  deletePalletTypeRequest,
  fetchPalletTypeRequest,
  listPalletTypeRequest,
  paginatePalletTypeRequest,
  updatePalletTypeRequest,
} from "./settings/pallet-type";
import { ListProductRisksTypes } from "store/ducks/settings/product-risks";
import { listProductRisksRequest } from "./settings/product-risks";

import { exportStocksRequest, ExportStockMovementRequest, paginateStockMovementRequest, paginateStocksRequest } from "./wms";

export default function* rootSaga() {
  yield all([
    // auth
    takeLatest("persist/REHYDRATE", authRehydrateAccessToken),
    takeLatest(AuthTypes.LOGIN_REQUEST, authLoginRequest),
    takeLatest(AuthTypes.LOGOUT_REQUEST, authLogoutRequest),

    // forgot
    takeLatest(ForgotTypes.REQUEST, forgotRequest),

    // settings-alerts
    takeLatest(CreateAlertTypes.REQUEST, createAlertRequest),
    takeLatest(DeleteAlertTypes.REQUEST, deleteAlertRequest),
    takeLatest(FetchAlertTypes.REQUEST, fetchAlertRequest),
    takeLatest(ListAlertsTypes.REQUEST, listAlertsRequest),
    takeLatest(PaginateAlertsTypes.REQUEST, paginateAlertsRequest),
    takeLatest(UpdateAlertTypes.REQUEST, updateAlertRequest),

    // settings-user-alerts
    takeLatest(CreateUserAlertTypes.REQUEST, createUserAlertRequest),
    takeLatest(DeleteUserAlertTypes.REQUEST, deleteUserAlertRequest),
    takeLatest(FetchUserAlertTypes.REQUEST, fetchUserAlertRequest),
    takeLatest(ListUserAlertsTypes.REQUEST, listUserAlertsRequest),
    takeLatest(PaginateUserAlertsTypes.REQUEST, paginateUserAlertsRequest),
    takeLatest(UpdateUserAlertTypes.REQUEST, updateUserAlertRequest),

    // settings-companies
    takeLatest(CreateCompanyTypes.REQUEST, createCompanyRequest),
    takeLatest(DeleteCompanyTypes.REQUEST, deleteCompanyRequest),
    takeLatest(FetchCompanyTypes.REQUEST, fetchCompanyRequest),
    takeLatest(ListCompaniesTypes.REQUEST, listCompaniesRequest),
    takeLatest(ListCompaniesFilterTypes.REQUEST, listCompaniesFilterRequest),
    takeLatest(PaginateCompaniesTypes.REQUEST, paginateCompaniesRequest),
    takeLatest(UpdateCompanyTypes.REQUEST, updateCompanyRequest),

    // settings-company-carriers
    takeLatest(CreateCompanyCarrierTypes.REQUEST, createCompanyCarrierRequest),
    takeLatest(DeleteCompanyCarrierTypes.REQUEST, deleteCompanyCarrierRequest),
    takeLatest(
      PaginateCompanyCarriersTypes.REQUEST,
      paginateCompanyCarriersRequest
    ),

    // settings-carriers
    takeLatest(CreateCarrierTypes.REQUEST, createCarrierRequest),
    takeLatest(DeleteCarrierTypes.REQUEST, deleteCarrierRequest),
    takeLatest(FetchCarrierTypes.REQUEST, fetchCarrierRequest),
    takeLatest(ListCarriersTypes.REQUEST, listCarriersRequest),
    takeLatest(PaginateCarriersTypes.REQUEST, paginateCarriersRequest),
    takeLatest(UpdateCarrierTypes.REQUEST, updateCarrierRequest),

    // settings-clients
    takeLatest(CreateClientTypes.REQUEST, createClientRequest),
    takeLatest(DeleteClientTypes.REQUEST, deleteClientRequest),
    takeLatest(FetchClientTypes.REQUEST, fetchClientRequest),
    takeLatest(ListClientsTypes.REQUEST, listClientsRequest),
    takeLatest(PaginateClientsTypes.REQUEST, paginateClientsRequest),
    takeLatest(UpdateClientTypes.REQUEST, updateClientRequest),

    // settings-client-types
    takeLatest(CreateClientTypeTypes.REQUEST, createClientTypeRequest),
    takeLatest(DeleteClientTypeTypes.REQUEST, deleteClientTypeRequest),
    takeLatest(FetchClientTypeTypes.REQUEST, fetchClientTypeRequest),
    takeLatest(ListClientTypesTypes.REQUEST, listClientTypesRequest),
    takeLatest(PaginateClientTypesTypes.REQUEST, paginateClientTypesRequest),
    takeLatest(UpdateClientTypeTypes.REQUEST, updateClientTypeRequest),

    //settings-groups
    takeLatest(ListGroupsTypes.REQUEST, listGroupsRequest),

    // cities
    takeLatest(ListCitiesTypes.REQUEST, listCitiesRequest),

    // roles
    takeLatest(ListRolesTypes.REQUEST, listRolesRequest),

    // module
    takeLatest(ListModulesTypes.REQUEST, listModulesRequest),

    // cep
    takeLatest(CepTypes.REQUEST, fetchCepRequest),

    // settings-business
    takeLatest(CreateBusinessTypes.REQUEST, createBusinessRequest),
    takeLatest(DeleteBusinessTypes.REQUEST, deleteBusinessRequest),
    takeLatest(FetchBusinessTypes.REQUEST, fetchBusinessRequest),
    takeLatest(ListBusinessTypes.REQUEST, listBusinessRequest),
    takeLatest(PaginateBusinessTypes.REQUEST, paginateBusinessRequest),
    takeLatest(UpdateBusinessTypes.REQUEST, updateBusinessRequest),

    // settings-business-units
    takeLatest(CreateBusinessUnitTypes.REQUEST, createBusinessUnitRequest),
    takeLatest(DeleteBusinessUnitTypes.REQUEST, deleteBusinessUnitRequest),
    takeLatest(FetchBusinessUnitTypes.REQUEST, fetchBusinessUnitRequest),
    takeLatest(
      PaginateBusinessUnitsTypes.REQUEST,
      paginateBusinessUnitsRequest
    ),
    takeLatest(UpdateBusinessUnitTypes.REQUEST, updateBusinessUnitRequest),
    takeLatest(ListBusinessUnitsTypes.REQUEST, listBusinessUnitsRequest),

    // settings-users
    takeLatest(
      CreateUserSecondaryEmailTypes.REQUEST,
      createUserSecondaryEmailRequest
    ),
    takeLatest(
      CreateUserBusinessLineTypes.REQUEST,
      createUserBusinessLineRequest
    ),
    takeLatest(CreateUserCompanyTypes.REQUEST, createUserCompanyRequest),
    takeLatest(CreateUserGroupTypes.REQUEST, createUserGroupRequest),
    takeLatest(CreateUserTypes.REQUEST, createUserRequest),
    takeLatest(
      DeleteUserSecondaryEmailTypes.REQUEST,
      deleteUserSecondaryEmailRequest
    ),
    takeLatest(
      DeleteUserBusinessLineTypes.REQUEST,
      deleteUserBusinessLineRequest
    ),
    takeLatest(DeleteUserCompanyTypes.REQUEST, deleteUserCompanyRequest),
    takeLatest(DeleteUserGroupTypes.REQUEST, deleteUserGroupRequest),
    takeLatest(DeleteUserTypes.REQUEST, deleteUserRequest),
    takeLatest(FetchUserTypes.REQUEST, fetchUserRequest),
    takeLatest(ListUsersTypes.REQUEST, listUsersRequest),
    takeLatest(
      FetchUserSecondaryEmailTypes.REQUEST,
      fetchUserSecondaryEmailRequest
    ),
    takeLatest(
      FetchUserBusinessLineTypes.REQUEST,
      fetchUserBusinessLineRequest
    ),
    takeLatest(FetchUserCompanyTypes.REQUEST, fetchUserCompanyRequest),
    takeLatest(FetchUserGroupTypes.REQUEST, fetchUserGroupRequest),
    takeLatest(PaginateUsersTypes.REQUEST, paginateUsersRequest),
    takeLatest(UpdateUserTypes.REQUEST, updateUserRequest),

    // UserAvatar
    takeLatest(CreateUserAvatarTypes.REQUEST, createUserAvatar),
    takeLatest(GetUserAvatarTypes.REQUEST, getUserAvatar),
    takeLatest(UpdateUserAvatarTypes.REQUEST, updateUserAvatar),

    // User Password
    takeLatest(UpdateUserPasswordTypes.REQUEST, updateUserPassword),

    // settings-products
    takeLatest(CreateProductTypes.REQUEST, createProductRequest),
    takeLatest(DeleteProductTypes.REQUEST, deleteProductRequest),
    takeLatest(FetchProductTypes.REQUEST, fetchProductRequest),
    takeLatest(ListProductsTypes.REQUEST, listProductsRequest),
    takeLatest(PaginateProductsTypes.REQUEST, paginateProductsRequest),
    takeLatest(UpdateProductTypes.REQUEST, updateProductRequest),
    takeLatest(ListStockProductsTypes.REQUEST, listStockProductsRequest),
    
    // settings-product-companies
    takeLatest(CreateProductCompanyTypes.REQUEST, createProductCompanyRequest),
    takeLatest(DeleteProductCompanyTypes.REQUEST, deleteProductCompanyRequest),
    takeLatest(FetchProductCompanyTypes.REQUEST, fetchProductCompanyRequest),
    takeLatest(ListProductCompaniesTypes.REQUEST, listProductCompaniesRequest),
    takeLatest(
      PaginateProductCompaniesTypes.REQUEST,
      paginateProductCompaniesRequest
    ),
    takeLatest(UpdateProductCompanyTypes.REQUEST, updateProductCompanyRequest),

    // settings-product-type
    takeLatest(CreateProductTypeTypes.REQUEST, createProductTypeRequest),
    takeLatest(DeleteProductTypeTypes.REQUEST, deleteProductTypeRequest),
    takeLatest(FetchProductTypeTypes.REQUEST, fetchProductTypeRequest),
    takeLatest(ListProductTypeTypes.REQUEST, listProductTypeRequest),
    takeLatest(PaginateProductTypeTypes.REQUEST, paginateProductTypeRequest),
    takeLatest(UpdateProductTypeTypes.REQUEST, updateProductTypeRequest),

    // settings-product-risks
    takeLatest(ListProductRisksTypes.REQUEST, listProductRisksRequest),

    //settings-product-exceptions
    takeLatest(
      CreateProductExceptionTypes.REQUEST,
      createProductExceptionRequest
    ),
    takeLatest(
      DeleteProductExceptionTypes.REQUEST,
      deleteProductExceptionRequest
    ),
    takeLatest(
      FetchProductExceptionTypes.REQUEST,
      fetchProductExceptionRequest
    ),
    takeLatest(ListProductExceptionTypes.REQUEST, listProductExceptionRequest),
    takeLatest(
      PaginateProductExceptionTypes.REQUEST,
      paginateProductExceptionRequest
    ),
    takeLatest(
      UpdateProductExceptionTypes.REQUEST,
      updateProductExceptionRequest
    ),

    // settings vehicles
    takeLatest(CreateVehicleTypes.REQUEST, createVehicleRequest),
    takeLatest(DeleteVehicleTypes.REQUEST, deleteVehicleRequest),
    takeLatest(FetchVehicleTypes.REQUEST, fetchVehicleRequest),
    takeLatest(ListVehiclesTypes.REQUEST, listVehiclesRequest),
    takeLatest(PaginateVehiclesTypes.REQUEST, paginateVehiclesRequest),
    takeLatest(UpdateVehicleTypes.REQUEST, updateVehicleRequest),

    // settings vehicle type
    takeLatest(CreateVehicleTypeTypes.REQUEST, createVehicleTypeRequest),
    takeLatest(DeleteVehicleTypeTypes.REQUEST, deleteVehicleTypeRequest),
    takeLatest(FetchVehicleTypeTypes.REQUEST, fetchVehicleTypeRequest),
    takeLatest(ListVehicleTypesTypes.REQUEST, listVehicleTypesRequest),
    takeLatest(PaginateVehicleTypesTypes.REQUEST, paginateVehicleTypesRequest),
    takeLatest(UpdateVehicleTypeTypes.REQUEST, updateVehicleTypeRequest),

    // settings-pallet-type
    takeLatest(CreatePalletTypeTypes.REQUEST, createPalletTypeRequest),
    takeLatest(DeletePalletTypeTypes.REQUEST, deletePalletTypeRequest),
    takeLatest(FetchPalletTypeTypes.REQUEST, fetchPalletTypeRequest),
    takeLatest(ListPalletTypeTypes.REQUEST, listPalletTypeRequest),
    takeLatest(PaginatePalletTypeTypes.REQUEST, paginatePalletTypeRequest),
    takeLatest(UpdatePalletTypeTypes.REQUEST, updatePalletTypeRequest),

    // settings-alert-email-logs
    takeLatest(
      PaginateAlertEmailLogsTypes.REQUEST,
      paginateAlertEmailLogsRequest
    ),
    takeLatest(FetchAlertEmailLogTypes.REQUEST, fetchAlertEmailLogRequest),

    takeLatest(PaginateStocksTypes.REQUEST, paginateStocksRequest),
    takeLatest(ExportStocksTypes.REQUEST, exportStocksRequest),
    takeLatest(PaginateStockMovementTypes.REQUEST, paginateStockMovementRequest),
    takeLatest(ExportStockMovementTypes.REQUEST, ExportStockMovementRequest)

  ]);
}
