import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import { HiddenInput, Input } from 'components/Shared';
import { FORM_BACK_ACTION } from 'constants/Common';
import { useValidation } from 'hooks';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import {
  FetchAdminActions as FetchActions,
  UpdateAdminActions as UpdateActions,
} from 'store/ducks/admins';
import { UpdateAdminValidator } from 'validators/Admins';
import * as S from './styles';

interface Props {
  adminId: string | number;
  onUpdate?: () => void;
}

export const AdminUpdateForm: React.FC<Props> = ({ adminId, onUpdate }) => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();

  const { data: admin } = useSelector((state: RootState) => state.fetchAdmin);

  const { loading: updatingAdmin, validationErrors } = useSelector(
    (state: RootState) => state.updateAdmin
  );

  const fetchAdmin = useCallback((): void => {
    dispatch(FetchActions.request(adminId));
  }, [dispatch, adminId]);

  const onAdminLoad = useCallback((): void => {
    if (!admin) return;

    const { user, userId } = admin;

    formRef.current?.setFieldValue('userId', userId);
    formRef.current?.setFieldValue('user.name', user.name);
    formRef.current?.setFieldValue('user.email', user.email);
  }, [admin]);

  const onSuccess = useCallback((): void => {
    formRef?.current?.reset();
    onUpdate && onUpdate();
  }, [onUpdate]);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef?.current?.setErrors({});

        const { schema } = new UpdateAdminValidator();

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(UpdateActions.request(adminId, validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [adminId, dispatch, handleFormErrors, onSuccess]
  );

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  useEffect(() => {
    onAdminLoad();
  }, [onAdminLoad]);

  useEffect(() => {
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    return () => {
      dispatch(FetchActions.reset());
      dispatch(UpdateActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit}>
        <HiddenInput name="userId" />
        <Scope path="user">
          <S.FormRow>
            <Input name="name" label="Nome completo" />
            <Input name="email" label="Email" />
            <Input name="password" label="Senha" type="password" />
          </S.FormRow>
        </Scope>
        <S.FormActions>
          <S.LinkButton mood="light" to="/configuracoes/administradores">
            {FORM_BACK_ACTION}
          </S.LinkButton>
          <S.Button type="submit">
            {updatingAdmin ? <S.ActivityIndicator /> : 'Salvar'}
          </S.Button>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};
