import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useValidation,useTranslation } from 'hooks';
import { translations } from './translations';
import * as S from './styles';

import { Modal} from 'components/shared';
import { Select, Input } from 'components/shared/Form';

import { ListModulesActions, ListModulesState } from 'store/ducks/modules';

interface IFilterProps {
  onFilter: Function;
}

export const FilterAlerts: React.FC<IFilterProps> = ({ onFilter }) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const { getTranslation } = useTranslation(translations);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cleanShow, setCleanShow] = useState<boolean>(false);

  const { data: dataModules, loading: loadingModules } =
    useSelector<RootStateOrAny>(
      (state) => state.listModules
    ) as ListModulesState;

  const getListModules = useCallback(() => {
    dispatch(ListModulesActions.request());
  }, [dispatch]);

  useEffect(() => getListModules(), [getListModules]);

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
      formRef.current.setFieldValue('name', '');
      formRef.current.setFieldValue('description', '');
      formRef.current.setFieldValue('module_id', '');
      const clean = {
        name: '',
        description: '',
        module_id: '',
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
          Limpar filtro
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
              <Input name='name' label={getTranslation('nome')}/>
            </S.FormRow>
            <S.FormRow>
              <Input name='description' label={getTranslation('descricao')}/>
            </S.FormRow>
            <S.FormRow>
              <Select
                name='module_id'
                label={getTranslation('modulos')}
                isLoading={loadingModules}
                isDisabled={loadingModules}
                options={dataModules}
                placeholder={getTranslation('selecione')}
              />

              <S.FormRow></S.FormRow>
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
