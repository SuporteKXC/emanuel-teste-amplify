import React, { useCallback, useRef, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useTranslation } from "hooks";
import { translations } from "./translations";

import { CreateUserState, CreateUserActions } from "store/ducks/settings/users";
import { ListRolesState, ListRolesActions } from "store/ducks/roles";
import {
  ListCarriersState,
  ListCarriersActions,
} from "store/ducks/settings/carriers";

import {
  ListClientsActions,
  ListClientsState,
} from "store/ducks/settings/clients";

import {
  ListCompaniesFilterActions,
  ListCompaniesFilterState,
} from "store/ducks/settings/companies";

import { useValidation } from "hooks";

import * as S from "./styles";
import { MainContainer } from "components/shared";
import { Input, Select } from "components/shared/Form";

import { UserRoles } from "interfaces/user";

export const NewUser: React.FC = () => {
  const [role, setRole] = useState<UserRoles>(null);
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const dataExpiresDates = useMemo(() => [
    { value: 0, label: getTranslation('naoExpira') },
    { value: 30, label: getTranslation('expira30') },
    { value: 60, label: getTranslation('expira60') },
    { value: 180, label: getTranslation('expira180') },
  ], [getTranslation]);

  const getListClients = useCallback(() => {
    dispatch(ListClientsActions.request({ all: true }));
  }, [dispatch]);

  useEffect(() => getListClients(), [getListClients]);

  const { data: dataClients, loading: loadingClients } =
    useSelector<RootStateOrAny>(
      (state) => state.listClients
    ) as ListClientsState;

  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.createUser
  ) as CreateUserState;

  const { loading: loadingRoles, data: dataRoles } =
    useSelector<RootStateOrAny>((state) => state.listRoles) as ListRolesState;

  const { loading: loadingCarriers, data: dataCarriers } =
    useSelector<RootStateOrAny>(
      (state) => state.listCarriers
    ) as ListCarriersState;

  const { loading: loadingListCompaniesFilter, data: dataListCompaniesFilter } = useSelector<
    RootStateOrAny,
    ListCompaniesFilterState
  >((state) => state.listCompaniesFilter);

  const onSuccess = useCallback(
    (userId) => {
      history.push(`/settings/user/${userId}`);
    },
    [history]
  );

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        const chars = [
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
          "0123456789",
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        ];
        const randPwd = [5, 5, 5]
          .map(function (len, i) {
            return Array(len)
              .fill(chars[i])
              .map(function (x) {
                return x[Math.floor(Math.random() * x.length)];
              })
              .join("");
          })
          .concat()
          .join("")
          .split("")
          .sort(function () {
            return 0.5 - Math.random();
          })
          .join("");

        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required(getTranslation('obrigatorio')),
          email: Yup.string().email("Inválido").required(getTranslation('obrigatorio')),
          general_role_id: Yup.string().required(getTranslation('obrigatorio')),
          ...(role === Number(process.env.REACT_APP_ROLE_TRANSPORTADORA) && {
			general_carrier_id: Yup.array()
			.of(Yup.string().required("Obrigatório"))
			.required("Obrigatório")
			.min(1, "Obrigatório"),
          }),
          ...(role === Number(process.env.REACT_APP_ROLE_CLIENTE) && {
            general_client_id: Yup.string().required(getTranslation('obrigatorio')),
          }),
          ...(role === Number(process.env.REACT_APP_ROLE_ADMINISTRADOR_CD) && {
            general_company_id: Yup.string().required(getTranslation('obrigatorio')),
          }),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        data.password = randPwd;
        delete data.confirm;
        dispatch(CreateUserActions.request(data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, getTranslation, handleFormErrors, onSuccess, role]
  );

  const getListRoles = useCallback(() => {
    dispatch(
      ListRolesActions.request({
        all: true,
        general_module_id: process.env.REACT_APP_MODULE_TRACKING,
      })
    );
  }, [dispatch]);

  const getListCompaniesFilter = useCallback(() => {
    dispatch(ListCompaniesFilterActions.request({ all: true, type: 'CD' }));
  }, [dispatch]);


  useEffect(() => {
    getListRoles();
  }, [getListRoles]);

  const getListCarriers = useCallback(() => {
    dispatch(ListCarriersActions.request({ all: true }));
  }, [dispatch]);

  useEffect(() => {
    getListCarriers();
  }, [getListCarriers]);

  useEffect(() => {
    getListCompaniesFilter();
  }, [getListCompaniesFilter]);

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
            {getTranslation('configuracoes')} <span>{getTranslation('novoUsuario')}</span>
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini btStyle="dark" onClick={() => history.goBack()}>
            <S.IconArrowLeft />
            {getTranslation('voltar')}
          </S.ButtonMini>
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.BoxContainer>
            <S.FormRow>
              <Input name="name" label={getTranslation('nome')} />
              <Input name="email" label={getTranslation('email')} />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="general_role_id"
                label={getTranslation('tipo')}
                options={dataRoles}
                isLoading={loadingRoles}
                isDisabled={loadingRoles}
                placeholder={getTranslation('selecione')}
                onChange={(e: any) => setRole(e.value)}
              />
              <Select
                name="expiration_days"
                label={getTranslation('renovacaoSenha')}
                options={dataExpiresDates}
                defaultValue={dataExpiresDates[0]}
                placeholder={getTranslation('expiraPlace')}
              />
            </S.FormRow>
            <S.FormRow>
              {role === Number(process.env.REACT_APP_ROLE_TRANSPORTADORA) && (
                <Select
                  name="general_carrier_id"
                  label={getTranslation('transportadora')}
                  options={dataCarriers}
                  placeholder={getTranslation('selecione')}
                  isLoading={loadingCarriers}
                  isDisabled={loadingCarriers}
				  isMulti
                />
              )}
            </S.FormRow>
            
            <S.FormRow>
              {role === Number(process.env.REACT_APP_ROLE_CLIENTE) && (
                <Select
                  name="general_client_id"
                  label={getTranslation('clientes')}
                  options={dataClients}
                  placeholder={getTranslation('selecione')}
                  isLoading={loadingClients}
                  isDisabled={loadingClients}
                />
              )}

              {role === Number(process.env.REACT_APP_ROLE_ADMINISTRADOR_CD) && (
                <Select
                  name="general_company_id"
                  label={getTranslation('centro')}
                  options={dataListCompaniesFilter}
                  placeholder={getTranslation('selecione')}
                  isLoading={loadingListCompaniesFilter}
                  isDisabled={loadingListCompaniesFilter}
                />
              )
              }
            </S.FormRow>
          </S.BoxContainer>
          <S.FormFooter>
            <S.FormRow>
              <S.Button
                btStyle="cancel"
                type="button"
                onClick={() => history.goBack()}
              >
                {getTranslation('cancelar')}
              </S.Button>
              <S.Button type="submit">
                {loading ? <S.Loading /> : getTranslation('cadastrar')}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
    </MainContainer>
  );
};
