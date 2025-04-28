import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import {
  FetchVehicleTypeState,
  FetchVehicleTypeActions,
  UpdateVehicleTypeActions,
  UpdateVehicleTypeState,
  DeleteVehicleTypeActions,
  DeleteVehicleTypeState,
} from "store/ducks/settings/vehicle-types";

import { useValidation, useTranslation } from "hooks";
import { translations } from "./translations";
import * as S from "./styles";
import { MainContainer, Modal, Alert } from "components/shared";
import { Input } from "components/shared/Form";

interface IParams {
  id: string;
}

export const EditVehicleType: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { loading } = useSelector<RootStateOrAny, FetchVehicleTypeState>(
    (state) => state.fetchVehicleType
  );

  const { loading: loadingDeleteVehicleType } = useSelector<
    RootStateOrAny,
    DeleteVehicleTypeState
  >((state) => state.deleteVehicleType);

  const { loading: loadingUpdateVehicleType } = useSelector<
    RootStateOrAny,
    UpdateVehicleTypeState
  >((state) => state.updateVehicleType);

  const onSuccess = useCallback(() => {
    history.push("/settings/vehicle-types");
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(UpdateVehicleTypeActions.request(id, data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, id, onSuccess]
  );

  const onFetchSuccess = useCallback((data) => {
    if (formRef.current) {
      formRef.current.setFieldValue("name", data.name);
    }
  }, []);

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(FetchVehicleTypeActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteVehicleTypeActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover Tipo de veículo`}
          text="Ao remover o Tipo de veículo selecionada todos os agendamentos vinculados, não serão mais exibidas na plataforma. Deseja realmente remover?"
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeleteVehicleType}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation("configuracoes")} <span>{getTranslation("editarTipoVeiculo")}</span>
          {loading && <S.LoadingPage />}
        </h1>
        <S.ButtonMini btStyle="dark" onClick={() => history.goBack()}>
          <S.IconArrowLeft />
          {getTranslation("voltar")}
        </S.ButtonMini>
      </S.PageHeader>
      <S.PageContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.BoxContainer>
            <S.FormRow>
              <Input name="name" label={getTranslation("nome")} />
            </S.FormRow>
          </S.BoxContainer>
          <S.FormFooter>
            <S.FormRow>
              <S.Button
                btStyle="cancel"
                type="button"
                onClick={() => history.goBack()}
              >
                {getTranslation("cancelar")}
              </S.Button>
              {/* <S.Button
                btStyle="danger"
                type="button"
                onClick={() => setModalOpen(true)}
              >
                Remover
              </S.Button> */}
              <S.Button type="submit">
                {loadingUpdateVehicleType ? <S.Loading /> : getTranslation("cadastrar")}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
    </MainContainer>
  );
};
