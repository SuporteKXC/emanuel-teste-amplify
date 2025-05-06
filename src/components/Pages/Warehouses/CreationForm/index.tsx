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
import type { SelectOption, CompanyDocumentType } from 'contracts/Common';
import type { RootState, AppDispatch } from 'store';
import { FORM_BACK_ACTION, SelectOptions } from 'constants/Common';
import { CreateWarehouseActions as CreateActions } from 'store/ducks/warehouses';
import { useAddressLookup, useValidation } from 'hooks';
import { CreateWarehouseValidator } from 'validators/Warehouses';
import { Input, Select, MaskedInput } from 'components/Shared';
import * as S from './styles';

interface Props {
  onCreate?: () => void;
}

export const WarehouseCreationForm: React.FC<Props> = ({ onCreate }) => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const [selectedType, setSelectedType] = useState<CompanyDocumentType>('cnpj');
  const { onZipcodeChange, fetchingAddress } = useAddressLookup(formRef);

  const { loading: creatingWarehouse, validationErrors } = useSelector(
    (state: RootState) => state.createWarehouse
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

  const onTypeChange = useCallback((option: SelectOption | null): void => {
    if (!option) return;
    setSelectedType(option.value as CompanyDocumentType);
  }, []);

  const onSuccess = useCallback((): void => {
    formRef?.current?.reset();
    onCreate && onCreate();
  }, [onCreate]);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef?.current?.setErrors({});

        const { schema } = new CreateWarehouseValidator({ selectedType });

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(CreateActions.request(validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, onSuccess, selectedType]
  );

  useEffect(() => {
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    return () => {
      dispatch(CreateActions.reset());
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
            defaultValue={SelectOptions.DOCUMENT_TYPES[0]}
            onChange={onTypeChange}
          />
          <Input
            name="tradeName"
            label={selectedType === 'cnpj' ? 'Nome fantasia' : 'Nome completo'}
          />
          <React.Fragment>
            {(['cnpj', 'cpf'].includes(selectedType as string) && (
              <MaskedInput
                name="document"
                label={documentLabel}
                mask={documentMask}
              />
            )) || <Input name="document" label={documentLabel} />}
          </React.Fragment>
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
            {creatingWarehouse ? <S.ActivityIndicator /> : 'Salvar'}
          </S.Button>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};
