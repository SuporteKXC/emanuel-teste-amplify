import type { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  FormPageHeader,
  HiddenInput,
  Input,
  MaskedInput,
  Select,
  ToggleInput,
} from 'components/Shared';
import { FORM_BACK_ACTION } from 'constants/Common';
import { SelectOption, WithAddress } from 'contracts/Common';
import {
  useAuth,
  useStockRelatedCompanies,
  useStockRelatedWarehouses,
  useValidation,
} from 'hooks';
import { useVehicleTypes } from 'hooks/selectors/vehicleTypes';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'services';
import type { AppDispatch, RootState } from 'store';
import { CreateStockOrderActions as MainActions } from 'store/ducks/stockOrders';
import { CreateOrderValidator } from 'validators/StockOrders';
import OrderItems, { Ref as OrderItemsRef } from './OrderItems';
import OrderEmails, { Ref as OrderEmailRef } from './OrderEmails';
import * as S from './styles';

interface GereralState {
  companyId?: number | string;
  warehouseId?: number | string;
}

const autoSet = [
  'addressStreet',
  'addressNumber',
  'addressComplement',
  'addressNeighborhood',
  'addressCity',
  'addressState',
  'addressZipcode',
  'addressCountry',
  'addressLatitude',
  'addressLongitude',
  'ibge',
];

export const StockOrderCreationForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const orderItemsRef = useRef<OrderItemsRef>(null);
  const orderEmailRef = useRef<OrderEmailRef>(null);

  const [generalState, setGeneralState] = useState<GereralState>({});
  const [isDriver, setIsDriver] = useState<boolean>(false);
  const [addObs, setAddObs] = useState<boolean>(false);

  const { profile, userBelongsToAnyOf } = useAuth();
  const { loading: creatingOrder, validationErrors } = useSelector(
    (state: RootState) => state.createStockOrder
  );
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { companies, companyOptions, fetchCompanies, loadingCompanies } =
    useStockRelatedCompanies();
  const { warehouseOptions, fetchWarehouses, loadingWarehouses } =
    useStockRelatedWarehouses();
  const { vehicleTypesOptions, fetchVehicleTypes, loadingVehicleTypes } =
    useVehicleTypes();

  const isWarehouseMember = useMemo(
    () => userBelongsToAnyOf('warehouseMember'),
    [userBelongsToAnyOf]
  );
  const isCompanyMember = useMemo(
    () => userBelongsToAnyOf('companyMember'),
    [userBelongsToAnyOf]
  );
  const isAdmin = useMemo(
    () => userBelongsToAnyOf('admin'),
    [userBelongsToAnyOf]
  );

  const chosenWarehouses = useMemo(() => {
    if (profile?.warehouses?.length) {
      const chosens = warehouseOptions.filter(({ value }) =>
        profile?.warehouses?.map(({ id }) => id).includes(Number(value))
      );
      if (chosens.length) {
        formRef.current?.setFieldValue('warehouseId', chosens[0]);
        setGeneralState((state) => ({
          ...state,
          warehouseId: chosens[0].value,
        }));
        return chosens;
      } else {
        return;
      }
    }
    return warehouseOptions;
  }, [profile, warehouseOptions, formRef]);

  const chosenCompany = useMemo(() => {
    if (profile?.company) {
      const companyOption = companyOptions.find(
        (o) => o.value === profile.company?.id
      );
      if (companyOption) {
        setGeneralState((state) => ({
          ...state,
          companyId: companyOption.value,
        }));
        formRef.current?.setFieldValue('companyId', companyOption);
      }
    }
    return companyOptions;
  }, [profile, companyOptions, formRef]);

  const fetchAll = useCallback((): void => {
    if (!profile) return;
    const { warehouses, company } = profile;

    if (company) {
      fetchWarehouses({ companyId: company.id });
    } else {
      fetchWarehouses();
    }

    if (warehouses?.length) {
      fetchCompanies({ warehouseId: warehouses[0]?.id });
    } else {
      fetchCompanies();
    }
  }, [profile]);

  const onCompanyChange = useCallback(
    (option: SelectOption | null): void => {
      if (option) {
        setGeneralState((state) => ({ ...state, companyId: option?.value }));
        if (!isWarehouseMember) formRef.current?.clearField('warehouseId');
        for (const [field, value] of Object.entries(option)) {
          if (autoSet.includes(field as keyof WithAddress)) {
            formRef.current?.setFieldValue(field, value);
          }
        }

        if (isAdmin) fetchWarehouses({ companyId: option.value });
      }
      const findCompany = companies.find(({ id }) => id === option?.value);

      if (findCompany?.email && orderEmailRef.current) {
        orderEmailRef.current.addEmail(findCompany.email);
      }
    },
    [companies, isWarehouseMember, isCompanyMember]
  );

  const onWarehouseChange = useCallback(
    (option: SelectOption | null): void => {
      setGeneralState((state) => ({ ...state, warehouseId: option?.value }));

      if (isWarehouseMember) {
        formRef.current?.clearField('companyId');
        autoSet.map((field) => {
          formRef.current?.clearField(field);
        });

        if (option) fetchCompanies({ warehouseId: option.value });
      }
    },
    [formRef, isWarehouseMember, isAdmin]
  );

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        if (!orderItemsRef.current) return;

        const items = orderItemsRef.current.getItems();

        const { schema } = new CreateOrderValidator();
        const validData = await schema.validate(data, {
          abortEarly: false,
        });
        if (!items.length) {
          return notify(
            'error',
            'Adicione ao menos um produto à esta solicitação de estoque'
          );
        }
        if (orderEmailRef.current) {
          const emails = orderEmailRef.current.getEmails();
          Object.assign(validData, { emails: emails });
        }
        Object.assign(validData, { items });
        dispatch(MainActions.request(validData));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const handleDriver = useCallback(() => setIsDriver((prev) => !prev), []);
  const handleObs = useCallback(() => setAddObs((prev) => !prev), []);

  useEffect(
    () => handleApiErrors(validationErrors, formRef),
    [handleApiErrors, validationErrors]
  );
  useEffect(() => fetchAll(), [fetchAll]);
  useEffect(() => fetchVehicleTypes(), [fetchVehicleTypes]);

  return (
    <S.Container>
      <S.Panel>
        <FormPageHeader
          icon={<S.StockOrderIcon />}
          title="Solicitações de estoque"
          isLoading={false}
          actions={
            <S.LinkButton
              to={'/solicitacoes-estoque'}
              size="small"
              mood="primary"
            >
              <S.LeftArrowAlt size={24} /> Voltar
            </S.LinkButton>
          }
        />
        <Form ref={formRef} onSubmit={onSubmit}>
          <HiddenInput name="userId" value={profile?.userId} />
          <S.FormRow>
            <Select
              name="companyId"
              label="Cliente"
              options={chosenCompany}
              onChange={onCompanyChange}
              isLoading={loadingCompanies}
              isDisabled={
                (Boolean(profile?.company) && !profile?.root) ||
                !chosenCompany?.length
              }
            />
            <Select
              name="warehouseId"
              label="Armazém"
              options={chosenWarehouses}
              onChange={onWarehouseChange}
              isLoading={loadingWarehouses}
              isDisabled={
                (isAdmin && !generalState.companyId) ||
                !chosenWarehouses?.length
              }
            />
            <Input type="date" name="withdrawalDate" label="Data de entrega" />
            <ToggleInput
              name="isDriver"
              label={isDriver ? 'Retirada' : 'Entrega'}
              onChange={handleDriver}
            />
          </S.FormRow>
          <S.Subtitle>Endereço de entrega</S.Subtitle>
          <S.FormRow>
            <Input
              name="addressZipcode"
              label="Código postal"
              disabled={true}
            />
            <Input name="addressStreet" label="Logradouro" disabled={true} />
            <Input name="addressNumber" label="Número" disabled={true} />
          </S.FormRow>
          <S.FormRow>
            <Input
              name="addressComplement"
              label="Complemento"
              disabled={true}
            />
            <Input name="addressNeighborhood" label="Bairro" disabled={true} />
            <Input name="addressCity" label="Cidade" disabled={true} />
          </S.FormRow>
          <S.FormRow>
            <Input name="addressState" label="Estado" disabled={true} />
            <Input name="addressCountry" label="País" disabled={true} />
            <Input name="addressLatitude" label="Latitude" disabled={true} />
            <Input name="addressLongitude" label="Longitude" disabled={true} />
          </S.FormRow>
          {isDriver && (
            <>
              <S.Subtitle>Motorista</S.Subtitle>
              <S.FormRow>
                <Input name="driverName" label="Nome" type="text" />
                <MaskedInput
                  label="CNH"
                  name="driverCnh"
                  mask={'99999999999'}
                />
                <Select
                  name="vehicleTypeId"
                  label="Tipo de veículo"
                  options={vehicleTypesOptions}
                  isLoading={loadingVehicleTypes}
                />
                <Input
                  name="vehiclePlate"
                  label="Placa do veículo"
                  maxLength={7}
                />
              </S.FormRow>
            </>
          )}
          <S.Separator />
          <S.FormRow>
            <S.AddButton type="button" onClick={handleObs} isAdd={addObs}>
              Criar observação
              <S.AddIcon />
              <S.CloseIcon />
            </S.AddButton>
          </S.FormRow>
          {addObs && (
            <S.FormRow>
              <Input name="obs" label="" maxLength={255} />
            </S.FormRow>
          )}
        </Form>
      </S.Panel>
      <OrderItems
        companyId={generalState.companyId}
        warehouseId={generalState.warehouseId}
        ref={orderItemsRef}
        validationErrors={validationErrors}
      />
      <OrderEmails ref={orderEmailRef} />
      <S.Panel>
        <S.FormActions style={{ marginTop: 0 }}>
          <S.LinkButton mood="light" to="/solicitacoes-estoque">
            {FORM_BACK_ACTION}
          </S.LinkButton>
          <S.Button
            type="submit"
            onClick={formRef.current?.submitForm}
            disabled={creatingOrder}
          >
            {creatingOrder ? <S.ActivityIndicator /> : 'Salvar'}
          </S.Button>
        </S.FormActions>
      </S.Panel>
    </S.Container>
  );
};
