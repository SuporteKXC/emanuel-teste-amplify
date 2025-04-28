import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import {
  FetchClientTypeState,
  FetchClientTypeActions,
  UpdateClientTypeActions,
  UpdateClientTypeState,
  DeleteClientTypeActions,
  DeleteClientTypeState,
} from "store/ducks/settings/client-types";

import { useValidation } from "hooks";

import * as S from "./styles";
import { MainContainer, Modal, Alert } from "components/shared";
import { Input } from "components/shared/Form";
import { useTranslation } from "hooks";
import { translations } from "./translations";
interface IParams {
  id: string;
}

export const EditClientType: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { data: dataFetchClientType, loading } = useSelector<RootStateOrAny>(
    (state) => state.fetchClientType
  ) as FetchClientTypeState;

  const { loading: loadingDeleteClientType } = useSelector<RootStateOrAny>(
    (state) => state.deleteClientType
  ) as DeleteClientTypeState;

  const { loading: loadingUpdateClientType } = useSelector<RootStateOrAny>(
    (state) => state.updateClientType
  ) as UpdateClientTypeState;

  const onSuccess = useCallback(() => {
    history.push("/settings/client-types");
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

        dispatch(UpdateClientTypeActions.request(id, data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, id, onSuccess]
  );

  const onFetchSuccess = useCallback((data) => {
    if (formRef.current) {
      formRef.current.setData(data);
    }
  }, []);

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(FetchClientTypeActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteClientTypeActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover customer segmentation ${dataFetchClientType?.trade_name}`}
          text="Ao remover a customer segmentation selecionado todas as Notas ficiais vinculadas, não serão mais exibidas na plataforma. Deseja realmente remover?"
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeleteClientType}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
            {getTranslation('configuracoes')} <span>{getTranslation('editarCustumer')}</span>
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
              <Input name="name" label={getTranslation('nomeCustomer')} />
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
                {loadingUpdateClientType ? <S.Loading /> : getTranslation('cadastrar')}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
    </MainContainer>
  );
};
