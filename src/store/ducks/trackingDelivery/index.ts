import { documentsList, documentFetch, documentsFilter, documentsFilterList } from "./documents";
import { listDistance } from "./distance";
import { carriersList, updateDocumentCarrier } from "./carriers";
import {
  createInvoiceJustification,
  approveInvoiceJustification,
  rejectInvoiceJustification,
  deleteInvoiceJustification,
} from "./invoice-justifications";
import { updateDeliveryDate } from "./update-delivery-date";
import { updateDeadline } from "./update-deadline";
import { fetchRecalculateDeadline } from "./recalculate-deadline";
import {
  deliveryVoucherList,
  deliveryVoucherDownload,
  deliveryVoucherApprove,
  deliveryVoucherCancelApprove,
  deliveryVoucherReject,
  deliveryVoucherCreate,
} from "./delivery-vouchers";
import { geolocationCreate } from "./geolocation/geolocation-create";

import { salesOrderItemList } from "./sales-order-item";

import {
  salesOrderList,
  salesOrderIndex,
  salesOrderShow,
  salesOrderFilter,
  salesOrderPut,
} from "./sales-order";

import {
  createJustificationSales,
  justificationSalesIndex,
  updateStatusJustificationSales,
} from "./justification-sales";
import { invoiceCreate } from "./invoice/invoice-create";

export const trackingDeliveryReducers = {
  documentsList,
  documentFetch,
  documentsFilter,
  documentsFilterList,
  listDistance,
  carriersList,
  updateDocumentCarrier,
  createInvoiceJustification,
  approveInvoiceJustification,
  rejectInvoiceJustification,
  deleteInvoiceJustification,
  updateDeliveryDate,
  fetchRecalculateDeadline,
  updateDeadline,
  deliveryVoucherList,
  deliveryVoucherDownload,
  deliveryVoucherApprove,
  deliveryVoucherCancelApprove,
  deliveryVoucherReject,
  deliveryVoucherCreate,
  salesOrderItemList,
  salesOrderList,
  salesOrderIndex,
  salesOrderShow,
  salesOrderFilter,
  updateStatusJustificationSales,
  createJustificationSales,
  justificationSalesIndex,
  salesOrderPut,
  geolocationCreate,
  invoiceCreate
};
