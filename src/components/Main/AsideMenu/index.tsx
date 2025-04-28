import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { User, LanguageSelector } from 'components/shared';
import { usePermissions, useTranslation } from 'hooks';
import { translations } from './translations';
import * as S from './styles';
import { Package } from 'lucide-react';

interface IModule {
  icon: any;
  name: string;
  description: string;
  active: boolean;
  innerUrl?: string;
  url?: string;
}

const baseUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/base/'
    : 'https://environmental.webcol.systems/';

export const AsideMenu: React.FC = () => {
  const history = useHistory();
  const { hasAnyPermission } = usePermissions();
  const { getTranslation } = useTranslation(translations);
  const checkPermission = (typeUsers: 'All' | string[]) => {
    if (typeUsers === 'All') {
      return true;
    }

    if (hasAnyPermission(typeUsers)) {
      return true;
    } else {
      return false;
    }
  };
  const checkBlockedPermission = (typeUsers: string[]) => {
    return !hasAnyPermission(typeUsers);
  };

  const modules: IModule[] = [
    {
      icon: <S.IconControlTower />,
      name: getTranslation('controlTower'),
      description: getTranslation('descControlTower'),
      active:
        checkPermission('All') &&
        checkBlockedPermission(['Cliente', 'Transportadora', 'Vendedor']),
      innerUrl: '/control-tower',
    },
    {
      icon: <S.IconSchedule />,
      name: getTranslation('agendamento'),
      description: getTranslation('descAgendamento'),
      active: checkPermission('All') && checkBlockedPermission(['Despachante', 'Vendedor']),
      url: baseUrl + 'agendamento/',
    },
    {
      icon: <S.IconTracking />,
      name: getTranslation('Tracking'),
      description: getTranslation('descTracking'),
      active: checkPermission('All'),
      url: baseUrl + 'tracking/',
    },
    {
      icon: <S.IconCheckFreight />,
      name: getTranslation('CheckFretes'),
      description: getTranslation('descCheckFretes'),
      active:
        checkPermission('All') &&
        checkBlockedPermission(['Cliente', 'Logística', 'Vendedor']),
      url: baseUrl + 'checkfrete/',
    },
    {
      icon: <S.IconWorld />,
      name: 'Comex',
      description: getTranslation('descComex'),
      active: checkPermission('All') && checkBlockedPermission(['Vendedor']),
      url: 'https://comex.environmental.webcol.systems/',
    },
    {
      icon: <Package/>,
      name: "WMS",
      description: getTranslation('wms'),
      active: !!checkPermission(['Administrador']),
      innerUrl: '/wms'
    },
    {
      icon: <S.IconSettings />,
      name: getTranslation('configurador'),
      description: getTranslation('descConfigurador'),
      active: checkPermission(['Administrador', 'Customer Service']),
      innerUrl: '/settings',
    },
    
  ];

  const handleNavigation = useCallback(
    (module: IModule) => {
      if (module.active) {
        if (module.innerUrl) return history.push(module.innerUrl);
        if (module.url) return window.open(module.url);
      }
    },
    [history]
  );

  return (
    <S.Container>
      <S.Content>
        <S.Logo onClick={() => history.push("/")}/>
        <LanguageSelector />
        <User />
        {modules.map((module) => (
          <S.ButtonModule
            active={module.active}
            onClick={() => handleNavigation(module)}
            key={module.innerUrl || module.url}
          >
            <S.ModuleTitle>
              {module.icon}
              {module.name}
            </S.ModuleTitle>
            <S.ModuleDescription>{module.description}</S.ModuleDescription>
          </S.ButtonModule>
        ))}
      </S.Content>
    </S.Container>
  );
};
