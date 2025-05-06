import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Input, MaskedInput, Select, ImgCropper } from 'components/Shared';
import { FORM_BACK_ACTION, SelectOptions } from 'constants/Common';
import type { CompanyDocumentType, SelectOption } from 'contracts/Common';
import type { Company } from 'contracts/Companies';
import { useAddressLookup, useValidation } from 'hooks';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import {
  FetchCompanyActions as FetchActions,
  UpdateCompanyActions as UpdateActions,
} from 'store/ducks/companies';
import { Formatter } from 'utils';
import { UpdateCompanyValidator } from 'validators/Companies';
import * as S from './styles';

interface Props {
  companyId: string | number;
  onUpdate?: () => void;
}

export const CompanyUpdateForm: React.FC<Props> = ({ companyId, onUpdate }) => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const [selectedType, setSelectedType] = useState<CompanyDocumentType>('cnpj');
  const { onZipcodeChange, fetchingAddress } = useAddressLookup(formRef);
  const [logoFile, setLogoFile] = useState<File | undefined>();

  const { data: company } = useSelector(
    (state: RootState) => state.fetchCompany
  );

  const { loading: updatingCompany, validationErrors } = useSelector(
    (state: RootState) => state.updateCompany
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

  const fetchCompany = useCallback((): void => {
    dispatch(FetchActions.request(companyId));
  }, [dispatch, companyId]);

  const onCompanyLoad = useCallback((): void => {
    if (!company) return;
    const { documentType, document } = company;

    const autoSet: Array<keyof Company> = [
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
      'email',
    ];

    for (const [field, value] of Object.entries(company)) {
      if (autoSet.includes(field as keyof Company)) {
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
  }, [company]);

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
        Object.assign(data, { logoFile });
        const { schema } = new UpdateCompanyValidator({ selectedType });

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(UpdateActions.request(companyId, validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [companyId, dispatch, handleFormErrors, onSuccess, selectedType, logoFile]
  );

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  useEffect(() => {
    onCompanyLoad();
  }, [onCompanyLoad]);

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
          {!!company?.documentType && (
            <React.Fragment>
              {(['cnpj', 'cpf'].includes(company.documentType as string) && (
                <MaskedInput
                  name="document"
                  label={documentLabel}
                  mask={documentMask}
                />
              )) || <Input name="document" label={documentLabel} />}
            </React.Fragment>
          )}
          <Input name="email" label="E-mail" />
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
          <S.LinkButton mood="light" to="/configuracoes/clientes">
            {FORM_BACK_ACTION}
          </S.LinkButton>
          <S.Button type="submit">
            {updatingCompany ? <S.ActivityIndicator /> : 'Salvar'}
          </S.Button>
        </S.FormActions>
      </Form>
      <ImgCropper
        label="Logo do cliente"
        helpText="Uma imagem de ao menos 320 x 320px"
        onChange={(file) => setLogoFile(file)}
        preview={company?.companyFile?.filePath}
      />
    </S.Container>
  );
};
