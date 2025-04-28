import React, { useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { useValidation } from 'hooks';
import { notify } from 'services/notification';

import { AuthActions, AuthState } from 'store/ducks/auth';
import { Input } from 'components/shared/Form';
import { Signature } from 'components/shared';

import * as S from './styles';

const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY;

export const Login: React.FC = () => {
  const [human, setHuman] = useState<string | boolean>(false);
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();

  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.auth
  ) as AuthState;

  const onRecaptcha = useCallback((value) => {
    setHuman(value);
  }, []);

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Digite seu email')
            .email('Email inválido'),
          password: Yup.string().required('Digite sua senha para continuar'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        if (!human) {
          notify(
            'error',
            'Se você é um humano resolva o reCAPTCHA para prosseguir.'
          );
        } else {
          dispatch(AuthActions.loginRequest(data));
        }
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, human]
  );

  return (
    <S.Container>
      <S.Content>
        <S.Logo />
        <S.Wrapper>
          <S.Title>Transportation Management System</S.Title>
          <S.Subtitle>Bem vindo! Digite seus dados de acesso.</S.Subtitle>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <S.InputsWrapper>
              <Input
                name="email"
                label="Email:"
                className="first"
                placeholder="Email"
              />
              <Input
                name="password"
                type="password"
                className="last"
                placeholder="Senha"
              />
            </S.InputsWrapper>
            <S.ForgotWrapper>
              <S.Forgot to="/forgot">Esqueci minha senha</S.Forgot>
            </S.ForgotWrapper>
            <S.ButtonsWrapper>
              {RECAPTCHA_KEY && (
                <ReCAPTCHA sitekey={RECAPTCHA_KEY} onChange={onRecaptcha} />
              )}
              <S.SubmitButton type="submit">
                {loading ? <S.Loading /> : 'Entrar'}
              </S.SubmitButton>
            </S.ButtonsWrapper>
          </Form>
        </S.Wrapper>
        {/* <div id="armored_website">
          <param id="aw_preload" value="true" />
          <param id="aw_use_cdn" value="true" />
        </div> */}
        <Signature />
      </S.Content>
      <S.ImageBackground />
    </S.Container>
  );
};
