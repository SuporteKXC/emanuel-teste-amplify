import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useTranslation } from 'hooks';
import { translations } from './translations';

import {
  FetchBusinessState,
  FetchBusinessActions,
  UpdateBusinessActions,
  UpdateBusinessState,
  DeleteBusinessActions,
  DeleteBusinessState,
} from 'store/ducks/settings/business';
import {
  ListBusinessUnitsActions,
  ListBusinessUnitsState,
} from 'store/ducks/settings/business-unit';
import { useValidation } from 'hooks';

import * as S from './styles';
import { MainContainer, Modal, Alert } from 'components/shared';
import { Input, Select } from 'components/shared/Form';

interface IParams {
  id: string;
}

export const EditBusiness: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const { getTranslation } = useTranslation(translations);
  const dispatch = useDispatch();
  const history = useHistory();

  const { data: dataFetchBusiness, loading } = useSelector<RootStateOrAny>(
    (state) => state.fetchBusiness
  ) as FetchBusinessState;

  const { loading: loadingDeleteBusiness } = useSelector<RootStateOrAny>(
    (state) => state.deleteBusiness
  ) as DeleteBusinessState;

  const { loading: loadingUpdateBusiness } = useSelector<RootStateOrAny>(
    (state) => state.updateBusiness
  ) as UpdateBusinessState;

  const { data: dataBusinessUnits, loading: loadingBusinessUnits } =
    useSelector<RootStateOrAny>(
      (state) => state.listBusinessUnits
    ) as ListBusinessUnitsState;

  const onSuccess = useCallback(() => {
    history.push('/settings/business');
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          general_business_line_unit_id: Yup.number().required('Obrigatório'),
          activity_division: Yup.string().required('Obrigatório'),
          description: Yup.string().required('Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(UpdateBusinessActions.request(id, data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, id, onSuccess]
  );

  const onFetchSuccess = useCallback((data) => {
    if (formRef.current) {
      data.general_business_line_unit_id = {
        label: data.unit.name,
        value: data.unit.id,
      };
      formRef.current.setData(data);
    }
  }, []);

  const fetchBusinessUnits = useCallback(() => {
    dispatch(ListBusinessUnitsActions.request({ all: true }));
  }, [dispatch]);

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(FetchBusinessActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteBusinessActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  useEffect(() => {
    fetchBusinessUnits();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover Segmento ${dataFetchBusiness?.trade_name}`}
          text={getTranslation('linhaDenegocio')}
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction='Remover'
          isLoading={loadingDeleteBusiness}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')}<span>{getTranslation('editarLinha')}</span>
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
              <Select
                name='general_business_line_unit_id'
                label={getTranslation('unidade')}
                disabled={loadingBusinessUnits}
                isLoading={loadingBusinessUnits}
                options={dataBusinessUnits}
              />
            </S.FormRow>
            <S.FormRow>
              <Input
                name='activity_division'
                label={getTranslation('setorAtividade')}
              />
            </S.FormRow>
            <S.FormRow>
              <Input name='description' label={getTranslation('descricao')}/>
            </S.FormRow>
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
              <S.Button
                btStyle='danger'
                type='button'
                onClick={() => setModalOpen(true)}
              >
                {getTranslation('remover')}
              </S.Button>
              <S.Button type='submit'>
                {loadingUpdateBusiness ? (
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
