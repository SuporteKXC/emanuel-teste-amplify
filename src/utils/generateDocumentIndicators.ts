import { Document } from 'contracts/trackingDelivery'
import { DateTime } from 'luxon'

export function generateDocumentIndicators(documents: Document[]): any {
  const separateNoStatusDocuments = (
    documents: Document[]
  ): {
    withDelay: Document[]
    withoutDelay: Document[]
    withoutDeadline: Document[]
  } => {
    const withDelay: Document[] = []
    const withoutDelay: Document[] = []
    const withoutDeadline: Document[] = []

    documents.forEach((document) => {
      const deadlineDate = document.deadlineDate

      if (!deadlineDate) {
        return withoutDeadline.push(document)
      }

      const diff = DateTime.now().diff(DateTime.fromISO(deadlineDate), 'days').toObject() as { days: number }
      if (diff.days > 0) {
        return withDelay.push(document)
      }
      return withoutDelay.push(document)
    })

    return {
      withDelay,
      withoutDelay,
      withoutDeadline,
    }
  }

  const separateTransitDocuments = (
    documents: Document[]
  ): {
    transitWithDelay: Document[]
    transitWithoutDelay: Document[]
    transitWithoutDeadline: Document[]
  } => {
    const transitWithDelay: Document[] = []
    const transitWithoutDeadline: Document[] = []
    const transitWithoutDelay: Document[] = []

    documents.forEach((document) => {
      const deadlineDate = document.deadlineDate

      if (!deadlineDate) {
        return transitWithoutDeadline.push(document)
      }

      const diff = DateTime.now().diff(DateTime.fromISO(deadlineDate), 'days').toObject() as { days: number }
      if (diff.days > 0) {
        return transitWithDelay.push(document)
      }
      return transitWithoutDelay.push(document)
    })

    return {
      transitWithDelay,
      transitWithoutDelay,
      transitWithoutDeadline,
    }
  }

  const separateDeliveryDocuments = (
    documents: Document[]
  ): {
    deliveryWithDelay: Document[]
    deliveryWithoutDelay: Document[]
    deliveryWithoutDeadline: Document[]
  } => {
    const deliveryWithDelay: Document[] = []
    const deliveryWithoutDeadline: Document[] = []
    const deliveryWithoutDelay: Document[] = []

    documents.forEach((document) => {
      const deadlineDate = document.deadlineDate
      const deliveryDate = document.deliveryDate

      if (!deliveryDate) {
        return
      }
      if (!deadlineDate) {
        return deliveryWithoutDeadline.push(document)
      }

      const diff = DateTime.fromISO(deliveryDate).diff(DateTime.fromISO(deadlineDate), 'days').toObject() as { days: number }
      if (diff.days > 0) {
        return deliveryWithDelay.push(document)
      }
      return deliveryWithoutDelay.push(document)
    })

    return {
      deliveryWithDelay,
      deliveryWithoutDelay,
      deliveryWithoutDeadline,
    }
  }

  const documentsNotCanceled = documents.filter((doc) => !doc.canceledAt)
  const withoutStatus = documentsNotCanceled.filter((doc) => doc.status === 'sem_status')
  const { withDelay, withoutDelay, withoutDeadline } = separateNoStatusDocuments(withoutStatus)

  const transit = documentsNotCanceled.filter((doc) => doc.status === 'transito')
  const { transitWithDelay, transitWithoutDelay, transitWithoutDeadline } =
    separateTransitDocuments(transit)

  const deliveries = documentsNotCanceled.filter((doc) => doc.status === 'entregue')
  const { deliveryWithDelay, deliveryWithoutDeadline, deliveryWithoutDelay } =
    separateDeliveryDocuments(deliveries)

  const totalDocuments = documentsNotCanceled.length

  const totalWithoutStatus = withoutStatus.length
  const totalPendingWithDelay = withDelay.length
  const totalPendingWithoutDelay = withoutDelay.length
  const totalPendingwithoutDeadline = withoutDeadline.length

  const totalTransit = transit.length
  const totalTransitWithDelay = transitWithDelay.length
  const totalTransitWithoutDelay = transitWithoutDelay.length
  const totalTransitWithoutDeadline = transitWithoutDeadline.length

  const totalDeliveries = deliveries.length
  const totalDeliveryWithDelay = deliveryWithDelay.length
  const totalDeliveryWithoutDelay = deliveryWithoutDelay.length
  const totalDeliveryWithoutDeadline = deliveryWithoutDeadline.length

  return {
    totalDocuments,
    pending: {
      total: totalWithoutStatus,
      withDelay: totalPendingWithDelay,
      withoutDelay: totalPendingWithoutDelay,
      withoutDeadline: totalPendingwithoutDeadline,
      percentageOfTotal: Number(((totalWithoutStatus / totalDocuments) * 100).toFixed(2)),
      percentageWithDelay: Number(
        ((totalPendingWithDelay / totalWithoutStatus) * 100).toFixed(2)
      ),
      percentageWithoutDelay: Number(
        ((totalPendingWithoutDelay / totalWithoutStatus) * 100).toFixed(2)
      ),
      percentageWithoutDeadline: Number(
        ((totalPendingwithoutDeadline / totalWithoutStatus) * 100).toFixed(2)
      ),
    },
    inTransit: {
      total: totalTransit,
      withDelay: totalTransitWithDelay,
      withoutDelay: totalTransitWithoutDelay,
      withoutDeadline: totalTransitWithoutDeadline,
      percentageOfTotal: Number(((totalTransit / totalDocuments) * 100).toFixed(2)),
      percentageWithDelay: Number(((totalTransitWithDelay / totalTransit) * 100).toFixed(2)),
      percentageWithoutDelay: Number(
        ((totalTransitWithoutDelay / totalTransit) * 100).toFixed(2)
      ),
      percentageWithoutDeadline: Number(
        ((totalTransitWithoutDeadline / totalTransit) * 100).toFixed(2)
      ),
    },
    delivered: {
      total: totalDeliveries,
      withDelay: totalDeliveryWithDelay,
      withoutDelay: totalDeliveryWithoutDelay,
      withoutDeadline: totalDeliveryWithoutDeadline,
      percentageOfTotal: Number(((totalDeliveries / totalDocuments) * 100).toFixed(2)),
      percentageWithDelay: Number(((totalDeliveryWithDelay / totalDeliveries) * 100).toFixed(2)),
      percentageWithoutDelay: Number(
        ((totalDeliveryWithoutDelay / totalDeliveries) * 100).toFixed(2)
      ),
      percentageWithoutDeadline: Number(
        ((totalDeliveryWithoutDeadline / totalDeliveries) * 100).toFixed(2)
      ),
    },
  }
}