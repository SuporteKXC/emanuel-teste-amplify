import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import {
  FetchVehicleState,
  FetchVehicleActions,
  UpdateVehicleActions,
  UpdateVehicleState,
  DeleteVehicleActions,
  DeleteVehicleState,
} from "store/ducks/settings/vehicles";
import {
  ListVehicleTypesActions,
  ListVehicleTypesState,
} from "store/ducks/settings/vehicle-types";
import {
  ListCompaniesActions,
  ListCompaniesState,
} from "store/ducks/settings/companies";

import { useValidation, useTranslation } from "hooks";
import { translations } from "./translations";

import * as S from "./styles";
import { MainContainer, Modal, Alert } from "components/shared";
import { Input, Select } from "components/shared/Form";

interface IParams {
  id: string;
}

export const EditVehicle: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);


  const { loading } = useSelector<RootStateOrAny, FetchVehicleState>(
    (state) => state.fetchVehicle
  );

  const { loading: loadingDeleteVehicle } = useSelector<
    RootStateOrAny,
    DeleteVehicleState
  >((state) => state.deleteVehicle);

  const { loading: loadingUpdateVehicle } = useSelector<
    RootStateOrAny,
    UpdateVehicleState
  >((state) => state.updateVehicle);

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
          general_company_id: Yup.string().required("Obrigatório"),
          scheduling_vehicle_type_id: Yup.string().required("Obrigatório"),
          duration: Yup.string().required("Obrigatório"),
          weight: Yup.string().required("Obrigatório"),
          pallet: Yup.string().required("Obrigatório"),
          distance_between_delivery: Yup.string().required("Obrigatório"),
          max_distance: Yup.string().required("Obrigatório"),
          max_delivery: Yup.string().required("Obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(UpdateVehicleActions.request(id, data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, id, onSuccess]
  );

  const putDataInSelect = useCallback(
    (data) => {
      if (formRef.current) {
        if (listVehicleTypesData) {
          const vehicleTypeOption = listVehicleTypesData.filter(
            (vehicleType) =>
              vehicleType.value === data.scheduling_vehicle_type_id
          );
          formRef.current.setFieldValue(
            "scheduling_vehicle_type_id",
            vehicleTypeOption[0]
          );
        }
        if (listCompaniesData) {
          const companyOption = listCompaniesData.filter(
            (company: any) => company.value === data.general_company_id
          );
          formRef.current.setFieldValue("general_company_id", companyOption[0]);
        }
      }
    },
    [listCompaniesData, listVehicleTypesData]
  );

  const onFetchSuccess = useCallback(
    (data) => {
      if (formRef.current) {
        formRef.current.setData(data);
        putDataInSelect(data);
      }
    },
    [putDataInSelect]
  );

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(FetchVehicleActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteVehicleActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover Veículo`}
          text="Ao remover o veículo selecionado todos os agendamentos vinculados, não serão mais exibidas na plataforma. Deseja realmente remover?"
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeleteVehicle}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')} <span>{getTranslation('editarTipoVeiculo')}</span>
          {loading && <S.LoadingPage />}
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
              />
              <Select
                name="scheduling_vehicle_type_id"
                label={getTranslation('veiculo')}
                options={listVehicleTypesData}
                isLoading={listVehicleTypesLoading}
                isDisabled={listVehicleTypesLoading}
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
              {/* <S.Button
                btStyle="danger"
                type="button"
                onClick={() => setModalOpen(true)}
              >
                Remover
              </S.Button> */}
              <S.Button type="submit">
                {loadingUpdateVehicle ? <S.Loading /> : getTranslation('cadastrar')}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
    </MainContainer>
  );
};
