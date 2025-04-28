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
  ListBusinessUnitsActions,
  ListBusinessUnitsState,
} from 'store/ducks/settings/business-unit';

interface IFilterProps {
  onFilter: Function;
}

export const FilterBusiness: React.FC<IFilterProps> = ({ onFilter }) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cleanShow, setCleanShow] = useState<boolean>(false);
  const { getTranslation } = useTranslation(translations);
  const { data: dataBusinessUnits, loading: loadingBusinessUnits } =
    useSelector<RootStateOrAny>(
      (state) => state.listBusinessUnits
    ) as ListBusinessUnitsState;

  const fetchBusinessUnits = useCallback(() => {
    dispatch(ListBusinessUnitsActions.request({ all: true }));
  }, [dispatch]);

  useEffect(() => fetchBusinessUnits(), [fetchBusinessUnits]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        onFilter(data);

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
      formRef.current.setFieldValue('activity_division', '');
      formRef.current.setFieldValue('description', '');
      formRef.current.setFieldValue('module_id', '');

      onFilter({
        activity_division: '',
        description: '',
        general_business_line_unit_id: '',
      });
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
              <Select
                name='general_business_line_unit_id'
                label={getTranslation('unidade')}
                isLoading={loadingBusinessUnits}
                isDisabled={loadingBusinessUnits}
                options={dataBusinessUnits}
                placeholder={getTranslation('selecione')}
              />

              <S.FormRow></S.FormRow>
            </S.FormRow>

            <S.FormRow>
              <Input
                name='activity_division'
                label={getTranslation('setor')}
              />
            </S.FormRow>
            <S.FormRow>
              <Input name='description' label={getTranslation('descricao')} />
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
