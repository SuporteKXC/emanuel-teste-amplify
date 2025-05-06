import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { HiddenInput, Input, MaskedInput } from 'components/Shared';
import { useValidation } from 'hooks';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from 'store';
import { ResetPasswordActions as MainActions } from 'store/ducks/auth';
import * as Yup from 'yup';
import * as S from './styles';

export const PasswordResetForm: React.FC = () => {
  const { email, token } = useParams() as { email: string; token?: string };
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();

  const { loading, validationErrors } = useSelector(
    (state: RootState) => state.generatePasswordResetToken
  );

  const onSuccess = useCallback((): void => {
    navigate(`/login`);
  }, [navigate]);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('E-mail inválido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Informe sua nova senha'),
          passwordResetToken: Yup.string().required(
            'Informe o código de redefinição de senha'
          ),
        });

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(MainActions.request(validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, onSuccess]
  );

  useEffect(() => {
    formRef.current?.setFieldValue('email', email);
    token && formRef.current?.setFieldValue('passwordResetToken', token);
  }, [email, token]);

  useEffect(() => {
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    return () => {
      dispatch(MainActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit}>
        <HiddenInput name="email" readOnly />
        <MaskedInput
          mask={'999999'}
          name="passwordResetToken"
          label="Código de redefinição de senha"
        />
        <Input name="password" label="Nova senha" type="password" />
        <S.FormActions>
          <S.LinkButton to="/login" mood="light">
            Voltar
          </S.LinkButton>
          <S.Button type="submit">
            {loading ? <S.ActivityIndicator /> : 'Enviar'}
          </S.Button>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};
