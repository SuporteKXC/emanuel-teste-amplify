import React, { useCallback, useRef } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { AuthState } from 'store/ducks/auth';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { useTranslation  } from 'hooks';

import { translations } from './translations';
import * as S from './styles';

import { SelectClean } from 'components/shared/Form';

import { SelectedFilterActions } from 'store/ducks/filter';
interface IMenuProps {
  page: String;
}

export const MenuSelector: React.FC<IMenuProps> = ({ page }) => {
  const formMenu = useRef<FormHandles>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);

  const { data: userData } = useSelector<RootStateOrAny>(
    (state) => state?.auth
  ) as AuthState;

  const handleOption = useCallback(
    (route) => {
      dispatch(SelectedFilterActions.reset());
      history.push(`/settings/${route.value}`);
    },
    [history, dispatch]
  );

  const userRole = userData?.roles[0];

  const options = [
    {
      label: getTranslation('alertas'),
      value: 'alerts',
    },
    {
      label: getTranslation('historicoDeAlertas'),
      value: 'alert-email-logs',
    },
    {
      label: getTranslation('centro'),
      value: 'companies',
    },
    {
      label: getTranslation('segmentacao'),
      value: 'client-types',
    },
    {
      label: getTranslation('clientes'),
      value: 'clients',
    },
    {
      label: getTranslation('produtos'),
      value: 'products',
    },
    {
      label: getTranslation('tiposDeProduto'),
      value: 'product-types',
    },
    {
      label: getTranslation('unidadeDeNegocio'),
      value: 'business-units',
    },
    {
      label: getTranslation('linhaDeNegocio'),
      value: 'business',
    },
    {
      label: getTranslation('transportadora'),
      value: 'carriers',
    },
    {
      label: getTranslation('tiposDepallet'),
      value: 'pallet-types',
    },
    {
      label: getTranslation('usuarios'),
      value: 'users',
    },
    {
      label: getTranslation('veiculos'),
      value: 'vehicles',
    },
    {
      label: getTranslation('tiposDeVeiculos'),
      value: 'vehicle-types',
    },
  ];

  var settingOption: any = [];
  var restriction: any;

  // Selecionar as paginas conforme o value de option
  switch (userRole) {
    case 'Administrador':
      restriction = 'adm';
      break;
    case 'Customer Service':
      restriction = ['clients'];
      break;
  }

  options.map((option) => {
    // retorna todas as paginas para Administrador
    if (restriction === 'adm') {
      settingOption.push(option);
    }

    if (restriction.includes(option.value)) {
      settingOption.push(option);
    }

    return 0;
  });

  const optionPage = settingOption.find((option: any) => option.value === page);

  const dataSelectedCompany = optionPage
    ? {
        label: optionPage.label,
        value: optionPage.value,
      }
    : {
        label: settingOption[0].label,
        value: settingOption[0].value,
      };

  return (
    <S.Container>
      <Form ref={formMenu} onSubmit={handleOption}>
        <SelectClean
          name='menuSelect'
          options={settingOption}
          onChange={(page) => handleOption(page)}
          defaultValue={dataSelectedCompany}
          placeholder='Menu'
        />
      </Form>
    </S.Container>
  );
};
