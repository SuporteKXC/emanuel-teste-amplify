import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import { Input } from 'components/Shared';
import { FORM_BACK_ACTION } from 'constants/Common';
import { useValidation } from 'hooks';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { CreateAdminActions as CreateActions } from 'store/ducks/admins';
import { CreateAdminValidator } from 'validators/Admins';
import * as S from './styles';

interface Props {
  onCreate?: () => void;
}

export const AdminCreationForm: React.FC<Props> = ({ onCreate }) => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();

  const { loading: creatingAdmin, validationErrors } = useSelector(
    (state: RootState) => state.createAdmin
  );

  const onSuccess = useCallback((): void => {
    formRef?.current?.reset();
    onCreate && onCreate();
  }, [onCreate]);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef?.current?.setErrors({});

        const { schema } = new CreateAdminValidator();

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
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    return () => {
      dispatch(CreateActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit}>
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
            {creatingAdmin ? <S.ActivityIndicator /> : 'Salvar'}
          </S.Button>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};
