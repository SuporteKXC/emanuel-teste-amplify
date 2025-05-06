import { TabelaDay } from "contracts";
import React, { useEffect, useState } from 'react';
import * as S from './styles';

interface DataProps {
  [key: string]: any;
}

interface GenericValues {
  [key: string]: any;
  delay: string;
  media: string;
  meta: string;
}

const TablePerformance: React.FC<DataProps> = (prop: DataProps) => {
  const [days, setDays] = useState(0);

  const { obj } = prop;
  const {
    daysPortEntryDateTotal,
    daysPostImportLicenseReleaseDateTotal,
    daysProtocolMapaIn26DateTotal,
    daysDataDoRegistroDaDiTotal,
    daysCustomsClearanceTotal,
    daysNfDateTotal,
    daysTransportDocDeliveryDateTotal,
    daysLoadingAtTheTerminalTotal,
    daysEntregaNaPlantaTotal,
    // daysGrEfetivo,
  } = obj;

  const colspan = 2;
  let indexMedia = 0;
  let indexMeta = 0;

  useEffect(() => {
    if (prop?.obj) {
      const medias = Math.round(
        parseFloat(daysPortEntryDateTotal.media) +
          parseFloat(daysPostImportLicenseReleaseDateTotal.media) +
          parseFloat(daysProtocolMapaIn26DateTotal.media) +
          parseFloat(daysDataDoRegistroDaDiTotal.media) +
          parseFloat(daysCustomsClearanceTotal.media) +
          parseFloat(daysNfDateTotal.media) +
          parseFloat(daysTransportDocDeliveryDateTotal.media) +
          parseFloat(daysLoadingAtTheTerminalTotal.media) +
          parseFloat(daysEntregaNaPlantaTotal.media)
          // + parseFloat(daysGrEfetivo.media)
      );
      const metas =
        daysPortEntryDateTotal.transitTime +
        daysPostImportLicenseReleaseDateTotal.transitTime +
        daysProtocolMapaIn26DateTotal.transitTime +
        daysDataDoRegistroDaDiTotal.transitTime +
        daysCustomsClearanceTotal.transitTime +
        daysNfDateTotal.transitTime +
        daysTransportDocDeliveryDateTotal.transitTime +
        daysLoadingAtTheTerminalTotal.transitTime +
        daysEntregaNaPlantaTotal.transitTime
        // + daysGrEfetivo.transitTime;
      setDays(medias > metas ? medias : metas);
    }
  }, [prop.obj]);

  const renderHead = () => {
    const items = new Array();

    for (let index = 0; index <= days; index += 1) {
      items.push(
        <th colSpan={index === 0 ? 1 : colspan} key={index}>
          {index}
        </th>
      );
    }

    return items;
  };
  const getRoundValues = (value: any) => {
    const values = `${value}`.split('.');

    let beforeDot = parseInt(values[0], 10);

    const afterDot = parseInt(values[1], 10);

    beforeDot *= colspan;

    if (afterDot >= 50) {
      beforeDot += 1;
    }

    return beforeDot;
  };

  const renderMedia = (value: any, expected: any) => {
    const items = new Array();
    let next = false;
    for (let index = 0; index <= days * colspan; ) {
      if (index === indexMedia && !next) {
        const roundValue = getRoundValues(value);
        items.push(
          <td colSpan={roundValue} key={indexMedia}>
            <S.ItemTable color={value > expected ? '#DB4C55' : '#02B99D'}>
              {value?.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </S.ItemTable>
          </td>
        );
        indexMedia += roundValue;
        next = true;
        index += roundValue || 1;
      } else {
        items.push(<td />);

        index += 1;
      }
    }

    return items;
  };

  const renderMeta = (value: any) => {
    const items = new Array();

    let next = false;

    for (let index = 0; index <= days * colspan; ) {
      if (index === indexMeta && !next) {
        const roundValue = getRoundValues(value);

        items.push(
          <td colSpan={roundValue} key={indexMeta}>
            <S.ItemTable color="#3F51B5">{value?.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}</S.ItemTable>
          </td>
        );

        indexMeta += roundValue;

        next = true;

        index += roundValue || 1;
      } else {
        items.push(<td />);

        index += 1;
      }
    }

    return items;
  };

  const renderRows = (value: GenericValues, label: string) => {
    return (
      <>
        <tr>
          <th rowSpan={2}>
            <span>{label}</span>
            <S.BarPercentTable
              height="20"
              percent={value.porcent}
              color="y"
              title={`${Math.trunc(value.porcent)}%`}
            />
          </th>
          {renderMeta(value.transitTime)}
        </tr>
        <tr>
          {renderMedia(value.media, value.transitTime)}
        </tr>
      </>
    );
  };

  return (
    <>
      {prop.obj ? (
        <S.Table>
          <tbody>
            <tr>
              <th />
              {renderHead()}
            </tr>
            {renderRows(daysPortEntryDateTotal, 'ATA X PRES')}
            {renderRows(daysPostImportLicenseReleaseDateTotal, 'PRES X DEFER')}
            {renderRows(daysProtocolMapaIn26DateTotal, 'DEFER X INSPECAO')}
            {renderRows(daysDataDoRegistroDaDiTotal, 'DEFER X REGISTRO')}
            {renderRows(daysCustomsClearanceTotal, 'REGISTRO X DESEMB')}
            {renderRows(daysNfDateTotal, 'DESEMB X DANFE')}
            {renderRows(daysTransportDocDeliveryDateTotal, 'DANFE X DOCS')}
            {renderRows(daysLoadingAtTheTerminalTotal, 'DOCS X SAIDA')}
            {renderRows(daysEntregaNaPlantaTotal, 'SAIDA X DELIVERY')}
            {/* {renderRows(daysGrEfetivo, 'DELIVERY X GR')} */}
          </tbody>
        </S.Table>
      ) : (
        <h1>Não há dados suficientes</h1>
      )}
    </>
  );
};

export default TablePerformance;
