import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from 'hooks';
import * as S from './styles';

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  info?: string;
  to: string;
  isAllowed: boolean;
}

const LeftPanel: React.FC = () => {
  const isRecalled = sessionStorage.getItem('isRecall');
  const [isRecall, setIsRecall] = useState(() =>
    isRecalled ? JSON.parse(isRecalled) : false
  );
  const { userBelongsToAnyOf } = useAuth();
  const location = useLocation();

  const menuItems = useMemo((): MenuItem[] => {
    return [
      {
        icon: <S.DashboardIcon />,
        title: 'Dashboard',
        info: 'Gerencie seus indicadores para melhor administração do seu estoque',
        to: '/dashboard',
        isAllowed: true,
      },
      {
        icon: <S.ListIcon />,
        title: 'Painel Gerencial',
        info: 'Acompanhe o estoque dos seus produtos em nossos armazéns.',
        to: '/',
        isAllowed: true,
      },
      {
        icon: <S.ArchiveOut size={23} />,
        title: 'Solicitações',
        info: 'Acompanhe suas solicitações de retorno de estoque',
        to: '/solicitacoes-estoque',
        isAllowed: true,
      },
      {
        icon: <S.UserPinIcon />,
        title: 'Meus dados',
        info: 'Alter seus dados de acesso a plataforma.',
        to: '/meus-dados',
        isAllowed: true,
      },
      {
        icon: <S.SettingsIcon />,
        title: 'Configurações',
        info: 'Acesso exclusivo para administradores do sistema.',
        to: '/configuracoes',
        isAllowed: userBelongsToAnyOf('admin'),
      },
    ];
  }, [userBelongsToAnyOf]);

  const isMenuActive = useCallback(
    (item: MenuItem): boolean => {
      return item.to.split('/')[1] === location.pathname.split('/')[1];
    },
    [location]
  );

  useEffect(() => {
    sessionStorage.setItem('isRecall', JSON.stringify(isRecall));
  }, [isRecall]);

  return (
    <S.LeftPanel recall={isRecall}>
      <S.Recall recall={isRecall} onClick={() => setIsRecall(!isRecall)} />
      <S.Container>
        <S.Header>
          <S.Logo>
            <S.LogoImage />
          </S.Logo>
        </S.Header>
        <S.NavigationMenu>
          {menuItems
            .filter(({ isAllowed }) => {
              return isAllowed;
            })
            .map((item, index) => (
              <S.MenuItem to={item.to} key={index} active={isMenuActive(item)} recall={isRecall}>
                <S.MenuItemHeader>
                  {item.icon} {!isRecall && item.title}
                </S.MenuItemHeader>
                {item?.info && (
                  <S.MenuItemBody>{item.info}</S.MenuItemBody>
                )}
              </S.MenuItem>
            ))}
        </S.NavigationMenu>
        <S.Footer>
          {new Date().getFullYear()} © Todos os direitos reservados
        </S.Footer>
      </S.Container>
    </S.LeftPanel>
  );
};

export default LeftPanel;
