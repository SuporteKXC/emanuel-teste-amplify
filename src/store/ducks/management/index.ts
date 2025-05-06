export * from "./snapshot";
export * from "./imports";

import { snapshotList, snapshotFilterData, snapshotExport } from "./snapshot";
import { companiesList } from "./companies";
import { snapshotProductsList } from "./products";
import { snapshotDivergentFilterData, snapshotDivergentList, snapshotDivergentExport } from "./snapshotDivergent";
import { justificationSnapshotTypeList, justificationSnapshotTypeCreate } from "./justificationSnapshotTypes";
import { divergentJustificationCreate, divergentJustificationCreateMany } from "./divergentJustification";
import { storageLocationIndex } from "./storageLocation";
import { importList, importFilterData, importDetail, complaintTypes, InsertComplaint, endProcess, complaintResponsibles, importExport, updateComplaint } from "./imports"
import { transferList, transferFilterData, transfersExport, transferDetail, transferEndProcess, transferInsertComplaint } from "./transfer"
import { complaintUploadFile } from "./complaintUploadFile"
import { complaintImpactedArea, complaintList, complaintShow, complaintFilterData, complaintUpdateMovement} from "./complaint"
import { stockOrderProductCreate } from "./stockOrderProduct";


export const managementReducers = {
  snapshotList,
  snapshotFilterData,
  companiesList,
  snapshotProductsList,
  snapshotExport,
  snapshotDivergentList,
  justificationSnapshotTypeList,
  justificationSnapshotTypeCreate,
  divergentJustificationCreate,
  divergentJustificationCreateMany,
  snapshotDivergentFilterData,
  storageLocationIndex,
  snapshotDivergentExport,
  importList,
  importFilterData,
  importDetail,
  complaintTypes,
  InsertComplaint,
  endProcess,
  complaintResponsibles,
  importExport,
  transferList,
  transferFilterData,
  transfersExport,
  transferDetail,
  transferEndProcess,
  transferInsertComplaint,
  complaintUploadFile, 
  complaintImpactedArea,
  complaintList,
  complaintShow,
  updateComplaint,
  complaintFilterData,
  complaintUpdateMovement,
  stockOrderProductCreate
};
