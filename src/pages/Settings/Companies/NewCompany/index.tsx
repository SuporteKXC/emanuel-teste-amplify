import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useValidation,useTranslation } from 'hooks';
import { translations } from './translations';
import {
  CreateCompanyState,
  CreateCompanyActions,
} from 'store/ducks/settings/companies';
import { CepActions, CepState } from 'store/ducks/cep';
import { ListCitiesActions, ListCitiesState } from 'store/ducks/cities';

import { Input, Select, InputMask, ToggleInput } from 'components/shared/Form';
import { MainContainer } from 'components/shared';
import { validaCNPJ } from 'utils/formatters';
import { companyTypes } from 'utils/data/company-types';
import { statesOptions } from 'utils/data/states';
import { ICitiesOptions } from 'interfaces/city';
import { SchedulingTimeOptions } from 'utils/scheduling-times';
import * as S from './styles';

export const NewCompany: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.createCompany
  ) as CreateCompanyState;

  const { data: dataCities, loading: loadingCities } =
    useSelector<RootStateOrAny>((state) => state.listCities) as ListCitiesState;

  const { loading: loadingCep } = useSelector<RootStateOrAny>(
    (state) => state.cep
  ) as CepState;

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
        dispatch(CreateCompanyActions.request(data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, getTranslation, handleFormErrors, onSuccess]
  );

  const fetchCities = useCallback(
    (option) => {
      dispatch(ListCitiesActions.request({ state: option.value }));
    },
    [dispatch]
  );

  const setIbge = useCallback((ibge) => {
    if (formRef.current)
      return formRef.current.setFieldValue('address_id_city_ibge', ibge);
  }, []);

  const putDataInFields = useCallback(
    (data) => {
      if (!data && formRef.current) {
        return formRef.current.setFieldError(
          'address_zipcode',
          getTranslation('CEPnaoEncontrado')
        );
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
    [dispatch, getTranslation, setIbge]
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

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')}<span>{getTranslation('novoCentro')}</span>
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini btStyle='dark' onClick={() => history.goBack()}>
            <S.IconArrowLeft />
            {getTranslation('voltar')}
          </S.ButtonMini>
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={{picking_manage: true}}>
          <S.BoxContainer>
            <S.FormRow>
              <InputMask name='cnpj' label={getTranslation('cnpj')} mask='99.999.999/9999-99' />
              <Input name='company_name' label={getTranslation('razaoSocial')} />
              <Input name='trade_name' label={getTranslation('nomeFantasia')} />
              <Select name='type' 
                label={getTranslation('tipo')} 
                options={companyTypes} 
                placeholder={getTranslation('selecione')}
              />
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
              <Input name='address_neighborhood' label={getTranslation('bairro')} />
            </S.FormRow>
            <S.FormRow>
              <Select
                name='address_state'
                label={getTranslation('uf')}
                placeholder={getTranslation('selecione')}

                options={statesOptions}
                onChange={(e) => fetchCities(e)}
              />
              <Select
                name='address_city'
                label={getTranslation('cidade')}
                isDisabled={loadingCities}
                isLoading={loadingCities}
                options={dataCities}
                placeholder={getTranslation('selecione')}
                onChange={(e: any) => setIbge(e.ibge)}
              />
              <Input name='address_latitude' label={getTranslation('latitude')}/>
              <Input name='address_longitude' label={getTranslation('longitude')} />
            </S.FormRow>
            <S.FormRow>
              <Input name='cut_hour' label={getTranslation('horaCorte')} type='time' />
              <Input name='cut_hour_full_load' label={getTranslation('horaCorteTotal')} type='time' />
              <Select
                name='scheduling_starts'
                label={getTranslation('inicioAgendamento')}
                options={SchedulingTimeOptions}
                placeholder={getTranslation('selecione')}
              />
              <S.Ghost />
              <S.Ghost />
            </S.FormRow>
            <S.FormRow>
              <ToggleInput name='automatic_routing' label={getTranslation('roterizacao')} />
              <ToggleInput name='picking_manage' label={getTranslation('gerencia')} initialValue={true}/>

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
              <S.Button type='submit'>
                {loading ? (
              <S.Loading />
                ) : (
                  getTranslation('cadastrar')
                )}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
    </MainContainer>
  );
};
