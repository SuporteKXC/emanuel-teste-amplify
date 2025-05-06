import {
  InnerNavigator,
  InnerNavigatorOption,
} from "@/components/ui/InnerNavigator";
import React, { useCallback, useState } from "react";
import { ExportLayout } from "../../layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useShowExportOrderItens from "@/queries/ExportOrderItens/showExportOrder";
import Items from "./tabs/itens";
import Map from "../../Operacional/Details/tabs/map";
import { ActivityIndicator } from "@/styles/components";
import ShippingTimeline from "../../Operacional/Details/tabs/timeline";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/ButtonGs";
import { FetchServiceTypeActions } from "@/store/ducks";
import { ModalService } from "@/components";
import { useExportSubscribe } from "../../queries/export-flight-subscribe";
import { useGetShipmentTracking } from "../../queries/get-shipment-tracking";
import { notify } from "@/services";
import { ReactComponent as ArrowLeft } from "assets/icons/arrow-left.svg";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import SearchPoForm from "./SearchPO/form";
const navigatorOptions: InnerNavigatorOption[] = [
  {
    title: "Operacional",
    route: "",
    hasPermission: true,
  },
];

// let waitingTrackingInfo = true;
export const ShowExportOrderIten: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useShowExportOrderItens(id!);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  //google maps -> atd libera subscribe btn -> se tiver shipement_tracking_code -> libera shipsgo -> se tive ata_date -> volta google maps
  const enableSubscribeBtn = Boolean(
    data?.atd_date && !data?.ata_date && data?.container_code
  );

  // verifica se vai exibir mapa shipsgo ou googlemps
  const hasShipgo = data?.shipment_tracking_code && !data?.ata_date;

  const {
    mutate: mutateGetShipmentTracking,
    isPending: isPendingShipmentTracking,
  } = useGetShipmentTracking();

  const getShipmentTracking = useCallback(async () => {
    if (data) {
      mutateGetShipmentTracking(data.id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  }, [data]);

  const { data: serviceType, loading: loadingServiceType } = useSelector(
    (state: RootState) => state.serviceType
  );
  // atd e ata ->
  // waitingTrackingInfo = !shipmentTracking?.finalPortPredictiveArrivalUtc;
  // const isDisabledButtons =
  //   !data?.ata_date &&
  //   (!!data?.port_entry_date ||
  //     // !!data?.protocol_mapa_in26_date ||
  //     !!data?.invoice_date ||
  //     !!data?.plant_delivery);

  const fetchServiceType = useCallback(
    (serviceId: number) => {
      dispatch(FetchServiceTypeActions.request(serviceId));
    },
    [dispatch]
  );

  const { mutate: mutateExportSubscription } = useExportSubscribe();

  const handleSubscription = () => {
    setModalOpen(false);

    mutateExportSubscription(
      {
        id: data.id,
        modal: data?.modal,
      },
      {
        onSuccess: () => {
          getShipmentTracking();
        },
        onError: () => {
          notify("error", "Opps! não foi possível realizar esta ação.");
        },
      }
    );
  };

  return (
    <ExportLayout>
      <div className="flex justify-between items-center">
          <Dialog>
          <DialogTrigger asChild>
            <span className="cursor-pointer mr-2 rounded-lg bg-primary px-2 py-1 text-xs w-fit text-primary-foreground">
              Pesquisar PO
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="font-GilroySemibold text-lg">
              Pesquise pelo número da PO
            </DialogHeader>
            <div className="flex gap-2 items-center justify-center p-4">
              <SearchPoForm />
            </div>
          </DialogContent>
        </Dialog>
        <Button.Root
          size="sm"
          className="w-28 self-end"
          onClick={() =>
            location?.state?.from
              ? navigate(-1)
              : navigate("/comex/export/operacional-item")
          }
        >
          <ArrowLeft className="fill-current" />
          Voltar
        </Button.Root>
      </div>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Tabs
            defaultValue="items"
            className="flex bg-white rounded-md p-4 self-center flex-col w-full"
          >
            <TabsList className="w-fit self-center mb-2">
              <TabsTrigger value="items">Item</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="mapa">Mapa</TabsTrigger>
            </TabsList>
            <Separator />
            <TabsContent value="items">
              <Items order={data} />
            </TabsContent>
            <TabsContent value="timeline">
              <ShippingTimeline orderItem={data} />
            </TabsContent>
            <TabsContent value="mapa">
              <div className="w-full grid gap-1.5">
                {enableSubscribeBtn && (
                  <div className="w-full flex justify-end">
                    <Button.Root
                      size="sm"
                      className="w-28 self-end"
                      onClick={() => {
                        fetchServiceType(2);
                        setModalOpen(true);
                      }}
                      disabled={isPendingShipmentTracking}
                    >
                      Subscrever
                    </Button.Root>
                  </div>
                )}
                <Map data={data} type={hasShipgo ? "shipsgo" : "googlemaps"} />
              </div>
            </TabsContent>
          </Tabs>
          <ModalService
            isOpen={modalOpen}
            closeModal={() => {
              setModalOpen(false);
            }}
            action={handleSubscription}
            loading={loadingServiceType}
            serviceType={serviceType}
          />
        </>
      )}
    </ExportLayout>
  );
};
