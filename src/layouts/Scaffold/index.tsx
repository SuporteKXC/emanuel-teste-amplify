import React from 'react';
import LeftPanel from './LeftPanel';
import TopPanel from './TopPanel';
import * as S from './styles';

interface Props extends React.PropsWithChildren<{}> {}

export const Scaffold: React.FC<Props> = ({ children }) => {
  return (
    <S.PageContainer>
      <S.Backdrop>
        <S.MainContainer>
          <S.LeftPanelSlot>
            <LeftPanel />
          </S.LeftPanelSlot>
          <S.MainSlot>
            <TopPanel />
            <S.ChildrenSlot>{children}</S.ChildrenSlot>
          </S.MainSlot>
        </S.MainContainer>
      </S.Backdrop>
    </S.PageContainer>
  );
};
