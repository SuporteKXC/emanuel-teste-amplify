import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useValidation,useTranslation } from 'hooks';
import { translations } from './translations';
import * as S from './styles';

import { Modal } from 'components/shared';
import { Select, Input } from 'components/shared/Form';

import {
  ListClientTypesActions,
  ListClientTypesState,
} from 'store/ducks/settings/client-types';

interface IFilterProps {
  onFilter: Function;
}

export const FilterClients: React.FC<IFilterProps> = ({ onFilter }) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const { getTranslation } = useTranslation(translations);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cleanShow, setCleanShow] = useState<boolean>(false);

  const { data: dataClientTypes, loading: loadingClientTypes } =
    useSelector<RootStateOrAny>(
      (state) => state.listClientTypes
    ) as ListClientTypesState;

  const getListClientTypes = useCallback(() => {
    dispatch(ListClientTypesActions.request({ all: true }));
  }, [dispatch]);

  useEffect(() => getListClientTypes(), [getListClientTypes]);
  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        const cnpj = data.cnpj.replace(/\D/g, '');

        onFilter({ ...data, cnpj: cnpj });

        setCleanShow(true);
        setModalOpen(false);
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [onFilter, handleFormErrors]
  );

  const handleFilterClean = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue('client_code', '');
      formRef.current.setFieldValue('company_name', '');
      formRef.current.setFieldValue('cnpj', '');
      formRef.current.setFieldValue('general_client_type_id', '');

      const clean = {
        client_code: '',
        company_name: '',
        cnpj: '',
        general_client_type_id: '',
      };
      onFilter(clean);
    }

    setCleanShow(false);
    setModalOpen(false);
  }, [onFilter]);

  const renderButtonCleanFilter = () => {
    if (cleanShow) {
      return (
        <S.ButtonMini btStyle='dark' onClick={handleFilterClean}>
          {getTranslation('limparFiltro')}
        </S.ButtonMini>
      );
    }
  };

  return (
    <S.Container>
      <Modal isOpen={modalOpen}>
        <S.ModalContainer>
          <S.Header>
            <S.IconFilter />
            <S.Title>{getTranslation('filtrar')}</S.Title>
          </S.Header>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <S.FormRow>
              <Input name='client_code' label={getTranslation('codigo')} />
              <Input name='cnpj' label={getTranslation('cnpj')} />
              <Select
                name='general_client_type_id'
                label={getTranslation('segmentacao')}
                options={dataClientTypes}
                placeholder={getTranslation('selecione')}
                isLoading={loadingClientTypes}
                isDisabled={loadingClientTypes}
              />
            </S.FormRow>

            <S.FormRow>
              <Input name='company_name' label={getTranslation('razaoSocial')} />
            </S.FormRow>

            <S.ButtonsWrapper>
              <S.Button
                btStyle='cancel'
                onClick={() => setModalOpen(false)}
                type='button'
              >
                {getTranslation('fechar')}
              </S.Button>
              <S.Button
                btStyle='danger'
                type='button'
                onClick={handleFilterClean}
              >
                {getTranslation('limparFiltro')}
              </S.Button>
              <S.Button type='submit'>{getTranslation('filtrar')}</S.Button>
            </S.ButtonsWrapper>
          </Form>
        </S.ModalContainer>
      </Modal>

      {renderButtonCleanFilter()}
      <S.ButtonFilter onClick={() => setModalOpen(true)}>
        <S.IconFilter />
      </S.ButtonFilter>
    </S.Container>
  );
};
