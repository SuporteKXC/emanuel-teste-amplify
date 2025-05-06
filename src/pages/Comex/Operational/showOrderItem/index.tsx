import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import {
  ShowOrderItemActions,
  OrderItemShipmentSubscribeActions,
  OrderItemShipmentTrackingActions,
  OrderItemLocationActions,
  GetJustificationActions,
  NewJustificationActions,
  OrderItemFlightSubscribeActions,
  OrderItemFlightTrackingActions,
  OrderItemFlightLocationActions,
  UpdateOrderItemActions,
} from "store/ducks/comex/operational";
import { JustificationTypeListActions } from "store/ducks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Input,
  OrderItemMap,
  Select,
  ModalService,
  FlightTrackingContainer,
  OrderItemAlerts,
} from "components";
import { ActivityIndicator } from "styles/components";
import iconUser from "assets/images/user-header.png";
import iconRemetente from "assets/images/icons/icon-nf-remetente.png";
import iconMap from "assets/images/icons/icon-nf-map.png";
import iconBarco from "assets/images/icons/icon-barco.png";
import iconAir from "assets/images/icons/icon-air.png";
import iconTruck from "assets/icons/truck.svg";
import checkOk from "assets/images/icons/check-ok.png";
import checkNull from "assets/images/icons/check-null.png";
import FlightAwareLogo from "assets/images/FlightAware_logo.png";
import { IShipmentTrackingVessels, OrderItemData } from "contracts";
import { peso } from "utils";
import { FetchServiceTypeActions } from "store/ducks/comex";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { usePermission, useValidation } from "hooks";
import { format } from "date-fns";
import * as Yup from "yup";
import i18n from "i18n";
import ShippingTimeline from "@/components/comex/Operational/ShippingTimeline";
import CarrierTransport from "@/components/comex/Operational/CarrierTransport";
import { DropdownMenu } from "@/components/shared/DropdownMenu";
import EditPrevision, { DatesProps } from "./EditPrevision";
import EditTimeline from "@/components/comex/Operational/ShippingTimeline/EditTimeline";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileStackIcon, PackageSearch, PackageSearchIcon } from "lucide-react";
import Gerasinergia from "assets/images/logo-gs.png";
import { DropdownMenuGs } from "@/components/ui/DropdownMenu";
import { Formatter } from "@/utils/Formatter";
import { Input as SInput } from "@/components/ui/input";
import SearchPoForm from "./SearchPO/form";
import BoardingInformation from "@/components/comex/Operational/BoardingInformation";
import EditBoarding from "./EditBoarding";

interface Options {
  title: string;
  action: () => void;
  disabled?: boolean;
}

let waitingTrackingInfo = true;

export const ShowOrderItem: React.FC = () => {
  const { t } = useTranslation();
  const { orderItemId } = useParams();
  const { hasPermissionTo } = usePermission();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const formRefJustification = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const [vessels, setVessels] = useState<IShipmentTrackingVessels[]>();
  const [isEditingPrevisions, setIsEditingPrevisions] = useState(false);
  const [isEditingTimelines, setIsEditingTimelines] = useState(false);
  const [isEditingBoarding, setIsEditingBoarding] = useState(false);
  const [loadingBoarding, setLoadingBoarding] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const previsionsRef = useRef<HTMLDivElement>(null);
  const boardingRef = useRef<HTMLDivElement>(null);
  
  const editOptions: Options[] = useMemo(
    () => [
      {
        title: "Editar previsões",
        action: () => {
          setIsEditingPrevisions(true);
          previsionsRef.current?.scrollIntoView({ behavior: "smooth" });
          previsionsRef.current?.focus();
        },
        disabled: !hasPermissionTo("EDITPREVISION"),
      },
      {
        title: "Editar Timelines",
        action: () => {
          setIsEditingTimelines(true);
          timelineRef.current?.scrollIntoView({ behavior: "smooth" });
          timelineRef.current?.focus();
        },
        disabled: !hasPermissionTo("EDITTIMELINE"),
      },
      {
        title: "Editar embarque",
        action: () => {
          setIsEditingBoarding(true);
        },
        disabled: !hasPermissionTo("EDITBOARDING"),
      },
    ],
    [timelineRef, previsionsRef, hasPermissionTo, boardingRef]
  );

  useEffect(() => {
    if (isEditingBoarding) {
      const timeout = setTimeout(() => {
        const el = boardingRef.current;
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.focus();
        }
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [isEditingBoarding]);

  const { data: orderItem, loading } = useSelector(
    (state: RootState) => state.orderItem
  );

  const isDisabledButtons =
    !orderItem?.ata_date &&
    (!!orderItem?.port_entry_date ||
      !!orderItem?.protocol_mapa_in26_date ||
      !!orderItem?.invoice_date ||
      !!orderItem?.plant_delivery);

  const isFlight = orderItem?.modal === "pausado";
  // const isFlight = orderItem?.modal === "AEREA";
  const isAEREA = orderItem?.modal === "AEREA";

  const { loading: orderItemShipmentSubscribeLoading } = useSelector(
    (state: RootState) => state.orderItemShipmentSubscribe
  );
  const { loading: orderItemFlightSubscribeLoading } = useSelector(
    (state: RootState) => state.orderItemFlightSubscribe
  );

  const { data: shipmentTracking } = useSelector(
    (state: RootState) => state.orderItemShipmentTracking
  );

  const { data: flightTracking } = useSelector(
    (state: RootState) => state.orderItemFlightTracking
  );

  waitingTrackingInfo = !shipmentTracking?.finalPortPredictiveArrivalUtc;

  const { data: orderItemLocation } = useSelector(
    (state: RootState) => state.orderItemLocation
  );

  const { data: orderItemFlightLocation } = useSelector(
    (state: RootState) => state.orderItemFlightLocation
  );

  const { data: serviceType, loading: loadingServiceType } = useSelector(
    (state: RootState) => state.serviceType
  );

  const { data: justificationTypes, loading: loadingJustificationTypes } =
    useSelector((state: RootState) => state.justificationTypes);

  const { data: justifications } = useSelector(
    (state: RootState) => state.getJustification
  );

  const onFailure = () => {
    navigate("/");
  };
  const fetchOrderItem = useCallback(() => {
    dispatch(ShowOrderItemActions.request(orderItemId, () => {}, onFailure));
  }, [dispatch]);

  const fetchLocation = useCallback(() => {
    dispatch(OrderItemLocationActions.request(orderItemId));
  }, [dispatch]);

  const fetchFlightLocation = useCallback(() => {
    dispatch(OrderItemFlightLocationActions.request(orderItemId));
  }, [dispatch]);

  const listJustificationType = useCallback(() => {
    dispatch(JustificationTypeListActions.request());
  }, [dispatch]);

  const fetchServiceType = useCallback(
    (serviceId: number) => {
      dispatch(FetchServiceTypeActions.request(serviceId));
    },
    [dispatch]
  );

  const getJustification = useCallback(() => {
    dispatch(GetJustificationActions.request({ orderItem: orderItemId }));
  }, [dispatch]);

  useEffect(() => {
    fetchOrderItem();

    // cleanup function
    return () => {
      dispatch(OrderItemShipmentTrackingActions.failure());
      dispatch(ShowOrderItemActions.failure());
      dispatch(OrderItemFlightTrackingActions.failure());
    };
  }, []);

  useEffect(() => {
    if (hasPermissionTo("LISTJUSTIFICATIONTYPE")) {
      listJustificationType();
    }
    if (hasPermissionTo("LISTJUSTIFICATION")) {
      getJustification();
    }
  }, []);

  useEffect(() => {
    if (shipmentTracking) {
      const events = shipmentTracking?.transportationPlan?.events;
      setVessels(
        shipmentTracking?.transportationPlan?.vessels
          .map<IShipmentTrackingVessels>((vessel) => ({
            ...vessel,
            cdtDate: events?.find(
              (event) =>
                event.vessel.shipId === vessel.shipId &&
                event.eventTypeCode === "CDT"
            )?.eventDatetime,
            cltDate: events?.find(
              (event) =>
                event.vessel.shipId === vessel.shipId &&
                event.eventTypeCode === "CLT"
            )?.eventDatetime,
          }))
          .reverse()
      );
    }
  }, [shipmentTracking]);

  useEffect(() => {
    if (orderItem?.shipment_tracking_code) {
      isFlight
        ? dispatch(OrderItemFlightTrackingActions.request(orderItemId))
        : dispatch(OrderItemShipmentTrackingActions.request(orderItemId));
    }
  }, [dispatch, orderItem]);

  useEffect(() => {
    if (!orderItemShipmentSubscribeLoading) return;
    getShipmentTracking();
  }, [orderItemShipmentSubscribeLoading]);

  const orderItemLastLocation = useMemo(() => {
    if (!orderItem?.current_latitude) return null;
    return {
      lat: Number(orderItem?.current_latitude),
      lng: Number(orderItem?.current_longitude),
    };
  }, [orderItem]);

  const getShipmentTracking = useCallback(async () => {
    while (waitingTrackingInfo) {
      await new Promise((resolve) =>
        setTimeout(() => resolve(undefined), 1000 * 60)
      );
      dispatch(OrderItemShipmentTrackingActions.request(orderItemId));
    }
  }, [
    dispatch,
    shipmentTracking,
    shipmentTracking?.finalPortPredictiveArrivalUtc,
    orderItemId,
    waitingTrackingInfo,
  ]);
  const getFlightTracking = useCallback(async () => {
    dispatch(OrderItemFlightTrackingActions.request(orderItemId));
  }, [dispatch, orderItemId]);

  const justificationTypeValid = justificationTypes
    ?.filter((justify) => justify.category === "comex")
    .map((item) => ({
      value: `${item.id}`,
      label: item.description,
    }));

  const clearJustification = useCallback(() => {
    if (formRefJustification.current) {
      formRefJustification.current.setFieldValue("justification_type_id", "");
      formRefJustification.current.setFieldValue("description", "");
    }
    dispatch(NewJustificationActions.reset());
  }, []);

  const onEditSuccess = () => {
    setIsEditingPrevisions(false);
    setIsEditingTimelines(false);
    setIsEditingBoarding(false);
    fetchOrderItem();
  };
  const handleEditPrevision = useCallback(
    (data: DatesProps) => {
      console.log(data);
      dispatch(
        UpdateOrderItemActions.request(orderItemId, data, onEditSuccess)
      );
    },
    [dispatch]
  );
  const onEditBoardingSuccess = () => {
    setIsEditingPrevisions(false);
    setIsEditingTimelines(false);
    setIsEditingBoarding(false);
    setLoadingBoarding(false)
    fetchOrderItem();
  };
  
  const handleEditBoarding = useCallback(
    (data: DatesProps) => {
      setLoadingBoarding(true)
      dispatch(
        UpdateOrderItemActions.request(orderItemId, data, onEditBoardingSuccess)
      );
    },
    [dispatch]
  );

  const handleEditTimelines = useCallback(
    (data: { [key: string]: Date | string | null }) => {
      console.log(data);
      dispatch(
        UpdateOrderItemActions.request(orderItemId, data, onEditSuccess)
      );
    },
    [dispatch]
  );

  const onSubmitJustification = useCallback<SubmitHandler<any>>(
    async (data): Promise<void> => {
      try {
        if (!formRefJustification) return;
        formRefJustification.current?.setErrors({});

        data.order_item_id = orderItemId;

        const schema = Yup.object().shape({
          description: Yup.string().required(t("comex.message.fieldMandatory")),
          justification_type_id: Yup.string().required(
            t("comex.message.fieldMandatory")
          ),
          order_item_id: Yup.number().required(
            t("comex.message.fieldMandatory")
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(NewJustificationActions.request(data, getJustification));
        clearJustification();
      } catch (error) {
        if (formRefJustification) handleFormErrors(error, formRefJustification);
      }
    },
    [dispatch, handleFormErrors]
  );

  return (
    <>
      <S.Container>
        {
          <S.Heading>
            <div className="wrapper">
              <span>
                <S.CogIcon height={30} width={30} /> Operacional
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <span className="px-2 py-1 mr-2 text-xs rounded-lg cursor-pointer bg-primary text-primary-foreground">
                    Pesquisar PO
                  </span>
                </DialogTrigger>
                <DialogContent className=" min-w-[500px] max-w-fit">
                  <DialogHeader className="text-lg font-GilroySemibold">
                    Pesquise pelo número da PO
                  </DialogHeader>
                  <div className="flex items-center justify-center gap-2 p-4">
                    <SearchPoForm />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-4">
              <S.GoBack
                onClick={() =>
                  location?.state?.from
                    ? navigate(-1)
                    : navigate("/comex/operacional")
                }
              >
                <S.ArrowLeftIcon />
                {"Voltar"}
              </S.GoBack>
              <DropdownMenuGs options={editOptions} />
            </div>
          </S.Heading>
        }

        {loading ? (
          <S.Center>
            <ActivityIndicator />
          </S.Center>
        ) : (
          <S.ContentContainer>
            <S.ContentHeader critical={orderItem?.process_critical}>
              {orderItem?.canceled_at && (
                <S.CanceledTag>PO/Item cancelado</S.CanceledTag>
              )}
              <S.ContentHeaderDetails>
                <span>
                  PO:{" "}
                  <strong>
                    <br />
                    {`${orderItem?.order?.order_reference} - ${orderItem?.item}`}
                  </strong>
                </span>
                <span>
                  Customer PO:{" "}
                  <strong>
                    <br />
                    {orderItem?.customer_po}
                  </strong>
                </span>
                <span>
                  Produto: <br />
                  <strong>{orderItem?.product?.description}</strong>
                </span>
                <span>
                  Quantidade: <br />
                  <strong>{peso(Number(orderItem?.qty))}</strong>
                </span>
                <span>
                  {orderItem?.order?.order_files?.length ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <FileStackIcon />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Documentação</DialogTitle>
                        </DialogHeader>
                        <p>{orderItem?.order?.order_files?.length} arquivos</p>
                        <div className="flex flex-col p-4 border-gray-900 rounded-sm">
                          {orderItem?.order?.order_files?.map((file) => (
                            <a
                              key={file.id}
                              href={file.file_link}
                              target="_blank"
                            >
                              {file.description}
                            </a>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <></>
                  )}
                </span>
              </S.ContentHeaderDetails>
            </S.ContentHeader>

            <S.ContentMain>
              <S.ContentMainHeader>
                <S.ContentModal>
                  <S.ContentInfo>
                    <p>{t("comex.operational.orderItem.tracking.nextStep")}:</p>
                    <p>{orderItem?.process_status}</p>
                  </S.ContentInfo>
                  <S.ContentInfo>
                    <p>Modal:</p>
                    <p>{orderItem?.modal}</p>
                  </S.ContentInfo>
                  <S.ContentInfo>
                    <p>
                      {t("comex.operational.orderItem.tracking.processType")}:
                    </p>
                    <p>{orderItem?.process_type}</p>
                  </S.ContentInfo>
                  <S.ContentInfo>
                    <p>
                      {t("comex.operational.orderItem.tracking.responsiblePo")}:
                    </p>
                    <p>
                      {orderItem?.supplier?.responsible_analists
                        ?.map((e) => e.name)
                        .join(", ")}
                    </p>
                  </S.ContentInfo>
                </S.ContentModal>
                <S.History>
                  <S.HistoryTitle>
                    <p>Último Histórico</p>
                    <time className="date">
                      {orderItem?.last_historic_update
                        ? new Date(
                            orderItem?.last_historic_update
                          ).toLocaleDateString()
                        : "-"}
                    </time>
                  </S.HistoryTitle>
                  <S.Boll />
                  <S.UserInfo>
                    <img src={iconUser} alt="" />
                    <div>
                      {orderItem?.last_historic
                        ? orderItem?.last_historic
                            .split(";")
                            ?.map((element, index) => {
                              return <p key={index}>{element}</p>;
                            })
                        : ""}
                    </div>
                  </S.UserInfo>
                </S.History>
              </S.ContentMainHeader>
              <S.ContentMainBody>
                <S.ContentMainBodyItem>
                  <S.ContentMainBodyItemIcon>
                    <img src={iconRemetente} alt="" />
                    <p>Fornecedor:</p>
                  </S.ContentMainBodyItemIcon>
                  <S.ContentMainBodyItemInfo>
                    <p>Razão Social:</p>
                    <p>{orderItem?.shipper}</p>
                    <p>Origem:</p>
                    <p>{orderItem?.shipper_address}</p>
                  </S.ContentMainBodyItemInfo>
                </S.ContentMainBodyItem>

                <S.ContentMainBodyItem>
                  <S.ContentMainBodyItemIcon>
                    <img src={iconMap} alt="" />
                    <p>Destinatário</p>
                  </S.ContentMainBodyItemIcon>
                  <S.ContentMainBodyItemInfo>
                    <p>Razão Social:</p>
                    <p>{orderItem?.order?.company?.consignee}</p>
                    <p>Terminal de Atracação:</p>
                    <p>{orderItem?.destination_harbor}</p>
                    <p>Terminal do Desembaraço:</p>
                    <p>{orderItem?.port_clearance}</p>
                    <p>Planta Destino:</p>
                    <p>{orderItem?.order?.company?.country}</p>
                  </S.ContentMainBodyItemInfo>
                </S.ContentMainBodyItem>

                <S.ContentMainBodyItem>
                  <S.ContentMainBodyItemIcon ref={previsionsRef}>
                    <img
                      src={
                        orderItem?.modal === "AEREA"
                          ? iconAir
                          : orderItem?.modal === "MARITIMA"
                          ? iconBarco
                          : orderItem?.modal === "RODOVIARIA"
                          ? iconTruck
                          : ""
                      }
                      alt=""
                    />
                    <p>Previsões</p>
                    {orderItem?.previsionEdited ? (
                      <S.TooltipCard>
                        <p>
                          Editado por: {orderItem?.previsionEdited?.user?.name}
                        </p>
                        <S.TooltipBox>
                          <p>
                            Data da edição:{" "}
                            {new Date(
                              orderItem?.previsionEdited?.created_at
                            ).toLocaleDateString()}
                          </p>
                        </S.TooltipBox>
                      </S.TooltipCard>
                    ) : (
                      <></>
                    )}
                  </S.ContentMainBodyItemIcon>
                  {isEditingPrevisions && orderItem ? (
                    <EditPrevision
                      onClose={() => setIsEditingPrevisions(false)}
                      orderItem={orderItem}
                      onSuccess={(data: DatesProps) => handleEditPrevision(data)}
                    />
                  ) : (
                    <S.ContentMainBodyItemInfo>
                      <p>
                        ETD({t("comex.operational.orderItem.tracking.ETDFull")}
                        ):
                      </p>
                      <p>
                        {orderItem?.etd_date &&
                          new Date(orderItem?.etd_date).toLocaleDateString()}
                      </p>
                      <p>
                        ETA({t("comex.operational.orderItem.tracking.ETAFull")}
                        ):
                      </p>
                      <p>
                        {orderItem?.eta_date &&
                          new Date(orderItem?.eta_date).toLocaleDateString()}
                      </p>
                      <p>ETA Revisado:</p>
                      <p>
                        {orderItem?.revised_eta_date &&
                          new Date(
                            orderItem?.revised_eta_date
                          ).toLocaleDateString()}
                      </p>
                      <p>
                        ETB({t("comex.operational.orderItem.tracking.ETBFull")}
                        ):
                      </p>
                      <p>
                        {orderItem?.etb_date &&
                          new Date(orderItem?.etb_date).toLocaleDateString()}
                      </p>
                      <p>GR Atual</p>
                      <p>
                        {orderItem?.gr_actual &&
                          new Date(orderItem?.gr_actual).toLocaleDateString()}
                      </p>
                    </S.ContentMainBodyItemInfo>
                  )}
                </S.ContentMainBodyItem>
              </S.ContentMainBody>
              <div className="grid w-full grid-cols-3 gap-5">
                <div className="col-span-1" ref={boardingRef} id="boardingRef">
                  {isEditingBoarding && orderItem ? (
                    <EditBoarding
                      onClose={() => setIsEditingBoarding(false)}
                      orderItem={orderItem}
                      onSuccess={(data) => handleEditBoarding(data)}
                      loading={loadingBoarding}
                    />
                  ) : (
                    <BoardingInformation orderItem={orderItem!!} />
                  )}
                </div>
                <div className="col-span-2">
                  <CarrierTransport orderItem={orderItem!!} />
                </div>
              </div>

              {orderItem && isEditingTimelines && (
                <div ref={timelineRef}>
                  <EditTimeline
                    onCancel={() => setIsEditingTimelines(false)}
                    onSubmit={handleEditTimelines}
                    orderItem={orderItem!!}
                  />
                </div>
              )}
              <ShippingTimeline orderItem={orderItem!!} />
              {!isAEREA && (
                <>
                  <S.Center>
                    {isFlight ? (
                      <S.ImageBase src={FlightAwareLogo} />
                    ) : (
                      <S.ImageBase src={Gerasinergia ?? ""} />
                    )}
                  </S.Center>

                  {/* MarineTraffic Container */}
                  {!isFlight && (
                    <S.TrackingContainer>
                      <S.Center>
                        <h3>
                          {t("comex.operational.orderItem.tracking.title")}
                        </h3>
                      </S.Center>
                      {!shipmentTracking && (
                        <S.TrackingSubscription>
                          {orderItemShipmentSubscribeLoading ? (
                            t(
                              "comex.operational.orderItem.tracking.waitingPhrase"
                            )
                          ) : (
                            <>
                              <S.Center>
                                {t(
                                  "comex.operational.orderItem.tracking.subscriptionTitle"
                                )}
                              </S.Center>
                              <S.Button
                                onClick={() => {
                                  fetchServiceType(2);
                                  setModalOpen(true);
                                }}
                                disabled={
                                  isDisabledButtons ||
                                  !!orderItem?.shipment_tracking_code
                                }
                              >
                                {t(
                                  "comex.operational.orderItem.tracking.subscribeButton"
                                )}
                              </S.Button>
                            </>
                          )}
                        </S.TrackingSubscription>
                      )}

                      <div>
                        <S.ChecksContainer>
                          <S.Check>
                            <S.CheckImage
                              src={`${
                                shipmentTracking?.originPortActualDepartureUtc
                                  ? checkOk
                                  : checkNull
                              }`}
                            />
                            <S.CheckInfo
                              isOk={
                                !!shipmentTracking?.originPortActualDepartureUtc
                              }
                            >
                              <p>
                                {t(
                                  "comex.operational.orderItem.tracking.originPort"
                                )}
                              </p>
                              <p>
                                {Formatter.dateOrEmpty(
                                  shipmentTracking?.originPortActualDepartureUtc
                                )}
                              </p>
                            </S.CheckInfo>
                          </S.Check>

                          <S.Check>
                            <S.CheckImage
                              src={`${
                                shipmentTracking?.finalPortPredictiveArrivalUtc
                                  ? checkOk
                                  : checkNull
                              }`}
                            />
                            <S.CheckInfo
                              isOk={
                                !!shipmentTracking?.finalPortPredictiveArrivalUtcLast
                              }
                            >
                              <p>
                                {t(
                                  "comex.operational.orderItem.tracking.portPredict"
                                )}
                              </p>
                              <p>
                                {Formatter.dateOrEmpty(
                                  shipmentTracking?.finalPortPredictiveArrivalUtc
                                )}
                              </p>
                            </S.CheckInfo>
                          </S.Check>

                          <S.Check>
                            <S.CheckImage
                              src={`${
                                shipmentTracking?.finalPortPredictiveArrivalUtcLast
                                  ? checkOk
                                  : checkNull
                              }`}
                            />
                            <S.CheckInfo
                              isOk={
                                !!shipmentTracking?.finalPortPredictiveArrivalUtcLast
                              }
                            >
                              <p>
                                {t(
                                  "comex.operational.orderItem.tracking.finalPort"
                                )}
                              </p>
                              <p>
                                {Formatter.dateOrSelf(
                                  shipmentTracking?.finalPortPredictiveArrivalUtcLast
                                )}
                              </p>
                            </S.CheckInfo>
                          </S.Check>
                        </S.ChecksContainer>

                        {shipmentTracking &&
                        shipmentTracking?.transportationPlan?.vessels ? (
                          <S.CenterTitle>
                            <h3>
                              {t(
                                "comex.operational.orderItem.tracking.historic"
                              )}
                            </h3>
                          </S.CenterTitle>
                        ) : (
                          ""
                        )}
                        {shipmentTracking && vessels
                          ? vessels.map((vessel, index) => {
                              return (
                                <S.CheckInfoContainer key={index}>
                                  <S.Check>
                                    <S.DivGrid>
                                      <S.NumberGrid>{index + 1}</S.NumberGrid>
                                      <S.TitleGrid>
                                        {t(
                                          "comex.operational.orderItem.tracking.historicName"
                                        )}
                                      </S.TitleGrid>
                                      <S.NameGrid>
                                        {vessel.vesselName}
                                      </S.NameGrid>
                                    </S.DivGrid>
                                  </S.Check>
                                  <S.Check>
                                    <S.CheckInfoText>
                                      <div>
                                        <span>
                                          {t(
                                            "comex.operational.orderItem.tracking.loadedVessel"
                                          )}
                                          :&nbsp;&nbsp;
                                        </span>
                                        <span
                                          className={`${
                                            vessel.cltDate && "date"
                                          }`}
                                        >
                                          {vessel.cltDate
                                            ? new Date(
                                                vessel.cltDate
                                              ).toLocaleDateString(
                                                i18n.language
                                              )
                                            : "--/--/---"}
                                        </span>
                                      </div>
                                      <div>
                                        <span>
                                          {t(
                                            "comex.operational.orderItem.tracking.dischargedVessel"
                                          )}
                                          :&nbsp;&nbsp;
                                        </span>
                                        <span
                                          className={`${
                                            vessel.cdtDate && "date"
                                          }`}
                                        >
                                          {vessel.cdtDate
                                            ? new Date(
                                                vessel.cdtDate
                                              ).toLocaleDateString(
                                                i18n.language
                                              )
                                            : "--/--/---"}
                                        </span>
                                      </div>
                                    </S.CheckInfoText>
                                  </S.Check>
                                  <S.Check>
                                    <S.CheckInfoText>
                                      <p>
                                        {t(
                                          "comex.operational.orderItem.tracking.IMO"
                                        )}
                                      </p>
                                      <p>{vessel.vesselIMONumber}</p>
                                    </S.CheckInfoText>
                                  </S.Check>
                                  <S.Check>
                                    <S.CheckInfoText>
                                      <p>
                                        {t(
                                          "comex.operational.orderItem.tracking.MMSI"
                                        )}
                                      </p>
                                      <p>{vessel.vesselMMSINumber}</p>
                                    </S.CheckInfoText>
                                  </S.Check>
                                </S.CheckInfoContainer>
                              );
                            })
                          : ""}
                      </div>
                    </S.TrackingContainer>
                  )}

                  {/* FlightAware Container */}

                  {isFlight && (
                    <FlightTrackingContainer
                      data={flightTracking}
                      loading={orderItemFlightSubscribeLoading}
                      action={() => {
                        fetchServiceType(4);
                        setModalOpen(true);
                      }}
                      disabled={false}
                    />
                  )}
                  {!orderItem?.ata_date && (
                    <S.MapLayer>
                      <S.MapHeader>
                        <S.MapToggleTitle>
                          Veja a encomenda no mapa
                        </S.MapToggleTitle>
                        <div></div>
                      </S.MapHeader>
                      {!waitingTrackingInfo && (
                        <iframe
                          src={`https://shipsgo.com/iframe/where-is-my-container/${orderItem?.container_code}?tags=hide-search-box`}
                          id="IframeShipsgoLiveMap"
                          className="h-[550px] col-span-2 w-[100%]"
                          title="Shipsgo Live Map"
                        ></iframe>
                      )}
                      {isFlight && (
                        <OrderItemMap
                          orderItem={orderItem}
                          orderItemLocation={
                            orderItemLocation || orderItemFlightLocation
                              ? isFlight
                                ? orderItemFlightLocation
                                : orderItemLocation
                              : orderItemLastLocation
                          }
                          isVisible={
                            !!orderItem?.current_latitude ||
                            !!orderItemLocation ||
                            !!orderItemFlightLocation
                          }
                          isFlight={isFlight}
                        />
                      )}
                    </S.MapLayer>
                  )}
                </>
              )}
            </S.ContentMain>
            {orderItem?.order_item_alert[0] && (
              <OrderItemAlerts alerts={orderItem?.order_item_alert} />
            )}
            {justifications && justifications.length ? (
              <S.ContentJustification>
                <S.ContentShippingTitle>
                  {t(
                    "comex.operational.orderItem.justification.justifications"
                  )}
                </S.ContentShippingTitle>
                <S.GridHeaderJustification>
                  <p>
                    {t("comex.operational.orderItem.justification.description")}
                  </p>
                  <p>
                    {t(
                      "comex.operational.orderItem.justification.justificationType"
                    )}
                  </p>
                  <p>{t("comex.operational.orderItem.justification.user")}</p>
                  <p>{t("comex.operational.orderItem.justification.date")}</p>
                </S.GridHeaderJustification>
                {justifications.map((element, index) => {
                  return (
                    <S.GridJustification key={index}>
                      <p>{element.description ? element.description : "---"}</p>
                      <p>{element.justification_type?.description}</p>
                      <p>{element.user?.name}</p>
                      <p>
                        {element.created_at
                          ? format(new Date(element.created_at), "dd-MM-yyyy")
                          : "--/--/----"}
                      </p>
                    </S.GridJustification>
                  );
                })}
              </S.ContentJustification>
            ) : (
              ""
            )}
            {hasPermissionTo("CREATEJUSTIFICATION") ? (
              <S.ContentJustification>
                <S.ContentShippingTitle>
                  {t(
                    "comex.operational.orderItem.justification.createJustification"
                  )}
                </S.ContentShippingTitle>
                <Form
                  ref={formRefJustification}
                  onSubmit={onSubmitJustification}
                  placeholder=""
                >
                  <Select
                    name="justification_type_id"
                    options={justificationTypeValid}
                    label={t(
                      "comex.operational.orderItem.justification.justification"
                    )}
                    placeholder={t("comex.filterandButton.selectPlaceholder")}
                    isLoading={loadingJustificationTypes}
                  />
                  <Input
                    name="description"
                    label={t(
                      "comex.operational.orderItem.justification.description"
                    )}
                    type="text"
                    placeholder={t(
                      "comex.operational.orderItem.justification.description"
                    )}
                  />
                  <S.ModalRow>
                    <S.Button type="submit">
                      {t("comex.operational.orderItem.justification.okButton")}
                    </S.Button>
                    <S.Button
                      type="reset"
                      mood="light"
                      onClick={clearJustification}
                    >
                      {t("comex.operational.orderItem.justification.clear")}
                    </S.Button>
                  </S.ModalRow>
                </Form>
              </S.ContentJustification>
            ) : (
              ""
            )}
          </S.ContentContainer>
        )}
      </S.Container>
      {/* Modal  */}
      <ModalService
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        action={() => {
          setModalOpen(false);
          isFlight
            ? dispatch(
                OrderItemFlightSubscribeActions.request(
                  orderItemId,
                  getFlightTracking
                )
              )
            : dispatch(OrderItemShipmentSubscribeActions.request(orderItemId));
        }}
        loading={loadingServiceType}
        serviceType={serviceType}
      />
      <ModalService
        isOpen={mapModalOpen}
        closeModal={() => setMapModalOpen(false)}
        action={() => {
          setMapModalOpen(false);
          isFlight ? fetchFlightLocation() : fetchLocation();
        }}
        loading={loadingServiceType}
        serviceType={serviceType}
      />
    </>
  );
};

export default ShowOrderItem;
