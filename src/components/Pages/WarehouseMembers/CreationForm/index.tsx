import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import { Input, Select } from 'components/Shared';
import { FORM_BACK_ACTION } from 'constants/Common';
import { useValidation, useWarehouses } from 'hooks';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { CreateWarehouseMemberActions as CreateActions } from 'store/ducks/warehouseMembers';
import { ListWarehousesActions } from 'store/ducks/warehouses';
import { CreateMemberValidator } from 'validators/WarehouseMembers';
import * as S from './styles';

interface Props {
  onCreate?: () => void;
}

export const MemberCreationForm: React.FC<Props> = ({ onCreate }) => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { warehouseOptions, loadingWarehouses, fetchWarehouses } =
    useWarehouses();

  const { loading: creatingMember, validationErrors } = useSelector(
    (state: RootState) => state.createWarehouseMember
  );

  const onSuccess = useCallback((): void => {
    formRef?.current?.reset();
    onCreate && onCreate();
  }, [onCreate]);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef?.current?.setErrors({});

        const { schema } = new CreateMemberValidator();

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(CreateActions.request(validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, onSuccess]
  );

  useEffect(() => {
    fetchWarehouses();
  }, [fetchWarehouses]);

  useEffect(() => {
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    return () => {
      dispatch(CreateActions.reset());
      dispatch(ListWarehousesActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit}>
        <Select
          name="warehouseIds"
          label="Armazém"
          options={warehouseOptions}
          isLoading={loadingWarehouses}
          //@ts-ignore
          isMulti
        />

        <Scope path="user">
          <S.FormRow>
            <Input name="name" label="Nome completo" />
            <Input name="email" label="Email" />
            <Input name="password" label="Senha" type="password" />
          </S.FormRow>
        </Scope>
        <S.FormActions>
          <S.LinkButton mood="light" to="/configuracoes/armazens/usuarios">
            {FORM_BACK_ACTION}
          </S.LinkButton>
          <S.Button type="submit">
            {creatingMember ? <S.ActivityIndicator /> : 'Salvar'}
          </S.Button>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};
