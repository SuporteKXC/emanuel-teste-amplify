import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import {
  FetchProductTypeState,
  FetchProductTypeActions,
  UpdateProductTypeActions,
  UpdateProductTypeState,
  DeleteProductTypeActions,
  DeleteProductTypeState,
} from 'store/ducks/settings/product-type';

import { useValidation } from 'hooks';

import * as S from './styles';
import { useTranslation } from "hooks";
import { translations } from "./translations";
import { MainContainer, Modal, Alert } from 'components/shared';
import { Input } from 'components/shared/Form';
import { ProductExceptions } from '../ProductException';

interface IParams {
  id: string;
}

export const EditProductType: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);


  const { data: dataFetchProduct, loading } = useSelector<RootStateOrAny>(
    (state) => state.fetchProductType
  ) as FetchProductTypeState;

  const { loading: loadingDeleteProduct } = useSelector<RootStateOrAny>(
    (state) => state.deleteProductType
  ) as DeleteProductTypeState;

  const { loading: loadingUpdateProduct } = useSelector<RootStateOrAny>(
    (state) => state.updateProductType
  ) as UpdateProductTypeState;

  const onSuccess = useCallback(() => {
    history.push('/settings/product-types');
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          description: Yup.string().required(getTranslation('obrigatorio')),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(UpdateProductTypeActions.request(id, data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, getTranslation, handleFormErrors, id, onSuccess]
  );

  const onFetchSuccess = useCallback((data) => {
    if (formRef.current) {
      if (data.product_type) {
        data.product_type_id = {
          label: data.product_type.description,
          value: data.product_type.id,
        };
      }
      formRef.current.setData(data);
    }
  }, []);

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(FetchProductTypeActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteProductTypeActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return (
    <MainContainer>
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover o Tipo de Produto ${dataFetchProduct?.code}`}
          text="Deseja realmente remover esse tipo ?"
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeleteProduct}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')}<span>{getTranslation('editarProduto')}</span>
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
              {/* <S.Button
                btStyle="danger"
                type="button"
                onClick={() => setModalOpen(true)}
              >
                Remover
              </S.Button> */}
              <S.Button type="submit">
                {loadingUpdateProduct ? <S.Loading /> : getTranslation('cadastrar')}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
      <ProductExceptions />
    </MainContainer>
  );
};
