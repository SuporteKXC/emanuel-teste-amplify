import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, CheckboxInput, Select } from "components/shared/Forms";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { ActionsListActions } from "store/ducks/general";
import { useTranslation } from "react-i18next";
import {
  UpdateRoleActions as MainActions,
  FetchRoleActions,
  ModulesListActions,
} from "store/ducks";
import * as Yup from "yup";
import * as S from "./styles";
import { Link, useNavigate, useParams } from "react-router-dom";

interface IOption {
  label: string;
  value: string;
}

interface Options {
  id: string;
  label: string;
  value: string;
  module: string;
}

interface GroupedActions {
  [key: string]: Options[];
}

export const UpdateRoleForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { i18n, t } = useTranslation();
  const [selectedModule, setSelectedModule] = useState<IOption>();

  const { data: roleData, loading: roleLoading } = useSelector(
    (state: RootState) => state.role
  );

  const { data: actionsData, loading: actionsLoading } = useSelector(
    (state: RootState) => state.actions
  );

  const { data: modulesData, loading: modulesLoading } = useSelector(
    (state: RootState) => state.modules
  );

  const { loading } = useSelector((state: RootState) => state.updateRole);

  const fetchRole = useCallback(() => {
    dispatch(FetchRoleActions.request(id));
  }, [dispatch]);

  const fetchActions = useCallback(() => {
    dispatch(ActionsListActions.request());
  }, [dispatch]);

  const fetchModules = useCallback(() => {
    dispatch(ModulesListActions.request());
  }, [dispatch]);

  useEffect(() => {
    fetchActions();
    fetchRole();
    fetchModules();
  }, [loading]);

  const moduleOptions = modulesData?.map((module) => ({
    value: module.name,
    label: module.name,
  }));

  const roleActions = roleData?.role_action.map((item) => ({
    id: `${item.action.id}`,
    label: item.action.description,
    value: `${item.action?.id}`,
  }));

  const groupedActions: GroupedActions = {};

  actionsData?.forEach((item) => {
    if (!groupedActions.hasOwnProperty(`${item.group}`)) {
      Object.assign(groupedActions, { [`${item.group}`]: [] });
    }

    groupedActions[`${item.group}`].push({
      id: `${item?.id}`,
      label: item?.description,
      value: `${item?.id}`,
      module: item.module.name,
    });
  });

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        const { name } = data;
        delete data.module;
        delete data.name;

        const actionIds = Object.values(data)
          .flat()
          .map((actionId) => ({
            action_id: actionId,
          }));

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          data: Yup.object().shape({
            name: Yup.string().required("Nome obrigatório"),
          }),
          actionIds: Yup.array().of(
            Yup.object().shape({
              action_id: Yup.string(),
            })
          ),
        });

        const validData = await schema.validate(
          {
            data: { name },
            actions: actionIds,
          },
          {
            abortEarly: false,
          }
        );

        dispatch(MainActions.request(roleData?.id, validData));
      } catch (error) {
        console.log(error);
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const checkAllGroupsHandler = () => {
    Object.entries(groupedActions).forEach(([group, actionsGroup]) => {
      actionsGroup.map((action) =>
        formRef.current?.setFieldValue(
          sanitizeGroupAction(group),
          action.id.toString()
        )
      );
    });
  };

  const unCheckAllGroupsHandler = () => {
    Object.entries(groupedActions).forEach(([group, actionsGroup]) => {
      actionsGroup.map((action) =>
        formRef.current?.clearField(sanitizeGroupAction(group))
      );
    });
  };

  useEffect(() => {
    return () => {
      dispatch(MainActions.reset());
    };
  }, [dispatch]);

  const sanitizeGroupAction = (group: string) => {
    if (group.includes(".")) {
      return group.replaceAll(".", "-");
    }
    return group;
  };

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit} placeholder="">
            <S.GridContainer>
              <Input
                name="name"
                label={t("general.config.profile.nameDoProfile")}
                defaultValue={roleData?.name}
              />
              <S.Ghost />
              <Select
                name="module"
                options={moduleOptions}
                defaultValue={selectedModule}
                label={t("general.config.profile.selectModuleTitle")}
                placeholder={t("general.config.profile.selectModulePlaceHolder")}
                isLoading={modulesLoading}
                //@ts-ignore
                onChange={(value) => setSelectedModule(value)}
              />
            <S.CheckContainer>
              {actionsData && actionsLoading ? (
                <S.ActivityIndicator />
              ) : (
                Object.entries(groupedActions).map(([group, actionsGroup], i) => (
                  <CheckboxInput
                    hideInList={
                      !(
                        selectedModule?.value &&
                        actionsGroup[0].module === selectedModule.value
                      )
                    }
                    direction="column"
                    fixWidth="165px"
                    defaultOptions={roleActions}
                    key={sanitizeGroupAction(group)}
                    options={actionsGroup}
                    name={sanitizeGroupAction(group)}
                    label={sanitizeGroupAction(group)}
                  />
                ))
              )}
            </S.CheckContainer>
            <S.FormActions>
            </S.FormActions>
            {selectedModule && (
            <S.ChecksHeader>
              <S.Button
                type="button"
                size="small"
                mood="secondary"
                onClick={checkAllGroupsHandler}
              >
                Marcar todos
              </S.Button>
              <S.Button
                type="button"
                size="small"
                mood="outlinedDanger"
                onClick={unCheckAllGroupsHandler}
              >
                Desmarcar todos
              </S.Button>
            </S.ChecksHeader>
            )}
            </S.GridContainer>
            <S.ContainerButton>
              <S.Button mood="primary" type="submit">
                {loading ? <S.ActivityIndicator /> : t("comex.filterandButton.update")}
              </S.Button>
              <S.Button onClick={() => navigate(-1)} type="reset">
                {t("comex.filterandButton.cancel")}
              </S.Button>
            </S.ContainerButton>
      </Form>
    </S.Container>
  );
}  