export * from "./alerts";
export * from "./config";
export * from "./dashboard";
export * from "./operational";
export * from "./panels";
export * from "./country"
export * from "./exportAlert"

import { takeLatest } from "redux-saga/effects";

import * as D from "store/ducks";

// Requests <----------------------------------->
import * as S from "store/sagas/comex";

export const comexSagas = [
  takeLatest(D.CompanyListTypes.REQUEST, S.companyRequest),
  takeLatest(D.ProductsListTypes.REQUEST, S.productsListRequest),
  takeLatest(D.OrderItemDelayTypes.REQUEST, S.orderItemDelayRequest),
  takeLatest(D.OrderItemListTypes.REQUEST, S.orderItemRequest),
  takeLatest(D.OrderItemLocationTypes.REQUEST, S.orderItemLocationRequest),
  takeLatest(D.ShowOrderItemTypes.REQUEST, S.showOrderRequest),
  takeLatest(D.ExportProductsListTypes.REQUEST, S.exportProductsListRequest),
  takeLatest(
    D.OrderItemShipmentSubscribeTypes.REQUEST,
    S.orderItemShipmentSubscribeRequest
  ),
  takeLatest(
    D.OrderItemShipmentTrackingTypes.REQUEST,
    S.orderItemShipmentTrackingRequest
  ),
  takeLatest(D.OrderItemStatusTypes.REQUEST, S.orderItemStatusRequest),
  takeLatest(
    D.OrderItemProcessTypesTypes.REQUEST,
    S.orderItemProcessTypesRequest
  ),
  takeLatest(D.ExportOrderItemsTypes.REQUEST, S.exportOrderItemsRequest),
  takeLatest(D.CancelOrderItensTypes.REQUEST, S.cancelOrderItensRequest),
  takeLatest(D.NewUserFavoriteTypes.REQUEST, S.newUserFavoriteRequest),
  takeLatest(D.DeleteUserFavoriteTypes.REQUEST, S.deleteUserFavoriteRequest),
  takeLatest(
    D.OrderItemFlightLocationTypes.REQUEST,
    S.orderItemFlightLocationRequest
  ),
  takeLatest(
    D.OrderItemFlightSubscribeTypes.REQUEST,
    S.orderItemFlightSubscribeRequest
  ),
  takeLatest(
    D.OrderItemFlightTrackingTypes.REQUEST,
    S.orderItemFlightTrackingRequest
  ),
  takeLatest(D.AlertListTypes.REQUEST, S.alertsRequest),
  takeLatest(D.UpdateAlertTypes.REQUEST, S.updateAlertRequest),
  takeLatest(D.AlertTypesListTypes.REQUEST, S.alertTypesRequest),
  takeLatest(D.FetchAlertTypeTypes.REQUEST, S.fetchAlertTypeRequest),
  takeLatest(D.NewAlertTypeTypes.REQUEST, S.newAlertTypeRequest),
  takeLatest(D.UpdateAlertTypeTypes.REQUEST, S.updateAlertTypeRequest),
  takeLatest(D.DeleteAlertTypeTypes.REQUEST, S.deleteAlertTypeRequest),
  takeLatest(D.ProductListTypes.REQUEST, S.productsRequest),
  takeLatest(D.UpdateProductTypes.REQUEST, S.updateProductRequest),
  takeLatest(D.FetchProductTypes.REQUEST, S.fetchProductRequest),
  takeLatest(
    D.UpdateRelatedProductTypes.REQUEST,
    S.updateRelatedProductRequest
  ),
  takeLatest(D.ProductPaginateTypes.REQUEST, S.productPaginateRequest),
  takeLatest(D.CreditHistoryListTypes.REQUEST, S.creditHistoriesRequest),
  takeLatest(D.FetchCreditHistoryTypes.REQUEST, S.fetchCreditHistoryRequest),
  takeLatest(D.NewCreditHistoryTypes.REQUEST, S.newCreditHistoryRequest),
  takeLatest(D.UpdateCreditHistoryTypes.REQUEST, S.updateCreditHistoryRequest),
  takeLatest(D.DeleteCreditHistoryTypes.REQUEST, S.deleteCreditHistoryRequest),
  takeLatest(
    D.ExportCreditHistoriesTypes.REQUEST,
    S.exportCreditHistoriesRequest
  ),
  takeLatest(D.FetchServiceTypeTypes.REQUEST, S.fetchServiceTypeRequest),
  takeLatest(D.ResponsibleListTypes.REQUEST, S.responsibleRequest),
  takeLatest(D.FetchResponsibleTypes.REQUEST, S.fetchResponsibleRequest),
  takeLatest(D.DeleteResponsibleTypes.REQUEST, S.deleteResponsibleRequest),
  takeLatest(D.NewResponsibleTypes.REQUEST, S.newResponsibleRequest),
  takeLatest(D.UpdateResponsibleTypes.REQUEST, S.updateResponsibleRequest),
  takeLatest(D.JustificationListTypes.REQUEST, S.listJustificationRequest),
  takeLatest(D.NewJustificationTypes.REQUEST, S.newJustificationRequest),
  takeLatest(D.GetJustificationTypes.REQUEST, S.getJustificationRequest),
  takeLatest(
    D.JustificationTypeListTypes.REQUEST,
    S.listJustificationTypeRequest
  ),
  takeLatest(
    D.NewJustificationTypesTypes.REQUEST,
    S.newJustificationTypeRequest
  ),
  takeLatest(
    D.DeleteJustificationTypeTypes.REQUEST,
    S.deleteJustificationTypeRequest
  ),
  takeLatest(
    D.ShowJustificationTypeTypes.REQUEST,
    S.showJustificationTypeRequest
  ),
  takeLatest(
    D.UpdateJustificationTypeTypes.REQUEST,
    S.updateJustificationTypeRequest
  ),
  takeLatest(D.NewTransitTimeTypes.REQUEST, S.newTransitTimeRequest),
  takeLatest(D.DeleteTransitTimeTypes.REQUEST, S.deleteTransitTimeRequest),
  takeLatest(D.ListTransitTimeTypes.REQUEST, S.transitTimeRequest),
  takeLatest(D.UpdateTransitTimeTypes.REQUEST, S.updatTransitTimeRequest),
  takeLatest(D.ShowTransitTimeTypes.REQUEST, S.showTransitTimeRequest),
  takeLatest(D.SupplierListTypes.REQUEST, S.supplierListRequest),
  takeLatest(D.UserSupplierListTypes.REQUEST, S.userSupplierListRequest),
  takeLatest(D.UserSecondaryEmailTypes.REQUEST, S.userSecondaryEmailRequest),
  takeLatest(D.UserSecondaryEmailDeleteTypes.REQUEST, S.userSecondaryEmailDeleteRequest),
  takeLatest(D.CarrierListTypes.REQUEST, S.carrierRequest),
  takeLatest(D.ClientListTypes.REQUEST, S.clientRequest),
  takeLatest(D.NewSupplierTypes.REQUEST, S.newSupplierRequest),
  takeLatest(D.UpdateSupplierTypes.REQUEST, S.updateSupplierRequest),
  takeLatest(D.ResponsibleSupplierListTypes.REQUEST,S.supplierResponsibleListRequest),
  takeLatest(D.DeleteSupplierResponsibleTypes.REQUEST,S.deleteResponsibleSupplierRequest),
  takeLatest(D.NewUserSupplierTypes.REQUEST,S.newUserSupplierRequest),
  takeLatest(D.UpdateOrderItemTypes.REQUEST, S.updateOrderItemRequest),
  takeLatest(D.OrderItemJustificationManyTypes.REQUEST, S.orderItemJustificationManyRequest),
  takeLatest(D.CountryTypes.REQUEST, S.countriesRequest),
  takeLatest(D.ListOrderFilesTypes.REQUEST, S.orderFilesRequest),
  takeLatest(D.CreateOrderFileTypes.REQUEST, S.createOrderFileRequest),
  takeLatest(D.SearchOrderOptionsTypes.REQUEST, S.searchOrderOptions),
  takeLatest(D.ShowOrderFilesTypes.REQUEST, S.showOrderFilesRequest),
  takeLatest(D.UpdateOrderFileTypes.REQUEST, S.updateOrderFileRequest),
  takeLatest(D.UpdateProcessCriticalTypes.REQUEST, S.updateProcessCritical),
  takeLatest(D.CreateUserSupplierTypes.REQUEST, S.createUserSupplierRequest),
  takeLatest(D.GetExportOrderJustificationTypes.REQUEST, S.getExportOrderJustificationRequest),
  takeLatest(D.NewExportOrderJustificationTypes.REQUEST, S.newExportOrderJustificationRequest),
  takeLatest(D.ExportExportOrderItemsTypes.REQUEST, S.exportExportOrderItemsRequest),
  takeLatest(D.ExportOrderItemAlertListTypes.REQUEST, S.exportOrderItemAlertsRequest),
  takeLatest(D.UpdateExportOrderItemAlertTypes.REQUEST, S.updateExportOrderItemAlertRequest),
  takeLatest(D.UpdateManyExportOrderItemAlertTypes.REQUEST, S.updateManyExportOrderItemAlertRequest),
];