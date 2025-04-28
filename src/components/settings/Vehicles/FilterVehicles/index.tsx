import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useValidation,useTranslation  } from 'hooks';

import { translations } from './translations';
import * as S from './styles';

import { Modal } from 'components/shared';
import { Select, Input } from 'components/shared/Form';

import {
  ListVehicleTypesActions,
  ListVehicleTypesState,
} from 'store/ducks/settings/vehicle-types';

import {
  ListCompaniesActions,
  ListCompaniesState,
} from 'store/ducks/settings/companies';

interface IFilterProps {
  onFilter: Function;
}

export const FilterVehicles: React.FC<IFilterProps> = ({ onFilter }) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const { getTranslation } = useTranslation(translations);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cleanShow, setCleanShow] = useState<boolean>(false);

  const { data: listVehicleTypesData, loading: listVehicleTypesLoading } =
    useSelector<RootStateOrAny, ListVehicleTypesState>(
      (state) => state.listVehicleTypes
    );

  const { data: listCompaniesData, loading: listCompaniesLoading } =
    useSelector<RootStateOrAny, ListCompaniesState>(
      (state) => state.listCompanies
    );

  const getListVehicleTypes = useCallback(() => {
    dispatch(ListVehicleTypesActions.request({ all: true }));
  }, [dispatch]);

  const getListCompanies = useCallback(() => {
    dispatch(ListCompaniesActions.request({ all: true, type: 'CD' }));
  }, [dispatch]);

  useEffect(() => {
    getListCompanies();
  }, [getListCompanies]);

  useEffect(() => {
    getListVehicleTypes();
  }, [getListVehicleTypes]);

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
    [handleFormErrors, onFilter]
  );

  const handleFilterClean = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue('general_company_id', '');
      formRef.current.setFieldValue('scheduling_vehicle_type_id', '');
      formRef.current.setFieldValue('duration', '');
      formRef.current.setFieldValue('weight', '');
      formRef.current.setFieldValue('pallet', '');

      const clean = {
        general_company_id: '',
        scheduling_vehicle_type_id: '',
        duration: '',
        weight: '',
        pallet: '',
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
              <Select
                name='general_company_id'
                label={getTranslation('centro')}
                options={listCompaniesData}
                isLoading={listCompaniesLoading}
                isDisabled={listCompaniesLoading}
                placeholder={getTranslation('selecione')}
              />
              <Select
                name='scheduling_vehicle_type_id'
                label={getTranslation('veiculo')}
                options={listVehicleTypesData}
                isLoading={listVehicleTypesLoading}
                isDisabled={listVehicleTypesLoading}
                placeholder={getTranslation('selecione')}
              />
              </S.FormRow>
              <S.FormRow>
              <Input name='duration' label={getTranslation('duracao')} />
              <Input name='weight' label={getTranslation('peso')} />
              <Input name='pallet' label={getTranslation('palete')} />
            </S.FormRow>

            <S.ButtonsWrapper>
              <S.Button
                btStyle='cancel'
                onClick={() => setModalOpen(false)}
                type='button'
              >
                {getTranslation('cancelar')}
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
