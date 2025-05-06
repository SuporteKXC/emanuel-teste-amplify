import {
  InnerNavigator,
  InnerNavigatorOption,
} from "@/components/ui/InnerNavigator";
import React, { useCallback, useEffect, useState } from "react";
import { ExportLayout } from "../../layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Pedido from "./tabs/order";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useShowExportOrders from "@/queries/ExportOrder/showExportOrder";
import Items from "./tabs/itens";
import ShippingTimeline from "./tabs/timeline";
import Map from "./tabs/map";
import { ActivityIndicator } from "@/styles/components";
import { ReactComponent as ArrowLeft } from "assets/icons/arrow-left.svg";
import { Button } from "@/components/ui/ButtonGs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  FetchServiceTypeActions,
  OrderItemFlightSubscribeActions,
  OrderItemFlightTrackingActions,
  OrderItemShipmentSubscribeActions,
  OrderItemShipmentTrackingActions,
} from "@/store/ducks";
import { ModalService } from "@/components";

const navigatorOptions: InnerNavigatorOption[] = [
  {
    title: "Operacional",
    route: "",
    hasPermission: true,
  },
];

let waitingTrackingInfo = true;
export const ShowExportOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useShowExportOrders(id!);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  /** adptar para export_order_itens */
  const { loading: orderItemShipmentSubscribeLoading } = useSelector(
    (state: RootState) => state.orderItemShipmentSubscribe
  );

  /** adptar para export_order_itens */
  const { data: shipmentTracking } = useSelector(
    (state: RootState) => state.orderItemShipmentTracking
  );

  const { data: serviceType, loading: loadingServiceType } = useSelector(
    (state: RootState) => state.serviceType
  );

  const hasContainerCode =
    data?.atd_date && !data?.ata_date && data?.shipment_tracking_code;

  waitingTrackingInfo = !shipmentTracking?.finalPortPredictiveArrivalUtc;

  const isDisabledButtons =
    !data?.ata_date &&
    (!!data?.port_entry_date ||
      !!data?.protocol_mapa_in26_date ||
      !!data?.invoice_date ||
      !!data?.plant_delivery);

  const isFlight = data?.modal === "pausado";
  const isAEREA = data?.modal === "AEREA";

  const getFlightTracking = useCallback(async () => {
    if (data) {
      dispatch(OrderItemFlightTrackingActions.request(data.id));
    }
  }, [dispatch, data]);

  const fetchServiceType = useCallback(
    (serviceId: number) => {
      dispatch(FetchServiceTypeActions.request(serviceId));
    },
    [dispatch]
  );

  const getShipmentTracking = useCallback(async () => {
    if (data) {
      while (waitingTrackingInfo) {
        await new Promise((resolve) =>
          setTimeout(() => resolve(undefined), 1000 * 60)
        );
        dispatch(OrderItemShipmentTrackingActions.request(data.id));
      }
    }
  }, [
    dispatch,
    shipmentTracking,
    shipmentTracking?.finalPortPredictiveArrivalUtc,
    data,
    waitingTrackingInfo,
  ]);

  useEffect(() => {
    if (!orderItemShipmentSubscribeLoading) return;
    getShipmentTracking();
  }, [orderItemShipmentSubscribeLoading]);

  return (
    <ExportLayout>
      <Button.Root
        size="sm"
        className="w-28 self-end"
        onClick={() =>
          location?.state?.from
            ? navigate(-1)
            : navigate("/comex/export/operacional")
        }
      >
        <ArrowLeft className="fill-current" />
        Voltar
      </Button.Root>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Tabs
            defaultValue="pedido"
            className="flex bg-white rounded-md p-4 self-center flex-col w-full"
          >
            <TabsList className="w-fit self-center">
              <TabsTrigger value="pedido">Pedido</TabsTrigger>
              <TabsTrigger value="items">Item</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="mapa">Mapa</TabsTrigger>
            </TabsList>
            <TabsContent value="pedido">
              <Pedido order={data} />
            </TabsContent>
            <TabsContent value="items">
              <Items order={data} />
            </TabsContent>
            <TabsContent value="timeline">
              <ShippingTimeline orderItem={data} />
            </TabsContent>
            <TabsContent value="mapa">
              <div className="w-full grid gap-1.5">
                {!isFlight && !isAEREA && (
                  <>
                    {!shipmentTracking && (
                      <div className="w-full flex justify-end">
                        <Button.Root
                          size="sm"
                          className="w-28 self-end"
                          onClick={() => {
                            fetchServiceType(2);
                            setModalOpen(true);
                          }}
                          disabled={
                            isDisabledButtons || !!data?.shipment_tracking_code
                          }
                        >
                          Subscrever
                        </Button.Root>
                      </div>
                    )}
                  </>
                )}
                <Map
                  data={data}
                  type={hasContainerCode ? "shipsgo" : "googlemaps"}
                />
              </div>
            </TabsContent>
          </Tabs>
          <ModalService
            isOpen={modalOpen}
            closeModal={() => {
              setModalOpen(false);
            }}
            action={() => {
              setModalOpen(false);
              isFlight
                ? dispatch(
                    OrderItemFlightSubscribeActions.request(
                      data.id,
                      getFlightTracking
                    )
                  )
                : dispatch(OrderItemShipmentSubscribeActions.request(data.id));
            }}
            loading={loadingServiceType}
            serviceType={serviceType}
          />
        </>
      )}
    </ExportLayout>
  );
};
