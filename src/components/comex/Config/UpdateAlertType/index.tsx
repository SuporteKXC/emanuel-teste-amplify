import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, CheckboxInput, TextArea } from "components/shared/Forms";
import { ToggleInput } from "components/shared";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { useTranslation } from "react-i18next";
import {
  UpdateAlertTypeActions as MainActions,
  FetchAlertTypeActions,
  AlertTypesActions,
  RolesActions,
} from "store/ducks";
import * as Yup from "yup";
import * as S from "./styles";
import { useNavigate, useParams } from "react-router-dom";

interface Groups {
  id: string;
  label?: string;
  value: string;
}

export const UpdateAlertTypeForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const { t } = useTranslation();
  const [toggleGrouped, setToggleGrouped] = useState(false);

  const { data: alertTypeData, loading: alertTypeLoading } = useSelector(
    (state: RootState) => state.alertType
  );

  const { data: listAlertTypeData, loading: loadingListAlertTypes } =
    useSelector((state: RootState) => state.alertTypes);

  const { data: rolesData, loading: rolesLoading } = useSelector(
    (state: RootState) => state.roles
  );

  const { loading } = useSelector((state: RootState) => state.updateAlertType);

  const fetchAlertType = useCallback(() => {
    dispatch(FetchAlertTypeActions.request(id));
  }, [dispatch]);

  const fetchAlertTypes = useCallback(() => {
    dispatch(AlertTypesActions.request(""));
  }, [dispatch]);

  const fetchRoles = useCallback(() => {
    dispatch(RolesActions.request());
  }, [dispatch]);

  useEffect(() => {
    fetchAlertType();
    fetchAlertTypes();
    fetchRoles();
  }, []);

  // TEMP  há de vir no alertTypeData
  const alertTypesRoles: Groups[] | undefined =
    alertTypeData &&
    alertTypeData.role_alert_type[0] &&
    alertTypeData.role_alert_type.map((item) => ({
      id: `${item.role?.id}`,
      label: item.role?.name,
      value: `${item.role?.id}`,
    }));

  const rolesValid: Groups[] | undefined = rolesData?.map((item) => {
    return {
      id: `${item.id}`,
      value: `${item.id}`,
      label: item.name,
    };
  });

  const AlertValid: Groups[] | undefined = listAlertTypeData
    ?.filter((item) => !item.alerts_group && item.id != Number(id))
    .map((item) => {
      return {
        id: `${item.id}`,
        value: `${item.id}`,
        label: item.description,
      };
    });

  const alertTypesGrouped: Groups[] | undefined =
    alertTypeData &&
    alertTypeData.alerts_group[0] &&
    alertTypeData.alerts_group.map((item) => ({
      id: `${item?.alert_id_grouped}`,
      label: item.alert_grouped?.description,
      value: `${item?.alert_id_grouped}`,
    }));

  const onSubmit = useCallback(
    async ({
      description,
      details,
      roles,
      alertGrouped,
    }: any): Promise<void> => {
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
          alertGrouped: Yup.array().of(
            Yup.object().shape({
              alert_id_grouped: Yup.string(),
            })
          ),
        });

        const validData = await schema.validate(
          {
            description,
            details,
            roles: roles.map((id: string) => ({ role_id: id })),
            alertGrouped: alertGrouped?.map((id: string) => ({
              alert_id_grouped: id,
            })),
          },
          {
            abortEarly: false,
          }
        );

        if (!validData.alertGrouped) {
          validData.alertGrouped = [];
        }

        dispatch(MainActions.request(alertTypeData?.id, validData));
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

  useEffect(() => {
    if (alertTypeData && alertTypeData.alerts_group.length) {
      setToggleGrouped(() => true);
    }
  }, [alertTypeData]);
  return (
    <>
      <S.Container>
        <Form ref={formRef} onSubmit={onSubmit} placeholder="">
          {alertTypeLoading ? (
            <S.ActivityIndicator />
          ) : (
            <S.GridContainer>
              <Input
                name="description"
                label={t("comex.settings.alertType.descTypesAlert")}
                defaultValue={alertTypeData?.description}
              />

              <TextArea
                label={t("comex.settings.alertType.descDetailsAlert")}
                name="details"
                defaultValue={alertTypeData?.details}
              />

              <S.GroupContainer>
                <ToggleInput
                  label={t("comex.settings.alertType.toggleGroupedLabel")}
                  name="toggleGrouped"
                  mood="secondary"
                  onClick={() => {
                    setToggleGrouped((old) => !old);
                  }}
                  value={toggleGrouped}
                />

                {toggleGrouped && (
                  <CheckboxInput
                    isLoading={loadingListAlertTypes}
                    options={AlertValid}
                    defaultOptions={alertTypesGrouped}
                    name="alertGrouped"
                    label={t("comex.settings.alertType.list")}
                  />
                )}
              </S.GroupContainer>

              <S.Ghost />
              <S.Ghost />
              <S.CheckContainer>
                <CheckboxInput
                  isLoading={rolesLoading}
                  options={rolesValid}
                  defaultOptions={alertTypesRoles}
                  name="roles"
                  label={t("general.config.users.profile")}
                />
              </S.CheckContainer>
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

export default UpdateAlertTypeForm;
