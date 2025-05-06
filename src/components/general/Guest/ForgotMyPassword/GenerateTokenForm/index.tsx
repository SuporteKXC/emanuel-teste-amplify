import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { Input } from "components/shared/Forms";
import { useValidation } from "hooks";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { useNavigate } from "react-router-dom";
import { GeneratePasswordResetTokenActions as MainActions } from "store/ducks/general";
import * as Yup from "yup";
import * as S from "./styles";

export const GenerateTokenForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();

  const { loading, validationErrors } = useSelector(
    (state: RootState) => state.generatePasswordResetToken
  );

  const onSuccess = useCallback(
    (email: string): void => {
      navigate(`/redefinir-senha/${email}`);
    },
    [navigate]
  );

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email("E-mail inválido")
            .required("E-mail obrigatório"),
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
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      formRef.current?.setFieldValue("email", "bruno@gerasinergia.com.br");
    }
  });

  useEffect(() => {
    return () => {
      dispatch(MainActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit} placeholder="">
        <Input name="email" label="E-mail" />
        <S.FormActions>
          <S.LinkButton to="/login" mood="light">
            Voltar
          </S.LinkButton>
          <S.Button type="submit">
            {loading ? <S.ActivityIndicator /> : "Enviar"}
          </S.Button>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};
