import { AppDispatch, RootState } from "@/store";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { DocumentFetchActions } from "@/store/ducks/trackingDelivery/documents";
import { InfoCards } from "./InfoCards";
import { ListItems } from "./ListItems";
import { Header } from "./Header";
import { TrackingProgress } from "./TrackingProgress";
import { MapTrackingInvoice } from "./MapTrackingInvoice";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "./Skeleton";
import { ListJustifications } from "./ListJustifications";
import TrackingDeliveryLayout from "@/layouts/TrackingDelivery/TrackingInvoiceLayout";
import { useTranslation } from "react-i18next";

export const TrackingDeliveryDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const { data, loading } = useSelector(
    (state: RootState) => state.documentFetch
  );

  const onFailure = (() => {
    navigate("/");
  });

  const fetchDocument = useCallback(() => {
    dispatch(DocumentFetchActions.request(id, () => {}, onFailure));
  }, [dispatch]);

  useEffect(() => {
    fetchDocument();
  }, [fetchDocument]);

  return (
    <TrackingDeliveryLayout>
      {loading && <Skeleton />}
      {!loading && data && (
        <>
          <div className="flex justify-end">
            <Button
              variant="default"
              className="mb-2 bg-blue-200 text-primary-500 hover:bg-primary-500 hover:text-white"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-1" size={16} />
              {t("trackingDelivery.general.back")}
            </Button>
          </div>
          <Header data={data} onActionSuccess={fetchDocument} />
          <MapTrackingInvoice invoice={data} />
          <TrackingProgress invoice={data} />
          <ListJustifications
            justifications={data.documentJustifications}
            onActionSuccess={fetchDocument}
          />
          <InfoCards data={data} />
          <ListItems items={data.documentItems} />
        </>
      )}
    </TrackingDeliveryLayout>
  );
};
