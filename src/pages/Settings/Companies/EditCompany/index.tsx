import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useValidation,useTranslation  } from 'hooks';
import { translations } from './translations';
import { Company } from 'interfaces/company';

import {
  FetchCompanyState,
  FetchCompanyActions,
  UpdateCompanyActions,
  UpdateCompanyState,
  DeleteCompanyActions,
  DeleteCompanyState,
} from 'store/ducks/settings/companies';
import { ListCitiesActions, ListCitiesState } from 'store/ducks/cities';
import { CepActions, CepState } from 'store/ducks/cep';
import {
  CreateCompanyCarrierActions,
  CreateCompanyCarrierState,
  PaginateCompanyCarriersActions,
  PaginateCompanyCarriersState,
} from "store/ducks/settings/company-carriers";
import { 
  ListCarriersActions, 
  ListCarriersState 
} from 'store/ducks/settings/carriers';

import { Input, Select, InputMask, ToggleInput } from 'components/shared/Form';
import { MainContainer, Modal, Alert } from 'components/shared';
import { statesOptions } from 'utils/data/states';
import { validaCNPJ } from 'utils/formatters';
import { ICitiesOptions } from 'interfaces/city';
import { companyTypes } from 'utils/data/company-types';
import { SchedulingTimeOptions } from 'utils';
import { GridCompanyCarriers } from 'components/settings/Companies';

import * as S from './styles';

interface IParams {
  id: string;
}

export const EditCompany: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const formCarriersRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { data: dataFetchCompany, loading } = useSelector<RootStateOrAny>(
    (state) => state.fetchCompany
  ) as FetchCompanyState;

  const { loading: loadingDeletecompany } = useSelector<RootStateOrAny>(
    (state) => state.deleteCompany
  ) as DeleteCompanyState;

  const { loading: loadingUpdateCompany } = useSelector<RootStateOrAny>(
    (state) => state.updateCompany
  ) as UpdateCompanyState;

  const { data: dataCities, loading: loadingCities } =
    useSelector<RootStateOrAny>((state) => state.listCities) as ListCitiesState;

  const { loading: loadingCep } = useSelector<RootStateOrAny>(
    (state) => state.cep
  ) as CepState;

  const { loading: loadingCreateCompanyCarrier } = useSelector<
    RootStateOrAny, 
    CreateCompanyCarrierState
  >(state => state.createCompanyCarrier);

  const { data: dataListCarriers, loading: loadingListCarriers } = useSelector<
    RootStateOrAny,
    ListCarriersState
  >(state => state.listCarriers);

  const { data: dataCompanyCarriers } = useSelector<
    RootStateOrAny,
    PaginateCompanyCarriersState
  >(state => state.paginateCompanyCarriers);

  const onSuccess = useCallback(() => {
    history.push('/settings/companies');
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          cnpj: Yup.string()
            .test('validaCNPJ', getTranslation('cnpjInvalido'), (value: any) =>
              validaCNPJ(value)
            )
            .required(getTranslation('obrigatorio')),
          code: Yup.string().required(getTranslation('obrigatorio')),
          company_name: Yup.string().required(getTranslation('obrigatorio')),
          trade_name: Yup.string().required(getTranslation('obrigatorio')),
          type: Yup.string().required(getTranslation('obrigatorio')),
          email: Yup.string().email(getTranslation('emailInvalido')),
          address_street: Yup.string().required(getTranslation('obrigatorio')),
          address_number: Yup.string().required(getTranslation('obrigatorio')),
          address_neighborhood: Yup.string().required(getTranslation('obrigatorio')),
          address_zipcode: Yup.string().required(getTranslation('obrigatorio')),
          address_city: Yup.string().required(getTranslation('obrigatorio')),
          address_state: Yup.string().required(getTranslation('obrigatorio')),
          scheduling_starts: Yup.string().required(getTranslation('obrigatorio')),
        });
        
        await schema.validate(data, {
          abortEarly: false,
        });

        data.cnpj = data.cnpj.replace(/[^0-9]/g, '');
        data.phone_number = data.phone_number.replace(/[^0-9]/g, '');
        dispatch(UpdateCompanyActions.request(id, data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, getTranslation, handleFormErrors, id, onSuccess]
  );

  const fetchCities = useCallback(
    (option) => {
      dispatch(ListCitiesActions.request({ state: option.value }));
    },
    [dispatch]
  );

  const getListCompanyCarriers = useCallback(() => {
    dispatch(PaginateCompanyCarriersActions.request({ all: true, company_id: id }));
  }, [dispatch, id]);

  const setIbge = useCallback((ibge) => {
    if (formRef.current)
      return formRef.current.setFieldValue('address_id_city_ibge', ibge);
  }, []);

  const putDataInFields = useCallback((data) => {
    console.log('putDataInFields');
    if (!data && formRef.current) {
      return formRef.current.setFieldError(
        'address_zipcode',
        getTranslation('CEPnaoEncontrado')
      );
    }
    
    const schedulingTimeOption = SchedulingTimeOptions.filter(
      (timeOption) => timeOption.value === data.scheduling_starts
    );

    const stateOption = statesOptions.filter(
      (stateOption) => stateOption.value === data.address_state
    );

    const companyTypeOption = companyTypes.filter(
      (companyType) => companyType.value === data.type
    );


    dispatch(
      ListCitiesActions.request({ state: data.address_state }, (cities: ICitiesOptions[]) => {
        const cityOption = cities.filter(
          (city) => city.ibge === data.address_id_city_ibge
        );
  
        if (cityOption.length > 0) {
          setIbge(cityOption[0].ibge);
  
          if (formRef.current) {
            formRef.current.setFieldValue('address_city', cityOption[0]);
          }
        }
      })
    );

    if (formRef.current) {
      if (companyTypeOption.length > 0) {
        formRef.current.setFieldValue('type', companyTypeOption[0]);
      }
      
      if (schedulingTimeOption.length > 0) {
        formRef.current.setFieldValue('scheduling_starts', schedulingTimeOption[0]);
      }

      if (stateOption.length > 0) {
        formRef.current.setFieldValue('address_street', data.address_street);
        formRef.current.setFieldValue(
          'address_neighborhood',
          data.address_neighborhood
        );
        formRef.current.setFieldValue('address_state', stateOption[0]);
      }
    }
  }, [dispatch, getTranslation, setIbge]);

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

  useEffect(() => {
    getListCompanyCarriers();
  }, [getListCompanyCarriers]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteCompanyActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  const handleSubmitCarrier = useCallback<SubmitHandler>(
    async (data) => {
      formCarriersRef.current?.setErrors({});
      const hasOnList = dataCompanyCarriers.some(
        companyCarrier => companyCarrier.carrier_id === data.carrier_id
      );
      const schema = Yup.object().shape({
        carrier_id: Yup
          .string()
          .required(getTranslation('obrigatorio'))
          .test({
            name: 'carrier_id',
            message: getTranslation('transportadoraAdicionada'),
            test: () => hasOnList === false,
          }),
      });

      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        data.company_id = id;
        dispatch(CreateCompanyCarrierActions.request(data, () => {
          getListCompanyCarriers();
          formCarriersRef.current?.reset();
        }));
      } catch (error) {
        handleFormErrors(error, formCarriersRef);
      }
    },
    [dataCompanyCarriers, dispatch, getListCompanyCarriers, getTranslation, handleFormErrors, id]
  );

  useEffect(() => {
    dispatch(ListCarriersActions.request({ all: true }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (id) {
      dispatch(FetchCompanyActions.request(id, (data: Company) => {
        if (formRef.current) {
          if (!data.phone_number) {
            data.phone_number = '';
          }
          
          formRef.current.setData(data);
          putDataInFields(data);
        }
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover Centro ${dataFetchCompany?.trade_name}`}
          text={getTranslation('removerCentro')}
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction='Remover'
          isLoading={loadingDeletecompany}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')} <span>{getTranslation('editarCentro')}</span>
          {loading && <S.LoadingPage />}
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini btStyle='dark' onClick={() => history.goBack()}>
            <S.IconArrowLeft />
            {getTranslation('voltar')}
          </S.ButtonMini>
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.BoxContainer>
            <S.FormRow>
              <InputMask name='cnpj' label='CNPJ' mask='99.999.999/9999-99' />
              <Input name='company_name' label={getTranslation('razaoSocial')} />
              <Input name='trade_name' label={getTranslation('nomeFantasia')} />
              <Select name='type' label={getTranslation('tipo')} options={companyTypes} />
            </S.FormRow>
            <S.FormRow>
              <Input name='code' label={getTranslation('codigoCentro')} type='number' />
              <Input name='inscricao_estadual' label={getTranslation('inscricaoEstatual')} />
              <InputMask
                name='phone_number'
                label={getTranslation('telefone')}
                mask='(99) 9999-99999'
              />
              <Input name='email' label={getTranslation('email')} />
            </S.FormRow>
            <S.FormRow>
              <InputMask
                name='address_zipcode'
                label={getTranslation('cep')}
                onBlur={(e: any) => fetchCep(e.target.value)}
                isLoading={loadingCep}
                mask='99999-999'
              />
              <Input name='address_street' label={getTranslation('lougradouro')} />
              <Input name='address_number' label={getTranslation('numero')} />
              <Input name='address_neighborhood' label={getTranslation('bairro')}/>
            </S.FormRow>
            <S.FormRow>
              <Select
                name='address_state'
                label={getTranslation('uf')}
                options={statesOptions}
                placeholder={getTranslation('selecione')}
                onChange={(e) => fetchCities(e)}
              />
              <Select
                name='address_city'
                label={getTranslation('cidade')}
                isDisabled={loadingCities}
                isLoading={loadingCities}
                options={dataCities}
                onChange={(e: any) => setIbge(e.ibge)}
              />
              <Input name='address_latitude' label={getTranslation('latitude')} />
              <Input name='address_longitude' label={getTranslation('longitude')}/>
            </S.FormRow>
            <S.FormRow>
              <Input name='cut_hour' label={getTranslation('horaCorte')} type='time' />
              <Input name='cut_hour_full_load' label={getTranslation('horaCorteTotal')} type='time' />
              <Select
                name='scheduling_starts'
                label={getTranslation('inicioAgendamento')}
                options={SchedulingTimeOptions}
              />
              <S.Ghost />
              <S.Ghost />
            </S.FormRow>
            <S.FormRow>
              <ToggleInput name='automatic_routing' label={getTranslation('roterizacao')} />
              <ToggleInput name='picking_manage' label={getTranslation('gerenciaCargas')}/>
            </S.FormRow>
            <Input
              name='address_id_city_ibge'
              hidden
              containerStyle={{ position: 'absolute' }}
            />
          </S.BoxContainer>
          <S.FormFooter>
            <S.FormRow>
              <S.Button
                btStyle='cancel'
                type='button'
                onClick={() => history.goBack()}
              >
                {getTranslation('cancelar')}
              </S.Button>
              {/* <S.Button
                btStyle='danger'
                type='button'
                onClick={() => setModalOpen(true)}
              >
                Remover
              </S.Button> */}
              <S.Button type='submit'>
                {loadingUpdateCompany ? (
              <S.Loading />
                ) : (
                  getTranslation('cadastrar')
                )}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>

        <S.Title>{getTranslation('transportadora', 'titulo')}</S.Title>
        <S.Text>{getTranslation('transportadora', 'subTitulo')}</S.Text>

        <S.BoxContainer>
          <Form ref={formCarriersRef} onSubmit={handleSubmitCarrier}>
            <S.FormRow>
              <Select
                name="carrier_id"
                label={getTranslation('transportadora', 'titulo')}
                options={dataListCarriers}
                placeholder={getTranslation('selecione')}
                isLoading={loadingListCarriers}
                isDisabled={loadingListCarriers}
              />
              <S.ButtonAddWrapper>
                <S.ButtonAdd
                  type="submit"
                >
                  {loadingCreateCompanyCarrier ? <S.LoadingAdd /> : <S.IconPlus />}
                  {getTranslation('adicionar')}
                </S.ButtonAdd>
              </S.ButtonAddWrapper>
            </S.FormRow>
          </Form>
        </S.BoxContainer>

        {dataCompanyCarriers && (
          <GridCompanyCarriers
            companyCarriers={dataCompanyCarriers}
            onDeleteSucess={getListCompanyCarriers}
          />
        )}
      </S.PageContent>
    </MainContainer>
  );
};
