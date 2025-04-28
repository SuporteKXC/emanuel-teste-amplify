import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import {
  FetchBusinessUnitState,
  FetchBusinessUnitActions,
  UpdateBusinessUnitActions,
  UpdateBusinessUnitState,
  DeleteBusinessUnitActions,
  DeleteBusinessUnitState,
} from "store/ducks/settings/business-unit";
import { useValidation,useTranslation } from "hooks";
import { translations } from './translations';

import * as S from "./styles";
import { MainContainer, Modal, Alert } from "components/shared";
import { Input } from "components/shared/Form";


interface IParams {
  id: string;
}

export const EditBusinessUnit: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);
  const { data: dataFetchBusinessUnit, loading } = useSelector<RootStateOrAny>(
    (state) => state.fetchBusinessUnit
  ) as FetchBusinessUnitState;

  const { loading: loadingDeleteBusinessUnit } = useSelector<RootStateOrAny>(
    (state) => state.deleteBusinessUnit
  ) as DeleteBusinessUnitState;

  const { loading: loadingUpdateBusinessUnit } = useSelector<RootStateOrAny>(
    (state) => state.updateBusinessUnit
  ) as UpdateBusinessUnitState;

  const onSuccess = useCallback(() => {
    history.push("/settings/business-units");
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

        dispatch(UpdateBusinessUnitActions.request(id, data, onSuccess));
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
      dispatch(FetchBusinessUnitActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteBusinessUnitActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover Unidade ${dataFetchBusinessUnit?.name}`}
          text={getTranslation('removerUndade')}
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeleteBusinessUnit}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
            {getTranslation('configuracoes')}<span>{getTranslation('editarDivision')}</span>
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
                {loadingUpdateBusinessUnit ? (
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
