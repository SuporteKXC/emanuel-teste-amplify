import type { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  AsyncSelect,
  FormPageHeader,
  HiddenInput,
  NumberInput,
} from 'components/Shared';
import type { ApiValidationError, SelectOption } from 'contracts/Common';
import type { ListedAvailableStock } from 'contracts/StockManager';
import type { StockOrderItem } from 'contracts/StockOrders';
import { useAsyncAvailableStocks, useValidation } from 'hooks';
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CreateOrderItemValidator } from 'validators/StockOrderItems';
import * as S from './styles';

interface ResultingOrderItem
  extends Pick<StockOrderItem, 'productId' | 'productUnitId' | 'batch'> {
  quantity: number; // the selected quantity
}

interface EnhancedListedAvailableStock extends ListedAvailableStock {
  quantity: number;
  quantityError?: string;
}

export interface Ref {
  getItems: () => ResultingOrderItem[];
}

interface Props {
  companyId?: number | string;
  warehouseId?: number | string;
  validationErrors?: ApiValidationError[];
}

interface IOrderItems
  extends ForwardRefExoticComponent<Props & RefAttributes<Ref>> {}

const OrderItems: IOrderItems = forwardRef<Ref, Props>((props, ref) => {
  const [items, setItems] = useState<EnhancedListedAvailableStock[]>([]);
  const [selectedStock, setSelectedStock] =
    useState<ListedAvailableStock | null>(null);
  const [stockDefaultOptions, setStockDefaultOptions] = useState<
    SelectOption[]
  >([]);

  const { companyId, warehouseId, validationErrors = [] } = props;
  const { handleFormErrors } = useValidation();
  const { fetchStocks, fetchStock, loadingStocks } = useAsyncAvailableStocks();

  const formRef = useRef<FormHandles>(null);

  const quantityLabel: string = useMemo((): string => {
    if (!selectedStock) return 'Quantidade';

    const existingItem = items.find((item) => item.id === selectedStock.id);

    if (existingItem) {
      return `Quantidade - ${
        selectedStock.availableQuantity - existingItem.quantity
      } em estoque`;
    }

    return `Quantidade - ${selectedStock.availableQuantity} em estoque`;
  }, [items, selectedStock]);

  const unitSuffix = useMemo((): string => {
    if (!selectedStock) return '';
    return ` ${selectedStock.productUnit.name}`;
  }, [selectedStock]);

  const factor = useMemo((): number | undefined => {
    if (!selectedStock) return;
    return selectedStock.product.factor;
  }, [selectedStock]);

  const availableQuantity = useMemo((): number | undefined => {
    if (!selectedStock) return;
    return selectedStock.availableQuantity;
  }, [selectedStock]);

  const onClientAndWarehouseChange = useCallback(async (): Promise<void> => {
    // whenever the client or warehouse changes, we need to reset some things
    formRef.current?.clearField('stockId');
    setSelectedStock(null);
    setItems([]);

    if (!companyId || !warehouseId) return;

    const options = await fetchStocks({ companyId, warehouseId });
    setStockDefaultOptions(options);
  }, [companyId, fetchStocks, warehouseId]);

  const onStockSeachChange = useCallback(
    (search: string): Promise<SelectOption[]> => {
      if (!search) return Promise.resolve([]);
      return fetchStocks({ search, companyId, warehouseId });
    },
    [companyId, fetchStocks, warehouseId]
  );

  const onStockIdChange = useCallback(
    (option: SelectOption | null): void => {
      formRef.current?.clearField('productId');
      formRef.current?.clearField('productUnitId');
      formRef.current?.clearField('batch');
      formRef.current?.clearField('quantity');
      formRef.current?.clearField('contractType');

      const stock = fetchStock(Number(option?.value || 0));

      setSelectedStock(stock);

      if (!stock) return;

      const { batch, productUnit, product } = stock;
      formRef.current?.setFieldValue('productId', product.id);
      formRef.current?.setFieldValue('productUnitId', productUnit.id);
      formRef.current?.setFieldValue('batch', batch);
      formRef.current?.setFieldValue('contractType', product.contractType);
    },
    [fetchStock, fetchStocks]
  );

  const onDelete = useCallback((id: number): void => {
    setItems((items) => items.filter((item) => item.id !== id));
  }, []);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});
        if (!selectedStock) return;

        const existingItem = items.find((item) => item.id === selectedStock.id);

        // if the item already exists, we need to deduce the quantity
        const availableQuantity = existingItem
          ? selectedStock.availableQuantity - existingItem.quantity
          : selectedStock.availableQuantity;

        const { schema } = new CreateOrderItemValidator({
          availableQuantity,
          factor,
          unitSuffix,
        });

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        setItems((state) => {
          const existingItemIndex = state.findIndex(
            (item) => item.id === selectedStock.id
          );

          // if the item already exists, just update the quantity
          if (existingItemIndex > -1) {
            const currentItems = [...state];
            currentItems[existingItemIndex].quantity += validData.quantity;
            return currentItems;
          }

          // otherwise, add a new item
          const newItem: EnhancedListedAvailableStock = {
            ...selectedStock,
            quantity: validData.quantity,
          };

          return [...state, newItem];
        });
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [handleFormErrors, items, selectedStock]
  );

  const handleApiErrors = useCallback((): void => {
    const relevantErrors = validationErrors.filter((error) =>
      error.field.match(/^items\[/)
    );

    if (!relevantErrors.length) return;

    fetchStocks({ companyId, warehouseId });

    for (const error of relevantErrors) {
      const { field, message } = error;
      const [, index, param] = field.match(/^items\[(\d+)\]\.(\w+)/) || [];

      // injecting the error into the correct state item
      if (param === 'quantity') {
        setItems((state) => {
          const currentItems = [...state];
          currentItems[+index].quantityError = message;

          const [, q] = message.match(/^Somente\s(\d+)/) || [];

          if (Number(q)) {
            currentItems[+index].quantity = Number(q);
          }

          return currentItems;
        });
      }
    }
  }, [companyId, fetchStocks, validationErrors, warehouseId]);

  const Item = useCallback(
    (item: EnhancedListedAvailableStock): JSX.Element => {
      const { id, product, productUnit, quantity, quantityError, batch } = item;

      return (
        <S.ListItem>
          <S.Column>{product.code}</S.Column>
          <S.Column>{product.name}</S.Column>
          <S.Column>
            {quantity} {productUnit.name}{' '}
            {quantityError && <S.Error>{quantityError}</S.Error>}
          </S.Column>
          <S.Column>{batch}</S.Column>
          <S.ActionsColumn>
            <S.ActionButton mood="danger" onClick={() => onDelete(id)}>
              <S.TrashIcon />
            </S.ActionButton>
          </S.ActionsColumn>
        </S.ListItem>
      );
    },
    [onDelete]
  );

  useEffect(() => {
    onClientAndWarehouseChange();
  }, [onClientAndWarehouseChange]);

  useEffect(() => {
    handleApiErrors();
  }, [handleApiErrors]);

  useImperativeHandle(
    ref,
    () => ({
      getItems: () => {
        return items.map((item) => {
          const { batch, product, productUnit, quantity } = item;
          return {
            batch,
            quantity,
            productId: product.id,
            productUnitId: productUnit.id,
          };
        });
      },
    }),
    [items]
  );

  return (
    <S.Panel>
      <FormPageHeader title="Produtos" />
      <Form ref={formRef} onSubmit={onSubmit}>
        <HiddenInput name="productId" readOnly />
        <HiddenInput name="productUnitId" readOnly />
        <HiddenInput name="batch" readOnly />
        <HiddenInput name="contractType" readOnly />
        <S.FormRow
          style={{ display: 'grid', gridTemplateColumns: 'auto 260px 160px' }}
        >
          <AsyncSelect
            name="stockId"
            label="Produto"
            menuPlacement="top"
            loadOptions={onStockSeachChange}
            onChange={onStockIdChange}
            defaultOptions={stockDefaultOptions}
            isLoading={loadingStocks}
            isDisabled={!companyId || !warehouseId}
            isClearable
          />
          <NumberInput
            label={quantityLabel}
            name="quantity"
            suffix={unitSuffix}
            isDisabled={!selectedStock}
            range={true}
            min={factor}
            max={availableQuantity}
            placeholder={factor && unitSuffix ? factor + unitSuffix : ''}
            step={factor}
            defaultValue={factor}
          />
          <S.Button disabled={!selectedStock} type="submit">
            Adicionar
          </S.Button>
        </S.FormRow>
      </Form>
      <S.List>
        {items.length > 0 && (
          <>
            <S.ListHeader>
              <S.Column>Código</S.Column>
              <S.Column>Produto</S.Column>
              <S.Column>Quantidade</S.Column>
              <S.Column>Lote</S.Column>
              <div></div>
            </S.ListHeader>
            {items.map((item) => (
              <Item key={item.id} {...item} />
            ))}
          </>
        )}
      </S.List>
    </S.Panel>
  );
});

export default OrderItems;
