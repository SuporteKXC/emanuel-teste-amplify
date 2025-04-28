import React from 'react'
import * as S from './styles'
import { useHistory } from 'react-router-dom'
import { translations } from './translations';
import { useTranslation } from 'hooks';

const InnerNavigator = () => {
    const { getTranslation } = useTranslation(translations);
    const navigate = useHistory()

    const options = [
        {
            desc: getTranslation('stock'),
            active: window.location.pathname.includes("wms"),
            url: '/wms'
        },
        // {
        //     desc: getTranslation('pending'),
        //     active: window.location.pathname.includes('wmsPending'),
        //     url: '/wmsPending'
        // },
        {
            desc: getTranslation('movement'),
            active: window.location.pathname.includes('wmsMovement'),
            url: '/wmsMovement'
        },
        {
            desc: getTranslation('dashboard'),
            active: window.location.pathname.includes('wmsDashboard'),
            url: '/wmsDashboard'
        }
    ]

  return (
    <S.Container options={options.length}>
        {options.map(e=> (<S.Option active={e.active} onClick={()=>navigate.push(e.url)}>{e.desc}</S.Option>))}
    </S.Container>
  )
}

export default InnerNavigator