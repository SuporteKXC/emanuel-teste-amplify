import React, { useRef, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { SelectOption } from 'contracts/Common';
import Select from './Select';
import * as S from './styles';

const options: SelectOption[] = [
  {
    value: '/configuracoes/clientes',
    label: 'Clientes',
  },
  {
    value: '/configuracoes/clientes/usuarios',
    label: 'Usuários de Clientes',
  },
  {
    value: '/configuracoes/armazens',
    label: 'Armazéns',
  },
  {
    value: '/configuracoes/armazens/usuarios',
    label: 'Usuários de Armazéns',
  },
  {
    value: '/configuracoes/administradores',
    label: 'Administradores',
  },
];

export const SettingsMenu: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const onDestinationChange = useCallback(
    (option: SelectOption | null): void => {
      if (!option?.value) return;
      if (option.value === location.pathname) return;
      navigate(option.value as string);
    },
    [location.pathname, navigate]
  );

  const onNavigate = useCallback((): void => {
    const currentOption = options.find((o) => o.value === location.pathname);
    if (currentOption) {
      formRef.current?.setFieldValue('destination', currentOption);
    }
  }, [location.pathname]);

  useEffect(() => {
    onNavigate();
  }, [onNavigate]);

  return (
    <S.MenuContainer>
      <S.Label>
        <S.SettingsIcon /> Configurações:
      </S.Label>
      <Form ref={formRef} onSubmit={() => {}}>
        <Select
          name="destination"
          options={options}
          onChange={onDestinationChange}
        />
      </Form>
    </S.MenuContainer>
  );
};
