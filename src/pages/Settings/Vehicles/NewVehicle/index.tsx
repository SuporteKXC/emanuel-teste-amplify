import React, { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useTranslation } from "hooks";
import { translations } from "./translations";

import {
  CreateVehicleState,
  CreateVehicleActions,
} from "store/ducks/settings/vehicles";
import {
  ListVehicleTypesActions,
  ListVehicleTypesState,
} from "store/ducks/settings/vehicle-types";
import {
  ListCompaniesActions,
  ListCompaniesState,
} from "store/ducks/settings/companies";

import { useValidation } from "hooks";

import * as S from "./styles";
import { MainContainer } from "components/shared";
import { Input, Select } from "components/shared/Form";

export const NewVehicle: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { loading } = useSelector<RootStateOrAny, CreateVehicleState>(
    (state) => state.createVehicle
  );

  const { data: listVehicleTypesData, loading: listVehicleTypesLoading } =
    useSelector<RootStateOrAny, ListVehicleTypesState>(
      (state) => state.listVehicleTypes
    );

  const { data: listCompaniesData, loading: listCompaniesLoading } =
    useSelector<RootStateOrAny, ListCompaniesState>(
      (state) => state.listCompanies
    );

  const onSuccess = useCallback(() => {
    history.push("/settings/vehicles");
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          general_company_id: Yup.string().required(getTranslation('obrigatorio')),
          scheduling_vehicle_type_id: Yup.string().required(getTranslation('obrigatorio')),
          duration: Yup.string().required(getTranslation('obrigatorio')),
          weight: Yup.string().required(getTranslation('obrigatorio')),
          pallet: Yup.string().required(getTranslation('obrigatorio')),
          distance_between_delivery: Yup.string().required(getTranslation('obrigatorio')),
          max_distance: Yup.string().required(getTranslation('obrigatorio')),
          max_delivery: Yup.string().required(getTranslation('obrigatorio')),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(CreateVehicleActions.request(data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, getTranslation, handleFormErrors, onSuccess]
  );

  const getListVehicleTypes = useCallback(() => {
    dispatch(ListVehicleTypesActions.request({ all: true }));
  }, [dispatch]);

  const getListCompanies = useCallback(() => {
    dispatch(ListCompaniesActions.request({ all: true, type: "CD" }));
  }, [dispatch]);

  useEffect(() => {
    getListCompanies();
  }, [getListCompanies]);

  useEffect(() => {
    getListVehicleTypes();
  }, [getListVehicleTypes]);

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')} <span>{getTranslation('novoVeiculo')}</span>
        </h1>
        <S.ButtonMini btStyle="dark" onClick={() => history.goBack()}>
          <S.IconArrowLeft />
          {getTranslation('voltar')}
        </S.ButtonMini>
      </S.PageHeader>
      <S.PageContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.BoxContainer>
            <S.FormRow>
              <Select
                name="general_company_id"
                label={getTranslation('centro')}
                options={listCompaniesData}
                isLoading={listCompaniesLoading}
                isDisabled={listCompaniesLoading}
                placeholder={getTranslation('selecione')}
              />
              <Select
                name="scheduling_vehicle_type_id"
                label={getTranslation('veiculo')}
                options={listVehicleTypesData}
                isLoading={listVehicleTypesLoading}
                isDisabled={listVehicleTypesLoading}
                placeholder={getTranslation('selecione')}
              />
              <Input name="duration" label={getTranslation('duracao')} />
              <Input name="weight" label={getTranslation('peso')} />
              <Input name="pallet" label={getTranslation('palete')} />
            </S.FormRow>
            <S.FormRow>
              <Input type="number" min="0" name="distance_between_delivery" label={getTranslation('distKM')} />
              <Input type="number" min="0" name="max_distance" label={getTranslation('distMaxima')} />
              <Input type="number" min="0" name="max_delivery" label={getTranslation('maximoEntrega')} />
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
