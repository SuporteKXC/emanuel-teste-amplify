import React, { useRef } from 'react';
import { InfoCircle } from '@styled-icons/boxicons-solid'
import * as S from './styles';

interface TooltipItemProps {
  items: string[]
}

const TooltipItem = ({ items }: TooltipItemProps) => {
  
  return (
    <S.Container arrowPosition={items.length}>
     <InfoCircle size={21} color='#007CEF'/>
      <span className="tooltip-container">
          <div className="tooltip-items">
            {
              items.map((item, index) => <span key={index.toString()}>{item}</span>)
            }
          </div>
      </span>
    </S.Container>
 )
}

export default TooltipItem;
