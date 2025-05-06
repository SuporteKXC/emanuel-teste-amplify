import { takeLatest } from "redux-saga/effects";

import { listDocumentsRequest, fetchDocumentRequest, listDocumentsFilterRequest } from "./documents";
import {
  DocumentsListTypes,
  DocumentsFilterListTypes,
  DocumentFetchTypes,
} from "store/ducks/trackingDelivery/documents";
import { ListDistanceTypes } from "store/ducks/trackingDelivery/distance";
import { listDistanceRequest } from "./distance";
import {
  CarriersListTypes,
  UpdateDocumentCarrierTypes,
} from "store/ducks/trackingDelivery/carriers";
import { listCarriersRequest, updateDocumentCarrierRequest } from "./carriers";
import {
  CreateInvoiceJustificationTypes,
  ApproveInvoiceJustificationTypes,
  RejectInvoiceJustificationTypes,
  DeleteInvoiceJustificationTypes,
} from "@/store/ducks/trackingDelivery/invoice-justifications";
import {
  createInvoiceJustificationRequest,
  approveInvoiceJustificationRequest,
  rejectInvoiceJustificationRequest,
  deleteInvoiceJustificationRequest,
} from "./invoice-justifications";
import { UpdateDeliveryDateTypes } from "@/store/ducks/trackingDelivery/update-delivery-date";
import { updateDeliveryDateRequest } from "./update-delivery-date";
import { UpdateDeadlineTypes } from "@/store/ducks/trackingDelivery/update-deadline";
import { updateDeadlineRequest } from "./update-deadline";
import { FetchRecalculateDeadlineTypes } from "@/store/ducks/trackingDelivery/recalculate-deadline";
import { fetchRecalculateDeadlineRequest } from "./recalculate-deadline";
import {
  DeliveryVouchersListTypes,
  DeliveryVoucherDownloadTypes,
  DeliveryVoucherApproveTypes,
  DeliveryVoucherCancelApproveTypes,
  DeliveryVoucherRejectTypes,
  DeliveryVoucherCreateTypes,
} from "@/store/ducks/trackingDelivery/delivery-vouchers";
import {
  listDeliveryVouchersRequest,
  downloadDeliveryVoucherRequest,
  approveDeliveryVoucherRequest,
  cancelApproveDeliveryVoucherRequest,
  rejectDeliveryVoucherRequest,
  createDeliveryVoucherRequest,
} from "./deliveryVouchers";
import { SalesOrderItemListTypes } from "@/store/ducks/trackingDelivery/sales-order-item";
import { listSalesOrderItemRequest } from "./sales-order-item";
import {
  SalesOrderIndexTypes,
  SalesOrderListTypes,
  SalesOrderPutTypes,
  SalesOrderShowTypes,
} from "@/store/ducks/trackingDelivery/sales-order";
import {
  indexSalesOrderRequest,
  listSalesOrderRequest,
  showSalesOrderRequest,
} from "./sales-order";
import {
  CreateJustificationSalesTypes,
  JustificationSalesIndexTypes,
  UpdateStatusJustificationSalesTypes,
  updateStatusJustificationSales,
} from "@/store/ducks/trackingDelivery/justification-sales";
import {
  createJustificationSalesRequest,
  indexJustificationSalesRequest,
  updateStatusJustificationSalesRequest,
} from "./justification-sales";
import { putSalesOrderRequest } from "./sales-order/putSalesOrder";

import { geolocationCreateRequest } from "./geolocation/geolocation-create";
import { GeolocationCreateTypes } from "@/store/ducks/trackingDelivery/geolocation/geolocation-create";
import { invoiceCreateRequest } from "./invoice/invoice-create";
import { InvoiceCreateTypes } from "@/store/ducks/trackingDelivery/invoice/invoice-create";

export const trackingDeliverySagas = [
  takeLatest(DocumentsListTypes.REQUEST, listDocumentsRequest),
  takeLatest(DocumentsFilterListTypes.REQUEST, listDocumentsFilterRequest),
  takeLatest(DocumentFetchTypes.REQUEST, fetchDocumentRequest),
  takeLatest(ListDistanceTypes.REQUEST, listDistanceRequest),
  takeLatest(CarriersListTypes.REQUEST, listCarriersRequest),
  takeLatest(
    CreateInvoiceJustificationTypes.REQUEST,
    createInvoiceJustificationRequest
  ),
  takeLatest(
    ApproveInvoiceJustificationTypes.REQUEST,
    approveInvoiceJustificationRequest
  ),
  takeLatest(
    RejectInvoiceJustificationTypes.REQUEST,
    rejectInvoiceJustificationRequest
  ),
  takeLatest(
    DeleteInvoiceJustificationTypes.REQUEST,
    deleteInvoiceJustificationRequest
  ),
  takeLatest(UpdateDeliveryDateTypes.REQUEST, updateDeliveryDateRequest),
  takeLatest(
    FetchRecalculateDeadlineTypes.REQUEST,
    fetchRecalculateDeadlineRequest
  ),
  takeLatest(UpdateDeadlineTypes.REQUEST, updateDeadlineRequest),
  takeLatest(UpdateDocumentCarrierTypes.REQUEST, updateDocumentCarrierRequest),
  takeLatest(DeliveryVouchersListTypes.REQUEST, listDeliveryVouchersRequest),
  takeLatest(
    DeliveryVoucherDownloadTypes.REQUEST,
    downloadDeliveryVoucherRequest
  ),
  takeLatest(
    DeliveryVoucherApproveTypes.REQUEST,
    approveDeliveryVoucherRequest
  ),
  takeLatest(
    DeliveryVoucherCancelApproveTypes.REQUEST,
    cancelApproveDeliveryVoucherRequest
  ),
  takeLatest(DeliveryVoucherRejectTypes.REQUEST, rejectDeliveryVoucherRequest),
  takeLatest(DeliveryVoucherCreateTypes.REQUEST, createDeliveryVoucherRequest),
  takeLatest(SalesOrderItemListTypes.REQUEST, listSalesOrderItemRequest),
  takeLatest(SalesOrderListTypes.REQUEST, listSalesOrderRequest),
  takeLatest(SalesOrderIndexTypes.REQUEST, indexSalesOrderRequest),
  takeLatest(SalesOrderShowTypes.REQUEST, showSalesOrderRequest),
  takeLatest(
    UpdateStatusJustificationSalesTypes.REQUEST,
    updateStatusJustificationSalesRequest
  ),
  takeLatest(
    CreateJustificationSalesTypes.REQUEST,
    createJustificationSalesRequest
  ),
  takeLatest(
    JustificationSalesIndexTypes.REQUEST,
    indexJustificationSalesRequest
  ),
  takeLatest(SalesOrderPutTypes.REQUEST, putSalesOrderRequest),
  takeLatest(GeolocationCreateTypes.REQUEST, geolocationCreateRequest),
  takeLatest(InvoiceCreateTypes.REQUEST, invoiceCreateRequest),
];
