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
import { NewAlertTypeActions as MainActions, RolesActions } from "store/ducks";
import * as Yup from "yup";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Groups {
  id: string;
  label: string;
  value: string;
}

const NewAlertTypeForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { i18n, t } = useTranslation();

  const { loading } = useSelector((state: RootState) => state.newAlertType);

  const { data: rolesData, loading: rolesLoading } = useSelector(
    (state: RootState) => state.roles
  );

  const fetchRoles = useCallback(() => {
    dispatch(RolesActions.request());
  }, [dispatch]);

  useEffect(() => {
    fetchRoles();
  }, [dispatch]);

  const rolesValid: Groups[] | undefined = rolesData?.map((item) => {
    return {
      id: `${item.id}`,
      value: `${item.id}`,
      label: item.name,
    };
  });

  const onSubmit = useCallback(
    async ({ description, roles }: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string().required(t("message.descAlertMandatory")),
          roles: Yup.array().of(
            Yup.object().shape({
              role_id: Yup.string(),
            })
          ),
        });

        const validData = await schema.validate(
          {
            description,
            roles: roles.map((id: string) => ({ role_id: id })),
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
    navigate(`/config/alert-types/update/${id}`);
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
            label={t("comex.settings.alertType.descTypesAlert")}
          />
          <S.Ghost />
          <S.Ghost />
          <S.CheckContainer>
            <CheckboxInput
              isLoading={rolesLoading}
              options={rolesValid}
              name="roles"
              label={t("general.config.users.profile")}
            />
          </S.CheckContainer>
        </S.GridContainer>
      </Form>
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
    </S.Container>
  );
};

export default NewAlertTypeForm;
