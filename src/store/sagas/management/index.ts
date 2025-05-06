export * from "./snapshot";

import { takeLatest } from "redux-saga/effects";

import { SnapshotListTypes, SnapshotExportTypes } from "store/ducks/management";
import { listSnapshotsRequest, exportSnapshotRequest } from "./snapshot";

import { listCompaniesRequest } from "./companies";
import { CompaniesListTypes } from "store/ducks/management/companies";
import { listProductsRequest } from "./products";
import { ProductsListTypes } from "store/ducks/management/products";
import { exportSnapshotDivergentRequest, listDivergentRequest } from "./snapshotDivergent";
import { SnapshotDivergentExportTypes, SnapshotDivergentListTypes } from "store/ducks/management/snapshotDivergent";
import { JustificationSnapshotTypeCreateTypes, JustificationSnapshotTypesListTypes } from "store/ducks/management/justificationSnapshotTypes";
import { listJustificationSnapshotTypesRequest, newJustificationSnapshotTypeRequest } from "./justificationSnapshotTypes";
import { DivergentJustificationCreateManyTypes, DivergentJustificationCreateTypes } from "store/ducks/management/divergentJustification";
import { createDivergentJustificationRequest, createManyDivergentJustificationRequest } from "./divergentJustification";
import { StorageLocationIndexTypes } from "store/ducks/management/storageLocation";
import { indexStorageLocation } from "./storageLocation";
import {listImportsRequest, detailImportRequest, complaintTypesRequest, insertComplaintRequest, endProcessRequest, complaintResponsiblesRequest, exportImportRequest, updateComplaintRequest} from "./imports"
import { ImportListTypes, ImportDetailTypes, ComplaintTypesTypes, InsertComplaintTypes, EndProcessTypes, ComplaintResponsiblesTypes, ImportExportTypes, UpdateComplaintTypes} from "store/ducks/management/imports";
import { TransferListTypes, TransfersExportTypes, TransferDetailTypes, TransferEndProcessTypes, TransferInsertComplaintTypes } from "store/ducks/management/transfer";
import { transferEndProcessRequest, transferList } from "./transfer";
import { exportTransfersRequest } from "./transfer/transfersExport";
import { detailTransferRequest, transferInsertComplaintRequest } from "./transfer/transferDetail";
import { ComplaintUploadFileTypes } from "store/ducks/management/complaintUploadFile";
import { complaintUploadFileRequest } from "./complaintUploadFile";
import { ComplaintImpactedAreaTypes, ComplaintUpdateMovementTypes, ComplaintListTypes, ComplaintShowTypes } from "store/ducks/management/complaint";
import { complaintImpactedAreaRequest, complaintUpdateMovementRequest, complaintListRequest, complaintShowRequest } from "./complaint";
import { StockOrderProductCreateTypes } from "@/store/ducks/management/stockOrderProduct";
import { newStockOrderProductRequest } from "./stockOrderProduct";


export const managementSagas = [
  takeLatest(SnapshotListTypes.REQUEST, listSnapshotsRequest),
  takeLatest(SnapshotExportTypes.REQUEST, exportSnapshotRequest),
  takeLatest(CompaniesListTypes.REQUEST, listCompaniesRequest),
  takeLatest(ProductsListTypes.REQUEST, listProductsRequest),
  takeLatest(SnapshotDivergentListTypes.REQUEST, listDivergentRequest),
  takeLatest(JustificationSnapshotTypesListTypes.REQUEST, listJustificationSnapshotTypesRequest),
  takeLatest(JustificationSnapshotTypeCreateTypes.REQUEST, newJustificationSnapshotTypeRequest),
  takeLatest(DivergentJustificationCreateTypes.REQUEST, createDivergentJustificationRequest),
  takeLatest(DivergentJustificationCreateManyTypes.REQUEST, createManyDivergentJustificationRequest),
  takeLatest(StorageLocationIndexTypes.REQUEST, indexStorageLocation),
  takeLatest(SnapshotDivergentExportTypes.REQUEST, exportSnapshotDivergentRequest),
  takeLatest(ImportListTypes.REQUEST, listImportsRequest),
  takeLatest(ImportDetailTypes.REQUEST, detailImportRequest),
  takeLatest(ComplaintTypesTypes.REQUEST, complaintTypesRequest),
  takeLatest(InsertComplaintTypes.REQUEST, insertComplaintRequest),
  takeLatest(EndProcessTypes.REQUEST, endProcessRequest),
  takeLatest(ComplaintResponsiblesTypes.REQUEST, complaintResponsiblesRequest),
  takeLatest(ImportExportTypes.REQUEST, exportImportRequest),
  takeLatest(TransferListTypes.REQUEST, transferList),
  takeLatest(TransfersExportTypes.REQUEST, exportTransfersRequest),
  takeLatest(TransferDetailTypes.REQUEST, detailTransferRequest),
  takeLatest(TransferEndProcessTypes.REQUEST, transferEndProcessRequest),
  takeLatest(TransferInsertComplaintTypes.REQUEST, transferInsertComplaintRequest),
  takeLatest(ComplaintUploadFileTypes.REQUEST, complaintUploadFileRequest),
  takeLatest(ComplaintImpactedAreaTypes.REQUEST, complaintImpactedAreaRequest),
  takeLatest(ComplaintListTypes.REQUEST, complaintListRequest),
  takeLatest(ComplaintShowTypes.REQUEST, complaintShowRequest),
  takeLatest(UpdateComplaintTypes.REQUEST, updateComplaintRequest),
  takeLatest(ComplaintUpdateMovementTypes.REQUEST, complaintUpdateMovementRequest),
  takeLatest(StockOrderProductCreateTypes.REQUEST, newStockOrderProductRequest)

];
