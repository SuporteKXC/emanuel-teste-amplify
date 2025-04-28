import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import {
  FetchCarrierState,
  FetchCarrierActions,
  UpdateCarrierActions,
  UpdateCarrierState,
  DeleteCarrierActions,
  DeleteCarrierState,
} from 'store/ducks/settings/carriers';
import { ListCitiesActions, ListCitiesState } from 'store/ducks/cities';
import { CepActions, CepState } from 'store/ducks/cep';
import { useValidation, useTranslation } from 'hooks';
import { translations } from './translations';

import { validaCNPJ } from 'utils/formatters';

import * as S from './styles';
import { MainContainer, Modal, Alert } from 'components/shared';
import { Input, Select, InputMask, ToggleInput } from 'components/shared/Form';

import { statesOptions } from 'utils/data/states';
import { ICitiesOptions } from 'interfaces/city';

interface IParams {
  id: string;
}

export const EditCarrier: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { data: dataFetchCarrier, loading } = useSelector<RootStateOrAny>(
    (state) => state.fetchCarrier
  ) as FetchCarrierState;

  const { loading: loadingDeleteCarrier } = useSelector<RootStateOrAny>(
    (state) => state.deleteCarrier
  ) as DeleteCarrierState;

  const { loading: loadingUpdateCarrier } = useSelector<RootStateOrAny>(
    (state) => state.updateCarrier
  ) as UpdateCarrierState;

  const { data: dataCities, loading: loadingCities } =
    useSelector<RootStateOrAny>((state) => state.listCities) as ListCitiesState;

  const { loading: loadingCep } = useSelector<RootStateOrAny>(
    (state) => state.cep
  ) as CepState;

  const onSuccess = useCallback(() => {
    history.push('/settings/carriers');
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          cnpj: Yup.string()
            .test('validaCNPJ', 'CNPJ Inválido', (value: any) =>
              validaCNPJ(value)
            )
            .required(getTranslation('obrigatorio')),
          company_name: Yup.string().required(getTranslation('obrigatorio')),
          trade_name: Yup.string().required(getTranslation('obrigatorio')),
          carrier_code: Yup.mixed()
            .required(getTranslation('obrigatorio'))
            .test('codeValidation', 'Código inválido', (value: any) =>
              Number.isInteger(Math.abs(Number(value)))
            ),
          email: Yup.array()
            .transform(function (value, originalValue) {
              if (this.isType(value) && value !== null) {
                return value;
              }
              return originalValue ? originalValue.split(/[\s;]+/) : [];
            })
            .of(
              Yup.string().email(
                ({ value }) => `'${value}' não é um e-mail válido`
              )
            )
            .min(1, getTranslation('obrigatorio')),
          address_street: Yup.string().required(getTranslation('obrigatorio')),
          address_number: Yup.string().required(getTranslation('obrigatorio')),
          address_neighborhood: Yup.string().required(
            getTranslation('obrigatorio')
          ),
          address_zipcode: Yup.string().required(getTranslation('obrigatorio')),
          address_city: Yup.string().required(getTranslation('obrigatorio')),
          address_state: Yup.string().required(getTranslation('obrigatorio')),
          frete_weight: Yup.string(),
          safe: Yup.string(),
          pedagio: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        data.cnpj = data.cnpj.replace(/[^0-9]/g, '');
        data.cnpj_root = data.cnpj.replace(/[^0-9]/g, '').slice(0, 8);
        data.phone_number = data.phone_number.replace(/[^0-9]/g, '');
        dispatch(UpdateCarrierActions.request(id, data, onSuccess));
      } catch (error) {
        /* email validation hack */
        if (error instanceof Yup.ValidationError) {
          const indexMailError = error.inner.findIndex((err) =>
            err?.path?.includes('email')
          );
          if (indexMailError !== -1) {
            error.inner[indexMailError].path = 'email';
          }
        }
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
    [dispatch, setIbge]
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
        if (!data.cnpj) {
          data.cnpj = '';
        }
        if (!data.address_zipcode) {
          data.address_zipcode = '';
        }
        formRef.current.setData(data);
        putDataInFields(data);
      }
    },
    [putDataInFields]
  );

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(FetchCarrierActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteCarrierActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover Transportadora ${dataFetchCarrier?.trade_name}`}
          text={getTranslation('removerTransportadora')}
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeleteCarrier}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')}{' '}
          <span>{getTranslation('editarTransportadora')}</span>
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
            <S.FormRow>
              <InputMask
                name="cnpj"
                label={getTranslation('cnpj')}
                mask="99.999.999/9999-99"
              />
              <Input
                name="company_name"
                label={getTranslation('razaoSocial')}
              />
              <Input name="trade_name" label={getTranslation('nomeFantasia')} />
              <Input name="carrier_code" label={getTranslation('codigoSAP')} />
            </S.FormRow>
            <S.FormRow>
              <Input
                name="inscricao_estadual"
                label={getTranslation('inscricaoEstatual')}
              />
              <InputMask
                name="phone_number"
                label={getTranslation('telefone')}
                mask="(99) 9999-99999"
              />
              <Input
                name="email"
                label={getTranslation('emails')}
                placeholder="Utilize ; para separar os e-mails"
              />
            </S.FormRow>
            <S.FormRow>
              <InputMask
                name="address_zipcode"
                label={getTranslation('cep')}
                onBlur={(e: any) => fetchCep(e.target.value)}
                isLoading={loadingCep}
                mask="99999-999"
              />
              <Input
                name="address_street"
                label={getTranslation('lougradouro')}
              />
              <Input name="address_number" label={getTranslation('numero')} />
              <Input
                name="address_neighborhood"
                label={getTranslation('bairro')}
              />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="address_state"
                label={getTranslation('uf')}
                options={statesOptions}
                placeholder={getTranslation('selecione')}
                onChange={(e) => fetchCities(e)}
              />
              <Select
                name="address_city"
                label={getTranslation('cidade')}
                isDisabled={loadingCities}
                isLoading={loadingCities}
                options={dataCities}
                placeholder={getTranslation('selecione')}
                onChange={(e: any) => setIbge(e.ibge)}
              />
              <Input
                name="address_latitude"
                label={getTranslation('latitude')}
              />
              <Input
                name="address_longitude"
                label={getTranslation('longitude')}
              />
            </S.FormRow>
            <S.Separator />
            <S.FormRow>
              <Input name="frete_weight" label={getTranslation('fretePeso')} />
              <Input name="safe" label={getTranslation('seguro')} />
              <Input name="pedagio" label={getTranslation('pedagio')} />
            </S.FormRow>
            <S.FormRow>
              <ToggleInput
                name="picking_manage"
                label={getTranslation('gerencia')}
              />
            </S.FormRow>
            <Input
              name="address_id_city_ibge"
              hidden
              containerStyle={{ position: 'absolute' }}
            />
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
                btStyle='danger'
                type='button'
                onClick={() => setModalOpen(true)}
              >
                Remover
              </S.Button> */}
              <S.Button type="submit">
                {loadingUpdateCarrier ? (
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
