import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Input } from 'components/Shared';
import { useValidation } from 'hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { LoginActions as MainActions } from 'store/ducks/auth';
import * as Yup from 'yup';
import * as S from './styles';
import { notify } from 'services';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY as string;

export const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const [human, setHuman] = useState<string | null>(null);

  const onRecaptcha = useCallback((value: string | null) => {
    setHuman(value);
  }, []);

  const { loading, validationErrors } = useSelector(
    (state: RootState) => state.login
  );

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('E-mail inválido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        if (!human) {
          notify(
            'error',
            'Se você é um humano resolva o reCAPTCHA para prosseguir.'
          );
        } else {
          dispatch(
            MainActions.request({
              ...validData,
              humanKey: human,
            })
          );
        }
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, human]
  );

  useEffect(() => {
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      formRef.current?.setFieldValue('email', 'bruno@gerasinergia.com.br');
      formRef.current?.setFieldValue('password', 'foco');
    }
  });

  useEffect(() => {
    return () => {
      dispatch(MainActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit}>
        <Input name="email" label="E-mail" />
        <Input name="password" label="Senha" type="password" />
        <S.FormActions>
          <S.ForgotMyPwsLink to="/esqueci-minha-senha">
            Esqueceu sua senha?
          </S.ForgotMyPwsLink>
          <S.ActionsLogin>
            <ReCAPTCHA sitekey={RECAPTCHA_KEY} onChange={onRecaptcha} />
            <S.Button type="submit">
              {loading ? <S.ActivityIndicator /> : 'Entrar'}
            </S.Button>
          </S.ActionsLogin>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};
