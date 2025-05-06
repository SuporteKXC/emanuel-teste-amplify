import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, CheckboxInput } from "components/shared/Forms";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import {
  NewCreditHistoryActions as MainActions,
  RolesActions,
} from "store/ducks";
import * as Yup from "yup";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Groups {
  id: string;
  label: string;
  value: string;
}

const NewCreditHistoryForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { i18n, t } = useTranslation();

  const { loading } = useSelector((state: RootState) => state.newCreditHistory);

  const fetchRoles = useCallback(() => {
    dispatch(RolesActions.request());
  }, [dispatch]);

  useEffect(() => {
    fetchRoles();
  }, [dispatch]);

  const onSubmit = useCallback(
    async ({ description, roles }: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string().required(t("message.descAlertMandatory")),
        });

        const validData = await schema.validate(
          {
            description,
          },
          {
            abortEarly: false,
          }
        );

        dispatch(MainActions.request(validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const onSuccess = (id: string) => {
    navigate(`/configuracoes/credit-history/update/${id}`);
  };

  useEffect(() => {
    return () => {
      dispatch(MainActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit} placeholder="">
        <S.GridContainer>
          <Input
            name="description"
            label={t("comex.settings.creditHistory.inputLabelDescription")}
          />
          <S.Ghost />
          <S.Ghost />
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

export default NewCreditHistoryForm;
