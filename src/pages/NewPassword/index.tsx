import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useValidation } from "hooks";
import { AuthState, AuthActions } from "store/ducks/auth";
import { UpdateUserPasswordActions, UpdateUserPasswordState } from "store/ducks/settings/users";

import * as S from "./styles";
import { Input } from "components/shared/Form";

export const NewPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { data: userData } = useSelector<RootStateOrAny>(
    (state) => state.auth
  ) as AuthState;

  const { loading: loadingUpdateUser } = useSelector<RootStateOrAny>(
    (state) => state.updateUser
  ) as UpdateUserPasswordState;

  const onSuccess = useCallback(() => {
    dispatch(AuthActions.reset());
    history.push("/password-success");
  }, [dispatch, history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string()
            .nullable()
            .required("Obrigatório")
            .test("strongpassword", "Senha fraca", function (value) {
              if (!value) return false;
              const patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
              return patt.test(value);
            }),
          confirm: Yup.string()
            .required("Obrigatório")
            .test("confirme-password", "Senhas não conferem", function (value) {
              return this.parent.password === value;
            }),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        if (userData?.accessToken) {
          const { accessToken } = userData;
          const dataArray = accessToken.split(".");
          const payload = dataArray[1];
          const decoded = JSON.parse(Buffer.from(payload, "base64").toString());
          delete data.confirm;
          data.new_password = false;
          dispatch(UpdateUserPasswordActions.request(decoded.uid, data, onSuccess));
        }
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, onSuccess, userData]
  );

  return (
    <S.Container>
      <S.Header>
        <S.Logo />
      </S.Header>
      {userData && (
        <S.Content>
          <S.Title>
            Olá {userData.name}
            <br />
            crie uma nova senha de acesso.
          </S.Title>
          <S.Text>
            Melhore a força da senha utilizando no mínimo 8 digitos, números,
            caracteres maiúsculos e minúsculos e caracteres especiais, como
            !,@,#,$,%,^,&,*,?,_,~
          </S.Text>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <S.BoxContainer>
              <S.FormRow>
                <Input name="password" label="Senha" type="password" />
              </S.FormRow>
              <S.FormRow>
                <Input name="confirm" label="Confirmar senha" type="password" />
              </S.FormRow>
            </S.BoxContainer>
            <S.FormFooter>
              <S.FormRow>
                <S.Button type="submit">
                  {loadingUpdateUser ? <S.Loading /> : "Cadastrar"}
                </S.Button>
              </S.FormRow>
            </S.FormFooter>
          </Form>
        </S.Content>
      )}
    </S.Container>
  );
};
