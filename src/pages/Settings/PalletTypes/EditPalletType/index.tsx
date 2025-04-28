import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import {
  FetchPalletTypeState,
  FetchPalletTypeActions,
  UpdatePalletTypeActions,
  UpdatePalletTypeState,
  DeletePalletTypeActions,
  DeletePalletTypeState,
} from "store/ducks/settings/pallet-type";

import { useValidation,useTranslation } from "hooks";
import { translations } from "./translations";

import * as S from "./styles";
import { MainContainer, Modal, Alert } from "components/shared";
import { Input } from "components/shared/Form";

interface IParams {
  id: string;
}

export const EditPalletType: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { data: dataFetchPallet, loading } = useSelector<RootStateOrAny>(
    (state) => state.fetchPalletType
  ) as FetchPalletTypeState;

  const { loading: loadingDeletePallet } = useSelector<RootStateOrAny>(
    (state) => state.deletePalletType
  ) as DeletePalletTypeState;

  const { loading: loadingUpdatePallet } = useSelector<RootStateOrAny>(
    (state) => state.updatePalletType
  ) as UpdatePalletTypeState;

  const onSuccess = useCallback(() => {
    history.push("/settings/pallet-types");
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          description: Yup.string().required("Obrigatório"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(UpdatePalletTypeActions.request(id, data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, id, onSuccess]
  );

  const onFetchSuccess = useCallback((data) => {
    if (formRef.current) {
      if (data.pallet_type) {
          data.pallet_type_id = {
            label: data.pallet_type.description,
            value: data.pallet_type.id,
        };
      }
      formRef.current.setData(data);
    }
  }, []);


  const fetchData = useCallback(() => {
    if (id) {
      dispatch(FetchPalletTypeActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeletePalletTypeActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover o Tipo de Pallet ${dataFetchPallet?.code}`}
          text="Deseja realmente remover esse tipo ?"
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeletePallet}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation("configuracoes")} <span>{getTranslation("editarTipo")}</span>
          {loading && <S.LoadingPage />}
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini btStyle="dark" onClick={() => history.goBack()}>
            <S.IconArrowLeft />
            {getTranslation("voltar")}
          </S.ButtonMini>
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.BoxContainer>
            <S.FormRow>
              <Input name="description" label={getTranslation("descricao")} />
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
              <S.Button
                btStyle="danger"
                type="button"
                onClick={() => setModalOpen(true)}
              >
                {getTranslation("remover")}
              </S.Button>
              <S.Button type="submit">
                {loadingUpdatePallet ? <S.Loading /> : getTranslation("cadastrar")}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
    </MainContainer>
  );
};
