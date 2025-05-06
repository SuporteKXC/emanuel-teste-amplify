import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, CheckboxInput } from "components/shared/Forms";
import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { NewResponsibleActions } from "store/ducks";
import * as Yup from "yup";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RoleData, CompanyData } from "contracts";
import { api, notify } from "services";

interface Groups {
  id: string;
  label: string;
  value: string;
}

export const NewResponsibleForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { i18n, t } = useTranslation();
  const { handleFormErrors, handleApiErrors } = useValidation();

  const { loading } = useSelector((state: RootState) => state.newuser);

  const onSubmit = useCallback(
    async ({ name }: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

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

        dispatch(NewResponsibleActions.request(validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const onSuccess = () => {
    formRef.current?.setFieldValue("name", "");
  };

  useEffect(() => {
    return () => {
      dispatch(NewResponsibleActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit} placeholder="">
        <S.GridContainer>
          <Input name="name" label={t("comex.settings.responsible.name")} />
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
