import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, CheckboxInput, Select } from "components/shared/Forms";
import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { NewJustificationTypesActions } from "store/ducks";
import * as Yup from "yup";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api, notify } from "services";

const CategoryOptions = [
  {
    value: "comex",
    label: "Comex - Importação",
  },
  {
    value: "comex-export",
    label: "Comex - Exportação"
  },
  {
    value: "tracking",
    label: "Tracking",
  }
];
export const JustificationTypeFrom: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { i18n, t } = useTranslation();
  const { handleFormErrors, handleApiErrors } = useValidation();

  const { loading } = useSelector(
    (state: RootState) => state.newJustificationType
  );

  const onSubmit = useCallback(
    async ({ description,category }: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string().required(t("message.fieldMandatory")),
          category: Yup.string().required(t("message.fieldMandatory")),
        });

        const validData = await schema.validate(
          {
            description,
            category
          },
          {
            abortEarly: false,
          }
        );

        dispatch(NewJustificationTypesActions.request(validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const onSuccess = () => {
    formRef.current?.setFieldValue("description", "");
  };

  useEffect(() => {
    return () => {
      dispatch(NewJustificationTypesActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit} placeholder="">
        <S.GridContainer>
          <Input
            name="description"
            label={t("comex.settings.justificationType.description")}
          />
          <Select
            name="category"
            label={t("comex.settings.justificationType.category")}
            placeholder="Selecione uma categoria"
            defaultValue={CategoryOptions[0]}
            options={CategoryOptions}
            />
          <S.FormActions>
            <S.Button mood="primary" type="submit">
              {loading ? (
                <S.ActivityIndicator />
              ) : (
                t("comex.filterandButton.register")
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
