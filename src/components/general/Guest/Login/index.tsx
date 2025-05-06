import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { useTranslation } from "react-i18next";
import { Input } from "components";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { LoginActions as MainActions } from "store/ducks/general";
import * as Yup from "yup";
import * as S from "./styles";
import ReCAPTCHA from "react-google-recaptcha";
import { notify } from "services";
import { useAuth } from "hooks";
import { useNavigate } from "react-router";

const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_KEY;

export const LoginForm: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation();
  // const [human, setHuman] = useState<string | boolean | null>(null);
  const [human, setHuman] = useState<string | boolean | null>(true);
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();

  const { loading, validationErrors } = useSelector(
    (state: RootState) => state.login
  );

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email("E-mail inválido")
            .required("E-mail obrigatório"),
          password: Yup.string().required("Senha obrigatória"),
        });

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        if (!human) {
          notify(
            "error",
            "Se você é um humano resolva o reCAPTCHA para prosseguir."
          );
        } else {
          dispatch(MainActions.request(validData));
        }
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const onRecaptcha = useCallback((value: string | null) => {
    setHuman(value);
  }, []);

  useEffect(() => {
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    if (import.meta.env.VITE_NODE_ENV === "development") {
      formRef.current?.setFieldValue("email", "teste@teste.com");
      formRef.current?.setFieldValue("password", "123");
      setHuman(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(MainActions.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (profile?.first_access) {
      navigate(`/redefinir-senha/${profile.email}`);
    }
  }, [profile]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit} placeholder="">
        <S.InputsWrapper>
          <Input name="email" label="E-mail" />
          <Input name="password" label="Password" type="password" />
        </S.InputsWrapper>

        <S.ForgotWrapper>
          <S.ForgotMyPwsLink to="/esqueci-minha-senha">
            Esqueceu sua senha?
          </S.ForgotMyPwsLink>
        </S.ForgotWrapper>

        <S.ButtonsWrapper>
          {RECAPTCHA_KEY && (
            <ReCAPTCHA sitekey={RECAPTCHA_KEY} onChange={onRecaptcha} />
          )}

          <S.FormActions>
            <S.Button mood="light" type="submit">
              {loading ? <S.ActivityIndicator /> : "Login"}
            </S.Button>
          </S.FormActions>
        </S.ButtonsWrapper>
        <S.FooterInfo>
          <S.Webcol width={56} height={16} /> ® is a platform at GS Tecnologia e Inovação®
        </S.FooterInfo>
      </Form>
    </S.Container>
  );
};
