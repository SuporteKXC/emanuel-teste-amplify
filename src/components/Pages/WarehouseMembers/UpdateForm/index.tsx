import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import { HiddenInput, Input, Select } from 'components/Shared';
import { FORM_BACK_ACTION } from 'constants/Common';
import { useValidation, useWarehouses } from 'hooks';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import {
  FetchWarehouseMemberActions as FetchActions,
  UpdateWarehouseMemberActions as UpdateActions,
} from 'store/ducks/warehouseMembers';
import { ListWarehousesActions } from 'store/ducks/warehouses';
import { UpdateMemberValidator } from 'validators/WarehouseMembers';
import * as S from './styles';

interface Props {
  memberId: string | number;
  onUpdate?: () => void;
}

export const MemberUpdateForm: React.FC<Props> = ({ memberId, onUpdate }) => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { warehouseOptions, loadingWarehouses, fetchWarehouses } =
    useWarehouses();

  const { data: member } = useSelector(
    (state: RootState) => state.fetchWarehouseMember
  );

  const { loading: updatingMember, validationErrors } = useSelector(
    (state: RootState) => state.updateWarehouseMember
  );

  const fetchmember = useCallback((): void => {
    dispatch(FetchActions.request(memberId));
  }, [dispatch, memberId]);

  const onMemberLoad = useCallback((): void => {
    if (!member) return;

    const { warehouseMembers, id, name, email } = member;

    const warehouseIds = warehouseMembers.map(({warehouseId})=> warehouseId)

    const warehouseOption = warehouseOptions.filter(
      (o) => warehouseIds.includes(Number(o.value))
    );

    if (warehouseOption?.length) {
      formRef.current?.setFieldValue('warehouseIds', warehouseOption);
    }

    formRef.current?.setFieldValue('userId', id);
    formRef.current?.setFieldValue('user.name', name);
    formRef.current?.setFieldValue('user.email', email);
  }, [member, warehouseOptions]);

  const onSuccess = useCallback((): void => {
    formRef?.current?.reset();
    onUpdate && onUpdate();
  }, [onUpdate]);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef?.current?.setErrors({});

        const { schema } = new UpdateMemberValidator();

        const validData = await schema.validate(data, {
          abortEarly: false,
        });
        dispatch(UpdateActions.request(memberId, validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, memberId, onSuccess]
  );

  useEffect(() => {
    fetchWarehouses();
  }, [fetchWarehouses]);

  useEffect(() => {
    fetchmember();
  }, [fetchmember]);

  useEffect(() => {
    onMemberLoad();
  }, [onMemberLoad]);

  useEffect(() => {
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    return () => {
      dispatch(FetchActions.reset());
      dispatch(UpdateActions.reset());
      dispatch(ListWarehousesActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit}>
        <HiddenInput name="userId" />
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
            {updatingMember ? <S.ActivityIndicator /> : 'Salvar'}
          </S.Button>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};
