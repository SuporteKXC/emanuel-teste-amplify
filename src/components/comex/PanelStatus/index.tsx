import React, { useCallback, useEffect, useMemo,useState } from 'react';
import * as S from './styles'
import {useTranslation} from 'react-i18next'

type Status = "pending" | "released" | "delivered" | "finished"

interface PanelItem{
    label: string;
    key: number;
    status: Status;
    percentTransit: number;
    percentTaxClear: number;
}

export const PanelStatus: React.FC= () => {
    const { t } = useTranslation();

    const [selected,setSelected] = useState({key:1})

    const panelItens = useMemo(():PanelItem[] =>{
        return[
            {
                label: t('comex.orderPanel.pending'),
                key: 1,
                status: 'pending',
                percentTransit: 50,
                percentTaxClear: 50,
            },
            {
                label: t('comex.orderPanel.released'),
                key: 2,
                status: 'released',
                percentTransit: 0,
                percentTaxClear: 100,
            },
            {
                label: t('comex.orderPanel.delivered'),
                key: 3,
                status: 'delivered',
                percentTransit: 100,
                percentTaxClear: 100,
            },
            {
                label: t('comex.orderPanel.finished'),
                key: 4,
                status: 'finished',
                percentTransit: 10,
                percentTaxClear: 85,
            },
        ]
    },[t]);
    

    const isActive = useCallback((item:PanelItem):boolean =>{
        return selected ? item.key === selected?.key : true
    },[selected])
    
    return (
    <>
        <S.Container>
            {panelItens.map((item)=>(
                <S.Item active={isActive(item)} onClick={()=>setSelected(item)}>{item.label}</S.Item>
            ))}
        </S.Container>
        <S.PercentContainer>
            {panelItens.map((item)=>(
                (selected.key === item.key) &&
                <> 
                    <S.PercentItem>{t('comex.orderPanel.transit')} - {item.percentTransit}%</S.PercentItem>
                    <S.Progress><S.Bar width={`${item.percentTransit}%`}/></S.Progress>
                    <S.PercentItem>{t('comex.orderPanel.taxClear')} - {item.percentTaxClear}%</S.PercentItem>
                    <S.Progress><S.Bar width={`${item.percentTaxClear}%`}/></S.Progress>
                </>
            ))}
        </S.PercentContainer>
    </>
  );
};

export default PanelStatus
