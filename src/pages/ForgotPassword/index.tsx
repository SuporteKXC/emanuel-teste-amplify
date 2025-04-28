import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useValidation } from "hooks";
import { ForgotState, ForgotActions } from "store/ducks/auth/forgot";

import * as S from "./styles";
import { Input } from "components/shared/Form";

export const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.forgot
  ) as ForgotState;

  const onSuccess = useCallback(() => {
    history.push("/forgot-success");
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Digite seu email")
            .email("Email inválido"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(ForgotActions.request(data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, onSuccess]
  );

  return (
    <S.Container>
      <S.Header>
        <S.Logo />
      </S.Header>
      <S.Content>
        <S.Title>Digite seu e-mail de acesso.</S.Title>
        <S.Text>
          Enviaremos uma nova senha provisória para o e-mail informado.
        </S.Text>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.BoxContainer>
            <S.FormRow>
              <Input name="email" label="Email:" placeholder="Email" />
            </S.FormRow>
          </S.BoxContainer>
          <S.FormFooter>
            <S.FormRow>
              <S.Button type="submit">
                {loading ? <S.Loading /> : "Resetar senha"}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.Content>
    </S.Container>
  );
};
