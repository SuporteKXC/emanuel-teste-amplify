import { JustificationType } from "../general";

export interface DocumentJustification {
  id: number;
  documentId: number;
  userId: number;
  justificationTypeId: number;
  description: string;
  approvedAt: string;
  rejectedAt: string;
  actionUserId: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  justificationType: JustificationType;
}

// {
//   "id": 3,
//   "documentId": 2790,
//   "userId": 119,
//   "justificationTypeId": 4,
//   "description": "Teste Justificativa",
//   "approvedAt": "2023-11-29T18:58:05.000-03:00",
//   "rejectedAt": null,
//   "actionUserId": null,
//   "deletedAt": null,
//   "createdAt": "2023-11-29T18:58:05.000-03:00",
//   "updatedAt": "2023-11-29T18:58:05.000-03:00",
//   "justificationType": {
//     "id": 4,
//     "description": "Justificativa de teste",
//     "category": "tracking",
//     "automaticApproval": 1
//   }
// }