import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useValidation,useTranslation } from 'hooks';
import { translations } from './translations';
import * as S from './styles';

import { Modal } from 'components/shared';
import { Select, Input } from 'components/shared/Form';

import { statesOptions } from 'utils/data/states';
import { ListCitiesActions, ListCitiesState } from 'store/ducks/cities';

interface IFilterProps {
  onFilter: Function;
}

export const FilterCarriers: React.FC<IFilterProps> = ({ onFilter }) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const { getTranslation } = useTranslation(translations);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cleanShow, setCleanShow] = useState<boolean>(false);

  const { data: dataCities} =
    useSelector<RootStateOrAny>((state) => state.listCities) as ListCitiesState;

  const fetchOrigins = useCallback(
    (option) => {
      dispatch(ListCitiesActions.request({ state: option.value }));
    },
    [dispatch]
  );

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
      formRef.current.setFieldValue('carrier_code', '');
      formRef.current.setFieldValue('trade_name', '');
      formRef.current.setFieldValue('cnpj', '');
      formRef.current.setFieldValue('address_state', '');
      formRef.current.setFieldValue('address_city', '');

      const clean = {
        carrier_code: '',
        trade_name: '',
        cnpj: '',
        address_state: '',
        address_city: '',
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
              <S.FormRow>
                <Input name='carrier_code' label={getTranslation('codigo')} />
                <Input name='cnpj' label={getTranslation('cnpj')} />
              </S.FormRow>
            </S.FormRow>

            <S.FormRow>
              <Select
                name='address_state'
                label={getTranslation('uf')}
                options={statesOptions}
                placeholder={getTranslation('selecione')}
                onChange={(e) => fetchOrigins(e)}
              />
              <Select
                name='address_city'
                label={getTranslation('cidade')}
                placeholder={getTranslation('selecione')}
                isDisabled={!dataCities}
                options={dataCities}
              />
            </S.FormRow>

            <S.FormRow>
              <Input name='trade_name' label={getTranslation('nomeFantasia')} />
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
