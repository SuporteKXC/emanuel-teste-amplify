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
import { NewRoleActions as MainActions } from "store/ducks";
import * as Yup from "yup";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ActionsListActions, ModulesListActions } from "store/ducks/general";

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

export const NewRoleForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const [selectedModule, setSelectedModule] = useState<IOption>();

  const { loading } = useSelector((state: RootState) => state.newrole);

  const { data: actionsData, loading: actionsLoading } = useSelector(
    (state: RootState) => state.actions
  );

  const { data: modulesData, loading: modulesLoading } = useSelector(
    (state: RootState) => state.modules
  );

  const fetchActions = useCallback(() => {
    dispatch(ActionsListActions.request());
  }, [dispatch]);

  const fetchModules = useCallback(() => {
    dispatch(ModulesListActions.request());
  }, [dispatch]);

  useEffect(() => {
    fetchActions();
    fetchModules();
  }, []);

  const moduleOptions = modulesData?.map((module) => ({
    value: module.name,
    label: module.name,
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

        dispatch(MainActions.request(validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const onSuccess = (id: string) => {
    navigate(`/config/roles/update/${id}`);
  };

  const checkAllGroupsHandler = () => {
    Object.entries(groupedActions).forEach(([group, actionsGroup]) => {
      actionsGroup.map((action) =>
        formRef.current?.setFieldValue(group, action.id)
      );
    });
  };

  const unCheckAllGroupsHandler = () => {
    Object.entries(groupedActions).forEach(([group, actionsGroup]) => {
      actionsGroup.map((action) => formRef.current?.clearField(group));
    });
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
            name="name"
            label={t("general.config.profile.nameDoProfile")}
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
                  key={group}
                  options={actionsGroup}
                  name={group}
                  label={group}
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
              {loading ? (
                <S.ActivityIndicator />
              ) : (
                t("comex.filterandButton.register")
              )}
            </S.Button>
            <S.Button onClick={() => navigate(-1)} type="reset">
              {t("comex.filterandButton.cancel")}
            </S.Button>
          </S.ContainerButton>
      </Form>
    </S.Container>
  );
};
