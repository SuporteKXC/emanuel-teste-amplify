export * from "./account";
export * from "./auth";
export * from "./config";
export * from "./addressLookup";

import { takeLatest } from "redux-saga/effects";

import { fetchAddressByZipcodeRequest } from "./addressLookup";

import {
  AuthTypes,
  ModulesListTypes,
  FiltersListTypes,
  ActionsListTypes,
  LoginTypes,
  LogoutTypes,
  GeneratePasswordResetTokenTypes,
  ResetPasswordTypes,
  PermissionTypes,
  UserListTypes,
  FetchUserTypes,
  NewUserTypes,
  UpdateUserTypes,
  DeleteUserTypes,
  ImpersonateTypes,
  FetchUserImageTypes,
  RolesListTypes,
  FetchRoleTypes,
  NewRoleTypes,
  UpdateRoleTypes,
  DeleteRoleTypes,
  PaginateCarriersTypes,
  FetchAddressByZipcodeTypes,
  ListCountriesTypes,
  CreateCarrierTypes,
  FetchCarrierTypes,
  UpdateCarrierTypes,
  DeleteCarrierTypes,
  PaginateClientsTypes,
  CreateClientTypes,
  UpdateClientTypes,
  FetchClientTypes,
  DeleteClientTypes,
  CreateTrackingTransitTimeTypes,
  UpdateTrackingTransitTimeTypes,
  DeleteTrackingTransitTimeTypes,
  PaginateTrackingTransitTimesTypes,
  FetchTrackingTransitTimeTypes,
  ListCitiesTypes,
  JustificationTypesListTypes,
  PaginateCompaniesTypes,
  FetchAccountsTypes,
  FetchCompaniesTypes,
  CreateCompanyTypes,
  UpdateCompanyTypes,
} from "store/ducks/general";

import {
  actionsRequest,
  modulesRequest,
  permissionRequest,
  filtersRequest,
} from "./account";

import {
  authRehydrateAccessToken,
  authUserRefreshRequest,
  logoutRequest,
  loginRequest,
  generatePasswordResetTokenRequest,
  resetPasswordRequest,
  impersonateRequest,
} from "./auth";

import {
  userRequest,
  fetchUserRequest,
  newUserRequest,
  updateUserRequest,
  deleteUserRequest,
  fetchUserImageRequest,
  roleRequest,
  fetchRoleRequest,
  newRoleRequest,
  updateRoleRequest,
  deleteRoleRequest,
  paginateCarriersRequest,
  listCountriesRequest,
  createCarrierRequest,
  updateCarrierRequest,
  deleteCarrierRequest,
  paginateClientsRequest,
  createClientRequest,
  updateClientRequest,
  deleteClientRequest,
  createTrackingTransitTimeRequest,
  updateTrackingTransitTimeRequest,
  deleteTrackingTransitTimeRequest,
  paginateTrackingTransitTimesRequest,
  justificationTypesRequest,
  paginateCompaniesRequest,
  fetchAccountsRequest,
  createCompanyRequest,
  updateCompanyRequest,
} from "./config";
import { fetchCarrierRequest } from "./config/carriers/fetchCarrier";
import { fetchClientRequest } from "./config/clients/fetchClient";
import { fetchTrackingTransitTimeRequest } from "./config/trackingTransitTimes/fetchTrackingTransitTime";
import { listCitiesRequest } from "./addressLookup/listCities";
import { fetchCompaniesRequest } from "./config/companies/fetchCompanies";

export const generalSagas = [
  takeLatest("persist/REHYDRATE", authRehydrateAccessToken),
  takeLatest(AuthTypes.REQUEST, authUserRefreshRequest),
  takeLatest(ModulesListTypes.REQUEST, modulesRequest),
  takeLatest(ActionsListTypes.REQUEST, actionsRequest),
  takeLatest(FiltersListTypes.REQUEST, filtersRequest),
  //Auth
  takeLatest(LoginTypes.REQUEST, loginRequest),
  takeLatest(LogoutTypes.REQUEST, logoutRequest),
  takeLatest(
    GeneratePasswordResetTokenTypes.REQUEST,
    generatePasswordResetTokenRequest
  ),
  takeLatest(ResetPasswordTypes.REQUEST, resetPasswordRequest),
  takeLatest(PermissionTypes.REQUEST, permissionRequest),
  takeLatest(ImpersonateTypes.REQUEST, impersonateRequest),
  //Config User
  takeLatest(UserListTypes.REQUEST, userRequest),
  takeLatest(FetchUserTypes.REQUEST, fetchUserRequest),
  takeLatest(NewUserTypes.REQUEST, newUserRequest),
  takeLatest(UpdateUserTypes.REQUEST, updateUserRequest),
  takeLatest(DeleteUserTypes.REQUEST, deleteUserRequest),
  takeLatest(FetchUserImageTypes.REQUEST, fetchUserImageRequest),
  //Config Role
  takeLatest(RolesListTypes.REQUEST, roleRequest),
  takeLatest(FetchRoleTypes.REQUEST, fetchRoleRequest),
  takeLatest(NewRoleTypes.REQUEST, newRoleRequest),
  takeLatest(UpdateRoleTypes.REQUEST, updateRoleRequest),
  takeLatest(DeleteRoleTypes.REQUEST, deleteRoleRequest),
  //Config Carrier
  takeLatest(PaginateCarriersTypes.REQUEST, paginateCarriersRequest),
  takeLatest(CreateCarrierTypes.REQUEST, createCarrierRequest),
  takeLatest(UpdateCarrierTypes.REQUEST, updateCarrierRequest),
  takeLatest(FetchCarrierTypes.REQUEST, fetchCarrierRequest),
  takeLatest(DeleteCarrierTypes.REQUEST, deleteCarrierRequest),
  //Config Clients
  takeLatest(PaginateClientsTypes.REQUEST, paginateClientsRequest),
  takeLatest(CreateClientTypes.REQUEST, createClientRequest),
  takeLatest(UpdateClientTypes.REQUEST, updateClientRequest),
  takeLatest(FetchClientTypes.REQUEST, fetchClientRequest),
  takeLatest(DeleteClientTypes.REQUEST, deleteClientRequest),
  //Address
  takeLatest(FetchAddressByZipcodeTypes.REQUEST, fetchAddressByZipcodeRequest),
  takeLatest(ListCitiesTypes.REQUEST, listCitiesRequest),
  //Countries
  takeLatest(ListCountriesTypes.REQUEST, listCountriesRequest),
  //Tracking Transit Times
  takeLatest(
    CreateTrackingTransitTimeTypes.REQUEST,
    createTrackingTransitTimeRequest
  ),
  takeLatest(
    UpdateTrackingTransitTimeTypes.REQUEST,
    updateTrackingTransitTimeRequest
  ),
  takeLatest(
    DeleteTrackingTransitTimeTypes.REQUEST,
    deleteTrackingTransitTimeRequest
  ),
  takeLatest(
    PaginateTrackingTransitTimesTypes.REQUEST,
    paginateTrackingTransitTimesRequest
  ),
  takeLatest(
    FetchTrackingTransitTimeTypes.REQUEST,
    fetchTrackingTransitTimeRequest
  ),
  //Justification Types
  takeLatest(JustificationTypesListTypes.REQUEST, justificationTypesRequest),
  //Companies
  takeLatest(PaginateCompaniesTypes.REQUEST, paginateCompaniesRequest),
  takeLatest(FetchCompaniesTypes.REQUEST, fetchCompaniesRequest),
  takeLatest(CreateCompanyTypes.REQUEST, createCompanyRequest),
  takeLatest(UpdateCompanyTypes.REQUEST, updateCompanyRequest),
  //Accounts
  takeLatest(FetchAccountsTypes.REQUEST, fetchAccountsRequest),
];
