import React, { useCallback } from "react";
import * as S from "./styles";
import { OrderItemData } from "@/contracts";
import { useTranslation } from "react-i18next";
import checkOk from "assets/images/icons/check-ok.png";
import checkNull from "assets/images/icons/check-null.png";
import { Formatter } from "@/utils/Formatter";

interface ShippingTimelineProps {
  orderItem: OrderItemData;
}

const ShippingTimeline: React.FC<ShippingTimelineProps> = ({ orderItem }) => {
  const { t } = useTranslation();
  
  function verifyChannel(orderItem: OrderItemData | null) {
    if (
      orderItem?.channel !== "VERDE" &&
      !orderItem?.gr_effective &&
      orderItem?.data_do_registro_da_di
    ) {
      if (orderItem?.channel == "VERMELHO") {
        return <S.ChannelLabel channel="red">Canal Vermelho</S.ChannelLabel>;
      } else if (orderItem?.channel == "AMARELO") {
        return <S.ChannelLabel channel="yellow">Canal Amarelo</S.ChannelLabel>;
      }
    }

    return "";
  }

  const renderLabels = useCallback(
    (orderItem: OrderItemData) => {
      const timeline = orderItem?.timelineType?.timelines ? [...orderItem?.timelineType?.timelines] : [];
      if (!timeline) return <></>;
      const timelineSorted = timeline
      timelineSorted.sort((a, b) => (a.step > b.step ? 1 : -1));
      return timelineSorted.map((item) => {
        const hasProp = orderItem?.hasOwnProperty(item.field);
        const hasDate = orderItem[item.aux_field]
          ? orderItem[item.aux_field]
          : null;
        if (hasProp && hasDate) {
          return (
            <S.TooltipCard key={item.field}>
              <p>
                {item.description} - {orderItem[item.aux_field]}
              </p>
              {item.additional_info && (
                <S.TooltipBox>
                  <p>{item.additional_info}</p>
                </S.TooltipBox>
              )}
            </S.TooltipCard>
          );
        } else {
          return (
            <S.TooltipCard key={item.field}>
              <p>{item.description}</p>
              {item.additional_info && (
                <S.TooltipBox>
                  <p>{item.additional_info}</p>
                </S.TooltipBox>
              )}
            </S.TooltipCard>
          );
        }
      });
    },
    [orderItem]
  );

  const renderDates = useCallback(
    (orderItem: OrderItemData) => {
      const timeline = orderItem?.timelineType?.timelines ? [...orderItem?.timelineType?.timelines] : [];
      if (!timeline) return <></>;
      const timelineSorted = timeline
      timelineSorted.sort((a, b) => (a.step > b.step ? 1 : -1));
      return timelineSorted.map((item) => {
        const hasProp = orderItem.hasOwnProperty(item.field);
        const hasDate = orderItem[item.field] ? orderItem[item.field] : null;
        if (hasProp && hasDate) {
          return <p key={item.field}>{Formatter.nativeFormat(hasDate) || ""}</p>;
        } else {
          return <p key={item.field}></p>;
        }
      });
    },
    [orderItem]
  );
  const renderTimeline = (orderItem: OrderItemData) => {
    const timeline = orderItem.timelineType?.timelines ? [...orderItem.timelineType?.timelines] : [];
    const timelineSorted = timeline
    timelineSorted.sort((a, b) => (a.step > b.step ? 1 : -1));
    return timelineSorted.map((item, i) => {
      const position = {
        step: item.step,
        actual: item.code === orderItem.status,
      };
      return (
        <S.PositionBoll
          position={position}
          className={` ${position.actual ? "boll atual" : "boll"}`}
          key={position.step}
        >
          <span />
        </S.PositionBoll>
      );
    });
  };

  return (
    <S.ContentShipping>
      <S.ContentShippingTitle>
        <S.ContentShippingTitleItem>
          {t("comex.operational.orderItem.tracking.timelineType")}:{" "}
          <span>{orderItem?.timelineType?.description}</span>
        </S.ContentShippingTitleItem>
        {
          orderItem?.timelineEdited ? 
        <S.ContentShippingTitleItem>
        <S.TooltipCard>
          <p>Editado por: {orderItem?.timelineEdited?.user?.name}</p>
          <S.TooltipBox>
              <p>Data da edição: {new Date(orderItem?.timelineEdited?.created_at).toLocaleDateString()}</p>
            </S.TooltipBox>
        </S.TooltipCard>
        </S.ContentShippingTitleItem> : <></>
        }
      </S.ContentShippingTitle>

      <S.ContentShippingStatusLine
        totalSteps={orderItem?.timelineType?.timelines?.length || 11}
      >
        {orderItem && renderDates(orderItem)}
        <S.ContentShippingStatusLinePosition
          totalSteps={orderItem?.timelineType?.timelines?.length || 11}
        >
          {orderItem && renderTimeline(orderItem)}
        </S.ContentShippingStatusLinePosition>

        {orderItem && renderLabels(orderItem)}
        <S.Center>
          <S.ChannelSubtitle>{verifyChannel(orderItem)}</S.ChannelSubtitle>
        </S.Center>
      </S.ContentShippingStatusLine>
    </S.ContentShipping>
  );
};

export default ShippingTimeline;
