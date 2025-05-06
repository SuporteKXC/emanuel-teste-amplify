import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, CheckboxInput, TextArea, Select } from "components/shared/Forms";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { useTranslation } from "react-i18next";
import {
  ShowJustificationTypeActions,
  UpdateJustificationTypeActions,
} from "store/ducks";
import * as Yup from "yup";
import * as S from "./styles";
import { useNavigate, useParams } from "react-router-dom";

const CategoryOptions = [
  { value: "comex", label: "Comex" },
  { value: "tracking", label: "Tracking" },
];

export const UpdateJustificationTypeForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const { t } = useTranslation();

  const [submitLoading, setSubmitLoading] = useState(false); // Estado para controle de carregamento do botão
  const { data: justificationTypeData, loading: justificationTypeLoading } =
    useSelector((state: RootState) => state.showJustificationType);

  const showJustificationType = useCallback(() => {
    dispatch(ShowJustificationTypeActions.request(id));
  }, [dispatch, id]);

  useEffect(() => {
    showJustificationType();
  }, [showJustificationType]);

  const onSubmit = useCallback(
    async ({ description, category }: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});
        setSubmitLoading(true); // Ativa o loading antes do envio

        const schema = Yup.object().shape({
          description: Yup.string().required(t("message.fieldMandatory")),
          category: Yup.string().required(t("message.fieldMandatory")),
        });

        const validData = await schema.validate(
          { description, category },
          { abortEarly: false }
        );

        dispatch(
          UpdateJustificationTypeActions.request(
            justificationTypeData?.id,
            validData,
            onSuccess
          )
        );
      } catch (error) {
        handleFormErrors(error, formRef);
        setSubmitLoading(false); // Desativa o loading em caso de erro
      }
    },
    [dispatch, handleFormErrors, justificationTypeData, t]
  );

  const onSuccess = () => {
    setSubmitLoading(false); // Desativa o loading após o sucesso
    navigate(`/configuracoes/justification-type`);
  };

  useEffect(() => {
    return () => {
      dispatch(UpdateJustificationTypeActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit}>
        <S.GridContainer>
          <Input
            name="description"
            label={t("comex.settings.justificationType.description")}
            defaultValue={justificationTypeData?.description}
          />
          <Select
            name="category"
            label={t("comex.settings.justificationType.category")}
            placeholder="Selecione uma categoria"
            defaultValue={CategoryOptions.find(
              (option) => option.value === justificationTypeData?.category
            )}
            options={CategoryOptions}
          />
        </S.GridContainer>
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
      </Form>
    </S.Container>
  );
};

export default UpdateJustificationTypeForm;
