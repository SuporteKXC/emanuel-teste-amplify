import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, CheckboxInput, TextArea } from "components/shared/Forms";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { useTranslation } from "react-i18next";
import {
  UpdateCreditHistoryActions as MainActions,
  FetchCreditHistoryActions,
  RolesActions,
} from "store/ducks";
import * as Yup from "yup";
import * as S from "./styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FieldLabel } from "styles/components";

interface Groups {
  id: string;
  label?: string;
  value: string;
}

export const UpdateCreditHistoryForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { i18n, t } = useTranslation();

  const { data: creditHistoryData, loading: creditHistoryLoading } =
    useSelector((state: RootState) => state.creditHistory);

  const { loading } = useSelector(
    (state: RootState) => state.updateCreditHistory
  );

  const fetchCreditHistory = useCallback(() => {
    dispatch(FetchCreditHistoryActions.request(id));
  }, [dispatch]);

  useEffect(() => {
    fetchCreditHistory();
  }, []);

  const onSubmit = useCallback(
    async ({ description, details, roles }: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string().required(
            "Descrição do tipo de alerta obrigatória"
          ),
          details: Yup.string().required("Descrição obrigatória"),
          roles: Yup.array().of(
            Yup.object().shape({
              role_id: Yup.string(),
            })
          ),
        });

        const validData = await schema.validate(
          {
            description,
            details,
            roles: roles.map((id: string) => ({ role_id: id })),
          },
          {
            abortEarly: false,
          }
        );

        console.log(validData);
        dispatch(MainActions.request(creditHistoryData?.id, validData));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  useEffect(() => {
    return () => {
      dispatch(MainActions.reset());
    };
  }, [dispatch]);

  return (
    <>
      <S.Container>
        <Form ref={formRef} onSubmit={onSubmit} placeholder="">
          {creditHistoryLoading ? (
            <S.ActivityIndicator />
          ) : (
            <S.GridContainer>
              <Input
                name="description"
                label={t("comex.settings.creditHistory.descTypesAlert")}
                // defaultValue={creditHistoryData?.description}
              />
              <TextArea
                label={t("comex.settings.creditHistory.descDetailsAlert")}
                name="details"
                // defaultValue={creditHistoryData?.details}
              />
              <S.Ghost />
              <S.Ghost />
            </S.GridContainer>
          )}
          <S.FormActions>
            <S.Button mood="primary" type="submit">
              {loading ? (
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
    </>
  );
};

export default UpdateCreditHistoryForm;
