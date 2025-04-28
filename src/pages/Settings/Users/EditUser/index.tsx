import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from "hooks";
import { translations } from "./translations";

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import {
  CreateUserBusinessLineActions,
  CreateUserBusinessLineState,
  CreateUserCompanyActions,
  CreateUserCompanyState,
  CreateUserGroupActions,
  CreateUserGroupState,
  FetchUserState,
  FetchUserActions,
  UpdateUserActions,
  UpdateUserState,
  DeleteUserActions,
  DeleteUserState,
  FetchUserBusinessLineActions,
  FetchUserBusinessLineState,
  FetchUserCompanyActions,
  FetchUserCompanyState,
  FetchUserGroupActions,
  FetchUserGroupState,
  CreateUserSecondaryEmailActions,
  FetchUserSecondaryEmailActions,
  FetchUserSecondaryEmailState,
} from 'store/ducks/settings/users';
import { ListRolesState, ListRolesActions } from 'store/ducks/roles';
import {
  ListGroupsState,
  ListGroupsActions,
} from 'store/ducks/settings/groups';
import {
  ListCompaniesActions,
  ListCompaniesState,
  ListCompaniesFilterActions,
  ListCompaniesFilterState,
} from 'store/ducks/settings/companies';
import {
  ListBusinessActions,
  ListBusinessState,
} from 'store/ducks/settings/business';
import {
  ListCarriersState,
  ListCarriersActions,
} from 'store/ducks/settings/carriers';

import {
  ListClientsActions,
  ListClientsState,
} from 'store/ducks/settings/clients';

import { useValidation } from 'hooks';

import * as S from './styles';
import { MainContainer, Modal, Alert } from 'components/shared';
import { Input, Select, ToggleInput } from 'components/shared/Form';
import {
  GridUserCompanies,
  GridUserGroups,
  GridUserBusinessLines,
  UploadAvatar,
  GridUserEmails,
} from 'components/settings/Users';

import { UserRoles } from 'interfaces/user';
import { date, niceDate } from 'utils';
import { LanguageState } from 'store/ducks/language';

interface IParams {
  id: string;
}

export const EditUser: React.FC = () => {
  const [role, setRole] = useState<UserRoles>(null);
  const [root, setRoot] = useState<boolean>(false);
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const formCompaniesRef = useRef<FormHandles>(null);
  const formBusinessLineRef = useRef<FormHandles>(null);
  const formGroupRef = useRef<FormHandles>(null);
  const formEmailsRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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

  const { loading: loadingRoles, data: dataRoles } = useSelector<
    RootStateOrAny,
    ListRolesState
  >((state) => state.listRoles);

  const { language } = useSelector<RootStateOrAny, LanguageState>(
    (state) => state.language
  );

  const { loading: loadingListCompanies, data: dataListCompanies } =
    useSelector<RootStateOrAny, ListCompaniesState>(
      (state) => state.listCompanies
    );

  const { loading: loadingListCompaniesFilter, data: dataListCompaniesFilter } =
    useSelector<RootStateOrAny, ListCompaniesFilterState>(
      (state) => state.listCompaniesFilter
    );

  const { loading: loadingListBusinessLines, data: dataListBusinessLines } =
    useSelector<RootStateOrAny, ListBusinessState>(
      (state) => state.listBusiness
    );

  const { loading: loadingCarriers, data: dataCarriers } = useSelector<
    RootStateOrAny,
    ListCarriersState
  >((state) => state.listCarriers);

  const { loading: loadingListGroups, data: dataListGroups } = useSelector<
    RootStateOrAny,
    ListGroupsState
  >((state) => state.listGroups);

  const { data: dataListUserCompanies } = useSelector<
    RootStateOrAny,
    FetchUserCompanyState
  >((state) => state.fetchUserCompany);

  const { data: dataListUserBusinessLines } = useSelector<
    RootStateOrAny,
    FetchUserBusinessLineState
  >((state) => state.fetchUserBusinessLine);

  const { data: dataListUserGroups } = useSelector<
    RootStateOrAny,
    FetchUserGroupState
  >((state) => state.fetchUserGroup);

  const { data: dataFetchUser, loading } = useSelector<
    RootStateOrAny,
    FetchUserState
  >((state) => state.fetchUser);

  const { loading: loadingDeleteUser } = useSelector<
    RootStateOrAny,
    DeleteUserState
  >((state) => state.deleteUser);

  const { loading: loadingUpdateUser } = useSelector<
    RootStateOrAny,
    UpdateUserState
  >((state) => state.updateUser);

  const { loading: loadingCreateUserCompany } = useSelector<
    RootStateOrAny,
    CreateUserCompanyState
  >((state) => state.createUserCompany);

  const { loading: loadingCreateUserGroup } = useSelector<
    RootStateOrAny,
    CreateUserGroupState
  >((state) => state.createUserGroup);

  const { loading: loadingCreateUserBusinessLine } = useSelector<
    RootStateOrAny,
    CreateUserBusinessLineState
  >((state) => state.createUserBusinessLine);

  const { data: dataClients, loading: loadingClients } = useSelector<
    RootStateOrAny,
    ListClientsState
  >((state) => state.listClients);

  const { data: dataListEmails } = useSelector<
    RootStateOrAny,
    FetchUserSecondaryEmailState
  >((state) => state.fetchUserSecondaryEmail);

  const onFetchSuccess = useCallback(
    (data) => {
      if (formRef.current) {
        const access_expires_at = data.access_expires_at
          ? date(data.access_expires_at)
          : '--';
        const last_access = data.last_access
          ? niceDate({ dateString: data.last_access, language })
          : '--';

        formRef.current.setData(data);
        formRef.current.setFieldValue('access_expires_at', access_expires_at);
        formRef.current.setFieldValue('last_access', last_access);
        if (!data.csr_id) {
          formRef.current.setFieldValue('csr_id', ' ');
        }

        formRef.current.setFieldValue(
          'expiration_days',
          dataExpiresDates.find(
            (days) => days.value === (data.expiration_days || 0)
          )
        );

        setRoot(data.root);

        // Set data Select's
        if (data.roles.length) {
          const { id, name } = data.roles[0];
          setRole(() => id);
          formRef.current.setFieldValue('general_role_id', {
            value: id,
            label: name,
          });

          if (id === Number(process.env.REACT_APP_ROLE_CLIENTE && data.client.length)) {
            const { id, company_name } = data.client[0];
            formRef.current.setFieldValue('general_client_id', {
              value: id,
              label: company_name,
            });
          }

		  if (id === Number(process.env.REACT_APP_ROLE_TRANSPORTADORA)) {
            const optionsUserCarrier = data.carrier.map((carrier: any) => {
              const {
                id,
                trade_name,
                address_city,
                address_state,
              } = carrier;
              return {
                value: id,
                label: `${trade_name} - ${address_city}/${address_state}`,
              };
            });
            formRef.current.setFieldValue(
              "general_carrier_id",
              optionsUserCarrier
            );
          }

          if (id === Number(process.env.REACT_APP_ROLE_ADMINISTRADOR_CD  && data.companies.length  )) {
            const companyOption = data.companies.map((el: any) => ({
              value: el.id,
              label: `${el.code} - ${el.trade_name}`,
            }));
            formRef.current.setFieldValue(
              'general_company_id_adm',
              companyOption
            );
          }

          if(data.roles[0].id === Number(process.env.REACT_APP_ROLE_ADMINISTRADOR)) {
            formRef.current.setFieldValue('root', 1)
          }
        }
      }
    },
    [dataExpiresDates, language, setRole]
  );

  useEffect(() => {
    if (formRef.current && role === Number(process.env.REACT_APP_ROLE_ADMINISTRADOR)) {
      formRef.current.setFieldValue('root', root)
    }
  }, [formRef, role, root]);

  useEffect(() => {
    if(formRef.current && dataFetchUser) {
      const access_expires_at = dataFetchUser.access_expires_at ? date(dataFetchUser.access_expires_at) : '--'
        const last_access = 
          dataFetchUser.last_access ? 
          niceDate({ dateString: dataFetchUser.last_access, language }) : 
          '--';
        formRef.current.setFieldValue("access_expires_at", access_expires_at);
        formRef.current.setFieldValue("last_access", last_access);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const getListUserCompanies = useCallback(() => {
    dispatch(FetchUserCompanyActions.request(id));
  }, [dispatch, id]);

  const getListUserBusinessLines = useCallback(() => {
    dispatch(FetchUserBusinessLineActions.request(id));
  }, [dispatch, id]);

  const getListUserGroups = useCallback(() => {
    dispatch(FetchUserGroupActions.request(id));
  }, [dispatch, id]);

  const getListUserSecondaryEmail = useCallback(() => {
    dispatch(FetchUserSecondaryEmailActions.request(id));
  }, [dispatch, id]);

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(FetchUserActions.request(id, onFetchSuccess));

      // Recarregar os dados do CS
      if (
        dataFetchUser?.roles[0].id === Number(process.env.REACT_APP_ROLE_GESTOR)
      ) {
        getListUserCompanies();
        getListUserBusinessLines();
        getListUserGroups();
      }
    }
  }, [
    dispatch,
    id,
    onFetchSuccess,
    dataFetchUser,
    getListUserCompanies,
    getListUserBusinessLines,
    getListUserGroups,
  ]);

  const onSuccess = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Obrigatório'),
          email: Yup.string().email('Inválido').required('Obrigatório'),
          csr: Yup.string(),
          general_role_id: Yup.string().required('Obrigatório'),
          ...(role === Number(process.env.REACT_APP_ROLE_TRANSPORTADORA) && {
			general_carrier_id: Yup.array()
			.of(Yup.string().required("Obrigatório"))
			.required("Obrigatório")
			.min(1, "Obrigatório"),
          }),
          ...(role === Number(process.env.REACT_APP_ROLE_CLIENTE) && {
            general_client_id: Yup.string().required('Obrigatório'),
          }),
          ...(role === Number(process.env.REACT_APP_ROLE_ADMINISTRADOR_CD) && {
            general_company_id_adm: Yup.string().required('Obrigatório'),
          }),
          password: Yup.string().nullable().optional(),
          confirm: Yup.string().test(
            'confirme-password',
            'Senhas não conferem',
            function (value) {
              return this.parent.password === value;
            }
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        data = {
          general_company_id: data.general_company_id_adm,
          ...data,
        };

        if (!data.password) delete data.password;
        delete data.confirm;
        delete data.mail;
        delete data.password_fake;
        delete data.general_company_id_adm;
        delete data.last_access;
        delete data.access_expires_at;

        dispatch(UpdateUserActions.request(id, data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, id, onSuccess, role]
  );

  const handleSubmitUserSecondaryEmail = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formEmailsRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        data.general_user_id = id;

        dispatch(
          CreateUserSecondaryEmailActions.request(
            data,
            getListUserSecondaryEmail
          )
        );
      } catch (error) {
        handleFormErrors(error, formEmailsRef);
      }
    },
    [dispatch, handleFormErrors, id, getListUserSecondaryEmail]
  );

  const handleSubmitUserGroup = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formGroupRef.current?.setErrors({});
        const schema = Yup.object().shape({
          general_group_id: Yup.string().required('Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        data.general_user_id = id;
        dispatch(CreateUserGroupActions.request(data, getListUserGroups));
      } catch (error) {
        handleFormErrors(error, formGroupRef);
      }
    },
    [dispatch, handleFormErrors, id, getListUserGroups]
  );

  const handleSubmitUserCompany = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formCompaniesRef.current?.setErrors({});
        const schema = Yup.object().shape({
          general_company_id: Yup.string().required('Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        data.general_user_id = id;
        dispatch(CreateUserCompanyActions.request(data, getListUserCompanies));
      } catch (error) {
        handleFormErrors(error, formCompaniesRef);
      }
    },
    [dispatch, handleFormErrors, id, getListUserCompanies]
  );

  const handleSubmitUserBusinessLine = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formBusinessLineRef.current?.setErrors({});
        const schema = Yup.object().shape({
          general_business_line_id: Yup.string().required('Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        data.general_user_id = id;
        dispatch(
          CreateUserBusinessLineActions.request(data, getListUserBusinessLines)
        );
      } catch (error) {
        handleFormErrors(error, formBusinessLineRef);
      }
    },
    [dispatch, handleFormErrors, id, getListUserBusinessLines]
  );

  const thatSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const thatSubmitFormUserGroup = useCallback(() => {
    formGroupRef.current?.submitForm();
  }, []);

  const thatSubmitFormUserSecondaryEmail = useCallback(() => {
    formEmailsRef.current?.submitForm();
  }, []);

  const thatSubmitFormUserCompany = useCallback(() => {
    formCompaniesRef.current?.submitForm();
  }, []);

  const thatSubmitFormUserBusinessLine = useCallback(() => {
    formBusinessLineRef.current?.submitForm();
  }, []);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteUserActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  const getListRoles = useCallback(() => {
    dispatch(
      ListRolesActions.request({
        all: true,
        general_module_id: process.env.REACT_APP_MODULE_TRACKING,
      })
    );
  }, [dispatch]);

  const getListCarriers = useCallback(() => {
    dispatch(ListCarriersActions.request({ all: true }));
  }, [dispatch]);

  const getListGroups = useCallback(() => {
    dispatch(ListGroupsActions.request({ all: true }));
  }, [dispatch]);

  const getListCompanies = useCallback(() => {
    dispatch(ListCompaniesActions.request({ all: true }));
  }, [dispatch]);

  const getListCompaniesFilter = useCallback(() => {
    dispatch(ListCompaniesFilterActions.request({ all: true, type: 'CD' }));
  }, [dispatch]);

  const getListBusinessLine = useCallback(() => {
    dispatch(ListBusinessActions.request({ all: true }));
  }, [dispatch]);

  const getListClients = useCallback(() => {
    dispatch(ListClientsActions.request({ all: true }));
  }, [dispatch]);

  useEffect(() => getListCompaniesFilter(), [getListCompaniesFilter]);

  useEffect(() => {
    getListRoles();
    getListCarriers();
    getListGroups();
    getListCompanies();
    getListBusinessLine();
    getListUserCompanies();
    getListUserBusinessLines();
    getListUserGroups();
    getListUserSecondaryEmail();
    getListClients();
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => (), [getListClients]);
  // useEffect(() => dataListCompaniesFilter(), [ dataListCompaniesFilter]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover Usuário ${dataFetchUser?.name}`}
          text="Deseja realmente remover esse usuário?"
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeleteUser}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')} <span>{getTranslation('editar')}</span>
          {loading && <S.LoadingPage />}
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
            <S.EditContainer>
              <UploadAvatar userId={dataFetchUser?.id} />
              <S.EditForm>
                <S.FormRow>
                  <Input name="name" label={getTranslation('nome')} />
                  <S.Drax>
                    <Input name="mail" label="Email Teste" />
                  </S.Drax>
                  <Input name="email" label={getTranslation('email')} id="email" />
                  <Input name="csr" label={getTranslation('csr')} />
                </S.FormRow>
                <S.FormRow>
                  <Select
                    name="general_role_id"
                    label={getTranslation('tipo')}
                    options={dataRoles}
                    placeholder={getTranslation('selecione')}
                    isLoading={loadingRoles}
                    isDisabled={loadingRoles}
                    onChange={(e: any) => setRole(e.value)}
                  />
                  <S.Drax>
                    <Input name="password_fake" label={getTranslation('senha')} type="password" />
                  </S.Drax>
                  <Input name="password" label={getTranslation('senha')} type="password" />
                  <Input
                    name="confirm"
                    label={getTranslation('confirmaSenha')}
                    type="password"
                  />
                </S.FormRow>
                <S.FormRow>
                  {role ===
                    Number(process.env.REACT_APP_ROLE_TRANSPORTADORA) && (
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

                  {role ===
                    Number(process.env.REACT_APP_ROLE_ADMINISTRADOR_CD) && (
                    <Select
                      name="general_company_id_adm"
                      label={getTranslation('centro')}
                      options={dataListCompaniesFilter}
                      placeholder={getTranslation('selecione')}
                      isLoading={loadingListCompaniesFilter}
                      isDisabled={loadingListCompaniesFilter}
                    />
                  )}
                </S.FormRow>
                <S.FormRow>
                  <Select
                    name="expiration_days"
                    label={getTranslation('renovacaoSenha')}
                    options={dataExpiresDates}
                    placeholder={getTranslation('expiraPlace')}
                  />
                  <Input
                    name="access_expires_at"
                    label={getTranslation('proximaExpiracao')}
                    disabled={true}
                  />
                  <Input
                    name="last_access"
                    label={getTranslation('ultimoAcesso')}
                    disabled={true}
                  />
                </S.FormRow>
                <S.FormRow>
                  <ToggleInput
                    name="integration"
                    label={getTranslation('bloquear')}
                  />
                  <ToggleInput name="app_access" label={getTranslation('acesso')} />
                  {role ===
                    Number(process.env.REACT_APP_ROLE_ADMINISTRADOR) && (
                    <ToggleInput name="root" label={getTranslation('superAdmin')} />
                  )}
                </S.FormRow>
              </S.EditForm>
            </S.EditContainer>
          </S.BoxContainer>
        </Form>

        <S.Title>{getTranslation('emailSeg')}</S.Title>
        <S.Text>{getTranslation('emailOutros')}</S.Text>

        <S.BoxContainer>
          <Form ref={formEmailsRef} onSubmit={handleSubmitUserSecondaryEmail}>
            <S.FormRow>
              <Input name="email" label={getTranslation('email')} />
              <S.ButtonAddWrapper>
                <S.ButtonAdd
                  type="button"
                  onClick={thatSubmitFormUserSecondaryEmail}
                >
                  {loadingCreateUserGroup ? <S.LoadingAdd /> : <S.IconPlus />}
                  {getTranslation('adicionar')}
                </S.ButtonAdd>
              </S.ButtonAddWrapper>
            </S.FormRow>
          </Form>
        </S.BoxContainer>

        {dataListEmails && (
          <GridUserEmails
            emails={dataListEmails}
            onSuccess={getListUserSecondaryEmail}
          />
        )}

        {role === Number(process.env.REACT_APP_ROLE_GESTOR) &&
          dataFetchUser?.roles[0].id ===
            Number(process.env.REACT_APP_ROLE_GESTOR) && (
            <>
              <S.Title>{getTranslation('permissao')}</S.Title>
              <S.Text>
              {getTranslation('selectGrupo')}
              </S.Text>
              <S.BoxContainer>
                <Form ref={formGroupRef} onSubmit={handleSubmitUserGroup}>
                  <S.FormRow>
                    <Select
                      name="general_group_id"
                      label="Grupo"
                      options={dataListGroups}
                      isLoading={loadingListGroups}
                      isDisabled={loadingListGroups}
                      placeholder={getTranslation('selecione')}

                    />
                    <S.ButtonAddWrapper>
                      <S.ButtonAdd
                        type="button"
                        onClick={thatSubmitFormUserGroup}
                      >
                        {loadingCreateUserGroup ? (
                          <S.LoadingAdd />
                        ) : (
                          <S.IconPlus />
                        )}
                        {getTranslation('adicionar')}
                      </S.ButtonAdd>
                    </S.ButtonAddWrapper>
                  </S.FormRow>
                </Form>
              </S.BoxContainer>
              {dataListUserGroups?.groups && (
                <GridUserGroups
                  groups={dataListUserGroups.groups}
                  userId={dataListUserGroups.user.id}
                  onSuccess={getListUserGroups}
                />
              )}
              <S.Title>{getTranslation('restringir')}</S.Title>
              <S.Text>
              {getTranslation('restringirCentro')}
              </S.Text>
              <S.BoxContainer>
                <Form ref={formCompaniesRef} onSubmit={handleSubmitUserCompany}>
                  <S.FormRow>
                    <Select
                      name="general_company_id"
                      label={getTranslation('centro')}
                      options={dataListCompanies}
                      isLoading={loadingListCompanies}
                      isDisabled={loadingListCompanies}
                      placeholder={getTranslation('selecione')}

                    />
                    <S.ButtonAddWrapper>
                      <S.ButtonAdd
                        type="button"
                        onClick={thatSubmitFormUserCompany}
                      >
                        {loadingCreateUserCompany ? (
                          <S.LoadingAdd />
                        ) : (
                          <S.IconPlus />
                        )}
                        {getTranslation('adicionar')}
                      </S.ButtonAdd>
                    </S.ButtonAddWrapper>
                  </S.FormRow>
                </Form>
              </S.BoxContainer>
              {dataListUserCompanies?.companies && (
                <GridUserCompanies
                  companies={dataListUserCompanies.companies}
                  userId={dataListUserCompanies.user.id}
                  onSuccess={getListUserCompanies}
                />
              )}
              <S.Title>{getTranslation('aprovbl')}</S.Title>
              <S.Text>
              {getTranslation('adicionebl')}
              </S.Text>
              <S.BoxContainer>
                <Form
                  ref={formBusinessLineRef}
                  onSubmit={handleSubmitUserBusinessLine}
                >
                  <S.FormRow>
                    <Select
                      name="general_business_line_id"
                      label="Segmento"
                      options={dataListBusinessLines}
                      isLoading={loadingListBusinessLines}
                      placeholder={getTranslation('selecione')}
                      isDisabled={loadingListBusinessLines}
                    />
                    <S.ButtonAddWrapper>
                      <S.ButtonAdd
                        type="button"
                        onClick={thatSubmitFormUserBusinessLine}
                      >
                        {loadingCreateUserBusinessLine ? (
                          <S.LoadingAdd />
                        ) : (
                          <S.IconPlus />
                        )}
                        {getTranslation('adicionar')}
                      </S.ButtonAdd>
                    </S.ButtonAddWrapper>
                  </S.FormRow>
                </Form>
              </S.BoxContainer>
              {dataListUserBusinessLines?.business_lines && (
                <GridUserBusinessLines
                  businessLines={dataListUserBusinessLines.business_lines}
                  userId={dataListUserBusinessLines.user.id}
                  onSuccess={getListUserBusinessLines}
                />
              )}
            </>
          )}
        <S.FormFooter>
          <S.FormRow>
            <S.Button
              btStyle="cancel"
              type="button"
              onClick={() => history.goBack()}
            >
              {getTranslation('cancelar')}
            </S.Button>
            <S.Button
              btStyle="danger"
              type="button"
              onClick={() => setModalOpen(true)}
            >
              {getTranslation('remover')}
            </S.Button>
            <S.Button type="button" onClick={thatSubmitForm}>
              {loadingUpdateUser ? <S.Loading /> : getTranslation('cadastrar')}
            </S.Button>
          </S.FormRow>
        </S.FormFooter>
      </S.PageContent>
    </MainContainer>
  );
};
