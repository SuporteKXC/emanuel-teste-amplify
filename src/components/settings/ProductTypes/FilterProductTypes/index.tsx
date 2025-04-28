import React, { useState, useRef, useCallback } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useValidation,useTranslation } from 'hooks';

import { translations } from './translations';

import * as S from './styles';

import { Modal } from 'components/shared';
import { Input } from 'components/shared/Form';

interface IFilterProps {
  onFilter: Function;
}

export const FilterProductTypes: React.FC<IFilterProps> = ({ onFilter }) => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const { getTranslation } = useTranslation(translations);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cleanShow, setCleanShow] = useState<boolean>(false);

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
      formRef.current.setFieldValue('code', '');
      formRef.current.setFieldValue('description', '');
      formRef.current.setFieldValue('business_line_id', '');

      const clean = { code: '', description: '', business_line_id: '' };
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
