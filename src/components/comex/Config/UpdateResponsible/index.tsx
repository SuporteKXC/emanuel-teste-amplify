import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { FetchResponsibleActions, UpdateResponsibleActions } from "store/ducks";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { Input } from "components/shared/Forms";

export const UpdateResponsibleForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();

  const { data: responsibleData, loading: responsibleLoading } = useSelector(
    (state: RootState) => state.responsible
  );

  // Estado local para controlar o loading do envio do formulário
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchResponsible = useCallback(() => {
    dispatch(FetchResponsibleActions.request(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchResponsible();
  }, [fetchResponsible]);

  const onSubmit = useCallback<SubmitHandler>(
    async ({ name }: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});
        setSubmitLoading(true); // Inicia o loading local

        const schema = Yup.object().shape({
          name: Yup.string().required(t("message.nameMandatory")),
        });

        const validData = await schema.validate(
          {
            name,
          },
          {
            abortEarly: false,
          }
        );

        dispatch(
          UpdateResponsibleActions.request(
            responsibleData?.id,
            validData,
            () => {
              setSubmitLoading(false); // Finaliza o loading ao concluir o envio
              navigate(`/configuracoes/responsible`);
            }
          )
        );
      } catch (error) {
        handleFormErrors(error, formRef);
        setSubmitLoading(false); // Finaliza o loading em caso de erro
      }
    },
    [dispatch, handleFormErrors, responsibleData, t, navigate]
  );

  useEffect(() => {
    return () => {
      dispatch(UpdateResponsibleActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit}>
        <S.GridContainer>
          <Input
            defaultValue={responsibleData?.name}
            name="name"
            label={t("comex.settings.responsible.name")}
          />
          <S.FormActions>
            <S.Button mood="primary" type="submit">
              {submitLoading ? (
                <S.ActivityIndicator />
              ) : (
                t("comex.filterandButton.update")
              )}
            </S.Button>
            <S.Button onClick={() => navigate(-1)} type="reset">
              {t("comex.filterandButton.cancel")}
            </S.Button>
          </S.FormActions>
        </S.GridContainer>
      </Form>
    </S.Container>
  );
};

export default UpdateResponsibleForm;
