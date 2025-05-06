import { usePermission } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { notify } from 'services';
import { ActivityIndicator, Center } from 'styles/components';

interface IProps {
  Element: React.FC;
  action: string | string[];
  redirectPath?: string;
  rest?: Record<string, any>;
}

export const PrivateRoute = React.memo(({ Element, action, redirectPath = '/', ...rest }: IProps) => {
  const { hasPermissionTo: hasPermissionToAccess, canCheckPermission } = usePermission();
  const { t } = useTranslation();
  const [canRedirect, setCanRedirect] = useState(false);

  useEffect(() => { canCheckPermission && setCanRedirect(true) }, [canCheckPermission]);
  
  if (!canRedirect) {
    return <Center>{t("general.messages.privateRouteLoading")}&nbsp;<ActivityIndicator /></Center>;
  }

  if (typeof action === 'string' ? hasPermissionToAccess(action) : hasPermissionToAccess(...action)) {
    return <Element />;
  }
  
  notify("error", t("general.messages.privateRouteWarn"));
  
  return <Navigate to={redirectPath} replace />;
});