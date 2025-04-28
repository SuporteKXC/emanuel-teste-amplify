import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import {
  FetchClientState,
  FetchClientActions,
  UpdateClientActions,
  UpdateClientState,
  DeleteClientActions,
  DeleteClientState,
} from 'store/ducks/settings/clients';
import { ListCitiesActions, ListCitiesState } from 'store/ducks/cities';
import { CepActions, CepState } from 'store/ducks/cep';
import {
  ListClientTypesActions,
  ListClientTypesState,
} from 'store/ducks/settings/client-types';

import { useValidation, useTranslation } from 'hooks';
import { translations } from './translations';
import { validaCNPJ } from 'utils/formatters';

import * as S from './styles';
import { MainContainer, Modal, Alert } from 'components/shared';
import {
  Input,
  Textarea,
  Select,
  InputMask,
  ToggleInput,
} from 'components/shared/Form';

import { statesOptions } from 'utils/data/states';
import { ICitiesOptions } from 'interfaces/city';

import { IClientTypeOption } from 'interfaces/client-type';
interface IParams {
  id: string;
}

export const EditClient: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const [isExterior, setIsExterior] = useState<boolean>(false);

  const { data: dataFetchClient, loading } = useSelector<
    RootStateOrAny,
    FetchClientState
  >((state) => state.fetchClient);

  const { loading: loadingDeleteClient } = useSelector<
    RootStateOrAny,
    DeleteClientState
  >((state) => state.deleteClient);

  const { loading: loadingUpdateClient } = useSelector<
    RootStateOrAny,
    UpdateClientState
  >((state) => state.updateClient);

  const { data: dataClientTypes, loading: loadingClientTypes } = useSelector<
    RootStateOrAny,
    ListClientTypesState
  >((state) => state.listClientTypes);

  const { data: dataCities, loading: loadingCities } = useSelector<
    RootStateOrAny,
    ListCitiesState
  >((state) => state.listCities);

  const { loading: loadingCep } = useSelector<RootStateOrAny, CepState>(
    (state) => state.cep
  );

  const onSuccess = useCallback(() => {
    history.push('/settings/clients');
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      const schemaCNPJ = Yup.object().shape({
        cnpj: Yup.string()
          .test('validaCNPJ', 'CNPJ Inválido', (value: any) =>
            validaCNPJ(value)
          )
          .required('Obrigatório'),
        id_exterior: Yup.string(),
        company_name: Yup.string().required('Obrigatório'),
        trade_name: Yup.string().required('Obrigatório'),
        client_code: Yup.mixed()
          .test('codeValidation', 'Código inválido', (value: any) =>
            Number.isInteger(Math.abs(Number(value)))
          )
          .required('Obrigatório'),
        email: Yup.string().email('Email inválido'),
        address_street: Yup.string().required('Obrigatório'),
        address_number: Yup.string().required('Obrigatório'),
        address_neighborhood: Yup.string().required('Obrigatório'),
        address_zipcode: Yup.string().required('Obrigatório'),
        address_city: Yup.string().required('Obrigatório'),
        address_state: Yup.string().required('Obrigatório'),
        receiving_start: Yup.string(),
        receiving_end: Yup.string().when(
          'receiving_start',
          (receiving_start: any, field: any) =>
            !(receiving_start && receiving_start !== '00:00')
              ? field
              : field.required('Obrigatório')
        ),
        meal_start: Yup.string(),
        meal_end: Yup.string().when(
          'meal_start',
          (meal_start: any, field: any) =>
            !(meal_start && meal_start !== '00:00')
              ? field
              : field.required('Obrigatório')
        ),
      });

      const schemaExterior = Yup.object().shape({
        cnpj: Yup.string(),
        company_name: Yup.string().required('Obrigatório'),
        trade_name: Yup.string().required('Obrigatório'),
        client_code: Yup.mixed()
          .test('codeValidation', 'Código inválido', (value: any) =>
            Number.isInteger(Math.abs(Number(value)))
          )
          .required('Obrigatório'),
        email: Yup.string().email('Email inválido'),
        address_street: Yup.string(),
        address_number: Yup.string(),
        address_neighborhood: Yup.string(),
        address_zipcode: Yup.string(),
        address_city: Yup.string(),
        address_state: Yup.string(),
        receiving_start: Yup.string(),
        receiving_end: Yup.string().when(
          'receiving_start',
          (receiving_start: any, field: any) =>
            !(receiving_start && receiving_start !== '00:00')
              ? field
              : field.required('Obrigatório')
        ),
        meal_start: Yup.string(),
        meal_end: Yup.string().when(
          'meal_start',
          (meal_start: any, field: any) =>
            !(meal_start && meal_start !== '00:00')
              ? field
              : field.required('Obrigatório')
        ),
      });

      try {
        formRef.current?.setErrors({});

        const schema = isExterior ? schemaExterior : schemaCNPJ;

        await schema.validate(data, {
          abortEarly: false,
        });

        if (isExterior) {
          data.cnpj = '';
          data.address_city = '';
          data.address_country = 'EX';
          data.address_id_city_ibge = '';
          data.address_neighborhood = '';
          data.address_number = '';
          data.address_state = 'EX';
          data.address_zipcode = '';
          data.address_street = '';
        } else {
          data.address_country = 'BR';
        }

        if (data.cnpj !== '') {
          data.id_exterior = '';
        }

        data.cnpj = data.cnpj.replace(/[^0-9]/g, '');
        data.phone_number = data.phone_number.replace(/[^0-9]/g, '');

        delete data.is_exterior;

        dispatch(UpdateClientActions.request(id, data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, id, onSuccess, isExterior]
  );

  const fetchCities = useCallback(
    (option) => {
      dispatch(ListCitiesActions.request({ state: option.value }));
    },
    [dispatch]
  );

  const getListClientTypes = useCallback(() => {
    dispatch(ListClientTypesActions.request({ all: true }));
  }, [dispatch]);

  const setIbge = useCallback((ibge) => {
    if (formRef.current)
      return formRef.current.setFieldValue('address_id_city_ibge', ibge);
  }, []);

  const putDataInFields = useCallback(
    (data) => {
      if (!data && formRef.current) {
        return formRef.current.setFieldError(
          'address_zipcode',
          'CEP não encontrado'
        );
      }
      if (dataClientTypes) {
        const clientTypeOption = dataClientTypes.filter(
          (clientType: IClientTypeOption) =>
            clientType.value === data.general_client_type_id
        );

        if (clientTypeOption.length > 0 && formRef.current) {
          formRef.current.setFieldValue(
            'general_client_type_id',
            clientTypeOption[0]
          );
        }
      }
      const stateOption = statesOptions.filter(
        (stateOption) => stateOption.value === data.address_state
      );

      const setCityForm = (cities: ICitiesOptions[]) => {
        const cityOption = cities.filter(
          (city) => city.ibge === data.address_id_city_ibge
        );

        if (cityOption.length > 0) {
          setIbge(cityOption[0].ibge);

          if (formRef.current) {
            formRef.current.setFieldValue('address_city', cityOption[0]);
          }
        }
      };

      dispatch(
        ListCitiesActions.request({ state: data.address_state }, setCityForm)
      );

      if (stateOption.length > 0 && formRef.current) {
        formRef.current.setFieldValue('address_street', data.address_street);
        formRef.current.setFieldValue(
          'address_neighborhood',
          data.address_neighborhood
        );
        formRef.current.setFieldValue('address_state', stateOption[0]);
      }
    },
    [dataClientTypes, dispatch, setIbge]
  );

  const fetchCep = useCallback(
    (cep) => {
      formRef.current?.setFieldError('address_zipcode', '');
      const cleanCEP = cep ? cep.replace(/[^0-9]/g, '') : null;
      if (cleanCEP && cleanCEP.length < 8) {
        return formRef.current?.setFieldError(
          'address_zipcode',
          'CEP inválido'
        );
      }
      if (cleanCEP && cleanCEP.length === 8) {
        dispatch(CepActions.request(cleanCEP, putDataInFields));
      }
    },
    [dispatch, putDataInFields]
  );

  const onFetchSuccess = useCallback(
    (data) => {
      delete data.cnpj_root;
      if (formRef.current) {
        if (!data.phone_number) {
          data.phone_number = '';
        }
        if (!data.receiving_start) {
          data.receiving_start = '00:00';
        }
        if (!data.receiving_end) {
          data.receiving_end = '00:00';
        }
        if (!data.meal_start) {
          data.meal_start = '00:00';
        }
        if (!data.meal_end) {
          data.meal_end = '00:00';
        }
        if (!data.cnpj) {
          data.cnpj = '';
        }
        if (data.address_country === 'EX') {
          data.is_exterior = true;
          data.address_city = '';
          data.address_country = 'EX';
          data.address_id_city_ibge = '';
          data.address_neighborhood = '';
          data.address_number = '';
          data.address_state = 'EX';
          data.address_zipcode = '';
          data.address_street = '';
          setIsExterior(true);
        }

        formRef.current.setData(data);
        putDataInFields(data);
      }
    },
    [putDataInFields]
  );

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(FetchClientActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteClientActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  useEffect(() => {
    getListClientTypes();
  }, [getListClientTypes]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover Cliente ${dataFetchClient?.company_name}`}
          text="Ao remover a cliente selecionado todas as Notas ficiais vinculadas, não serão mais exibidas na plataforma. Deseja realmente remover?"
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeleteClient}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
            {getTranslation('configuracoes')}<span>{getTranslation('editarCliente')}</span>
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
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            id_exterior: dataFetchClient?.id_exterior
              ? dataFetchClient?.id_exterior
              : '',
            cnpj: !dataFetchClient?.id_exterior ? dataFetchClient?.cnpj : '',
          }}
        >
          <S.BoxContainer>
            <S.FormRow>
              <ToggleInput
                name="is_exterior"
                label={isExterior ? getTranslation('estrangeiro') : getTranslation('nacional')}
                onChange={(e: any) => setIsExterior(!isExterior)}
              />
              <S.Separator />
              {!isExterior ? (
                <InputMask name="cnpj" label={getTranslation('cnpj')} mask="99.999.999/9999-99" />
              ) : (
                <Input name="id_exterior" label={getTranslation('IdExterior')}/>
              )}
              <Input name="company_name" label={getTranslation('razaoSocial')}/>
              <Input name="trade_name" label={getTranslation('nomeFantasia')}/>
              <Input name="client_code" label={getTranslation('codigoSAP')}/>
            </S.FormRow>
            <S.FormRow>
              <Select
                name="general_client_type_id"
                label={getTranslation('segmentacao')}
                isLoading={loadingClientTypes}
                isDisabled={loadingClientTypes}
                options={dataClientTypes}
                placeholder={getTranslation('selecione')}
              />
              <Input name="inscricao_estadual" label={getTranslation('inscricaoEstatual')}/>
              <InputMask
                name="phone_number"
                label={getTranslation('telefone')}
                mask="(99) 9999-99999"
              />
              <Input name="email" label={getTranslation('email')} />
            </S.FormRow>
            <S.FormRow>
              <InputMask
                name="address_zipcode"
                label={getTranslation('cep')}
                onBlur={(e: any) => fetchCep(e.target.value)}
                isLoading={loadingCep}
                mask="99999-999"
                disabled={isExterior}
              />
              <Input
                name="address_street"
                label={getTranslation('lougradouro')}
                disabled={isExterior}
              />
              <Input
                name="address_number"
                label={getTranslation('numero')}
                disabled={isExterior}
              />
              <Input
                name="address_neighborhood"
                label={getTranslation('bairro')}
                disabled={isExterior}
              />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="address_state"
                label={getTranslation('uf')}
                options={statesOptions}
                disabled={isExterior}
                placeholder={getTranslation('selecione')}
                onChange={(e) => fetchCities(e)}
              />
              <Select
                name="address_city"
                label={getTranslation('cidade')}
                isDisabled={isExterior ? isExterior : loadingCities}
                isLoading={loadingCities}
                options={dataCities}
                placeholder={getTranslation('selecione')}
                onChange={(e: any) => setIbge(e.ibge)}
              />
              <Input
                name="address_latitude"
                label={getTranslation('latitude')}
                disabled={isExterior}
              />
              <Input
                name="address_longitude"
                label={getTranslation('longitude')}
                disabled={isExterior}
              />
            </S.FormRow>
            <Input
              name="address_id_city_ibge"
              hidden
              containerStyle={{ position: 'absolute' }}
            />
            <S.FormRow>
              <ToggleInput
                name="scheduling_required"
                label={getTranslation('necessitaAgendamento')}
              />
            </S.FormRow>
            <S.DeliveryTitle>{getTranslation('infoEntrega')}</S.DeliveryTitle>
            <S.WeekDays>
              <ToggleInput name="monday" label={getTranslation('segunda')}/>
              <ToggleInput name="tuesday" label={getTranslation('terca')} />
              <ToggleInput name="wednesday" label={getTranslation('quarta')}/>
              <ToggleInput name="thursday" label={getTranslation('quinta')}/>
              <ToggleInput name="friday" label={getTranslation('sexta')} />
              <ToggleInput name="saturday" label={getTranslation('sabado')}/>
              <ToggleInput name="sunday" label={getTranslation('domingo')}/>
            </S.WeekDays>
            <S.FormRow>
              <InputMask
                name="receiving_start"
                label={getTranslation('inicioRecebimento')}
                mask="99:99"
              />
              <InputMask
                name="receiving_end"
                label={getTranslation('fimRecebimento')}
                mask="99:99"
              />
            </S.FormRow>
            <S.FormRow>
              <InputMask
                name="meal_start"
                label={getTranslation('inicioRefeicao')}
                mask="99:99"
              />
              <InputMask name="meal_end" label={getTranslation('fimRefeicao')} mask="99:99" />
            </S.FormRow>
            <S.FormRow>
              <Textarea name="observation" label={getTranslation('observacao')} />
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
              {/* <S.Button
                btStyle="danger"
                type="button"
                onClick={() => setModalOpen(true)}
              >
                Remover
              </S.Button> */}
              <S.Button type="submit">
                {loadingUpdateClient ? <S.Loading /> : getTranslation('cadastrar')}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
    </MainContainer>
  );
};
