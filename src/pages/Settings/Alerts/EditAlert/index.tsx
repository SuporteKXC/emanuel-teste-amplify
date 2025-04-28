import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useTranslation  } from 'hooks';

import { translations } from './translations';

import {
  FetchAlertState,
  FetchAlertActions,
  UpdateAlertActions,
  UpdateAlertState,
  DeleteAlertActions,
  DeleteAlertState,
} from "store/ducks/settings/alerts";
import { useValidation } from "hooks";

import * as S from "./styles";
import { MainContainer, Modal, Alert } from "components/shared";
import { Input } from "components/shared/Form";

import UserAlerts from "../UserAlerts";

interface IParams {
  id: string;
}

export const EditAlert: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { data: dataFetchAlert, loading } = useSelector<RootStateOrAny>(
    (state) => state.fetchAlert
  ) as FetchAlertState;

  const { loading: loadingDeleteAlert } = useSelector<RootStateOrAny>(
    (state) => state.deleteAlert
  ) as DeleteAlertState;

  const { loading: loadingUpdateAlert } = useSelector<RootStateOrAny>(
    (state) => state.updateAlert
  ) as UpdateAlertState;

  const onSuccess = useCallback(() => {
    history.push("/settings/alerts");
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Obrigatório"),
          description: Yup.string().required("Obrigatório"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        data.general_module_id = 1;

        dispatch(UpdateAlertActions.request(id, data, onSuccess));
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
      dispatch(FetchAlertActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteAlertActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover Alerta ${dataFetchAlert?.name}`}
          text= {getTranslation('removerAlerta')}
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeleteAlert}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
            {getTranslation('configuracoes')}<span>{getTranslation('editarAlerta')}</span>
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
              <Input name="name" label={getTranslation('nome')} />
              <Input name="description" label={getTranslation('descricao')} />
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
              <S.Button
                btStyle="danger"
                type="button"
                onClick={() => setModalOpen(true)}
              >
                {getTranslation('remover')}
              </S.Button>
              <S.Button type="submit">
                {loadingUpdateAlert ? (
              <S.Loading />
                ) : (
                  getTranslation('cadastrar')
                )}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
      <UserAlerts />
    </MainContainer>
  );
};
