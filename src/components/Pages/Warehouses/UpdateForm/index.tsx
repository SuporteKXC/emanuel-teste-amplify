import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import type { Warehouse } from 'contracts/Warehouses';
import type { SelectOption, CompanyDocumentType } from 'contracts/Common';
import type { RootState, AppDispatch } from 'store';
import { FORM_BACK_ACTION, SelectOptions } from 'constants/Common';
import {
  FetchWarehouseActions as FetchActions,
  UpdateWarehouseActions as UpdateActions,
} from 'store/ducks/warehouses';
import { Formatter } from 'utils';
import { useAddressLookup, useValidation } from 'hooks';
import { UpdateWarehouseValidator } from 'validators/Warehouses';
import { Input, Select, MaskedInput } from 'components/Shared';
import * as S from './styles';

interface Props {
  warehouseId: string | number;
  onUpdate?: () => void;
}

export const WarehouseUpdateForm: React.FC<Props> = ({
  warehouseId,
  onUpdate,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const [selectedType, setSelectedType] = useState<CompanyDocumentType>('cnpj');
  const { onZipcodeChange, fetchingAddress } = useAddressLookup(formRef);

  const { data: warehouse } = useSelector(
    (state: RootState) => state.fetchWarehouse
  );

  const { loading: updatingWarehouse, validationErrors } = useSelector(
    (state: RootState) => state.updateWarehouse
  );

  const documentLabel = useMemo(() => {
    if (selectedType === 'cnpj') return 'CNPJ';
    if (selectedType === 'cpf') return 'CPF';
    if (selectedType === 'other') return 'Documento';
  }, [selectedType]);

  const documentMask = useMemo(() => {
    if (selectedType === 'cnpj') return '99.999.999/9999-99';
    if (selectedType === 'cpf') return '999.999.999-99';
    return [];
  }, [selectedType]);

  const fetchWarehouse = useCallback((): void => {
    dispatch(FetchActions.request(warehouseId));
  }, [dispatch, warehouseId]);

  const onWarehouseLoad = useCallback((): void => {
    if (!warehouse) return;
    const { documentType, document } = warehouse;

    const autoSet: Array<keyof Warehouse> = [
      'tradeName',
      'addressStreet',
      'addressNumber',
      'addressComplement',
      'addressNeighborhood',
      'addressCity',
      'addressState',
      'addressCountry',
      'addressZipcode',
      'addressLatitude',
      'addressLongitude',
    ];

    for (const [field, value] of Object.entries(warehouse)) {
      if (autoSet.includes(field as keyof Warehouse)) {
        formRef.current?.setFieldValue(field, value);
      }
    }

    // manually set fields

    const typeOption = SelectOptions.DOCUMENT_TYPES.find(
      (o) => o.value === documentType
    );

    if (typeOption) {
      formRef.current?.setFieldValue('documentType', typeOption);
    }

    setSelectedType(documentType);
    formRef.current?.setFieldValue(
      'document',
      Formatter.document(document, documentType)
    );
  }, [warehouse]);

  const onTypeChange = useCallback((option: SelectOption | null): void => {
    if (!option) return;
    setSelectedType(option.value as CompanyDocumentType);
  }, []);

  const onSuccess = useCallback((): void => {
    formRef?.current?.reset();
    onUpdate && onUpdate();
  }, [onUpdate]);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef?.current?.setErrors({});

        const { schema } = new UpdateWarehouseValidator({ selectedType });

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(UpdateActions.request(warehouseId, validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [warehouseId, dispatch, handleFormErrors, onSuccess, selectedType]
  );

  useEffect(() => {
    fetchWarehouse();
  }, [fetchWarehouse]);

  useEffect(() => {
    onWarehouseLoad();
  }, [onWarehouseLoad]);

  useEffect(() => {
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    return () => {
      dispatch(FetchActions.reset());
      dispatch(UpdateActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit}>
        <S.FormRow>
          <Select
            name="documentType"
            label="Tipo de documento"
            options={SelectOptions.DOCUMENT_TYPES}
            onChange={onTypeChange}
          />
          <Input
            name="tradeName"
            label={selectedType === 'cnpj' ? 'Nome fantasia' : 'Nome completo'}
          />
          {!!warehouse?.documentType && (
            <React.Fragment>
              {(['cnpj', 'cpf'].includes(warehouse.documentType) && (
                <MaskedInput
                  name="document"
                  label={documentLabel}
                  mask={documentMask}
                />
              )) || <Input name="document" label={documentLabel} />}
            </React.Fragment>
          )}
        </S.FormRow>

        <S.FormRow>
          <Input
            name="addressZipcode"
            label="Código postal"
            onChange={onZipcodeChange}
            isLoading={fetchingAddress}
          />
          <Input name="addressStreet" label="Logradouro" />
          <Input name="addressNumber" label="Número" />
        </S.FormRow>

        <S.FormRow>
          <Input name="addressComplement" label="Complemento" />
          <Input name="addressNeighborhood" label="Bairro" />
          <Input name="addressCity" label="Cidade" />
        </S.FormRow>

        <S.FormRow>
          <Input name="addressState" label="Estado" />
          <Input name="addressCountry" label="País" />
          <Input name="addressLatitude" label="Latitude" />
          <Input name="addressLongitude" label="Longitude" />
        </S.FormRow>

        <S.FormActions>
          <S.LinkButton mood="light" to="/configuracoes/armazens">
            {FORM_BACK_ACTION}
          </S.LinkButton>
          <S.Button type="submit">
            {updatingWarehouse ? <S.ActivityIndicator /> : 'Salvar'}
          </S.Button>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};
