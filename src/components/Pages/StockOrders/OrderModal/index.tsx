import { Modal, CloseButton, StockOrderStatusLabel } from 'components/Shared';
import { EMPTY_COLUMN_VALUE } from 'constants/Common';
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { FetchStockOrderActions as FetchActions } from 'store/ducks/stockOrders';
import { Formatter } from 'utils';
import OrderItems from './OrderItems';
import * as S from './styles';

export interface OrderModalRef {
  selectOrder: (orderId: number) => void;
}

interface Props {}

interface Detail {
  label: string;
  value: string | number;
}

interface IOrderModal
  extends ForwardRefExoticComponent<Props & RefAttributes<OrderModalRef>> {}

export const OrderModal: IOrderModal = forwardRef<OrderModalRef, Props>(
  (_props, ref) => {
    const dispatch: AppDispatch = useDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<number | null>(null);

    const { data: order, loading: fetchingOrder } = useSelector(
      (state: RootState) => state.fetchStockOrder
    );

    const fetchOrder = useCallback((): void => {
      if (!orderId) return;
      dispatch(FetchActions.request(orderId));
    }, [dispatch, orderId]);

    const onCloseModal = useCallback((): void => {
      setOrderId(null);
      setIsOpen(false);
      dispatch(FetchActions.reset());
    }, [dispatch]);

    const User = useCallback((): JSX.Element => {
      if (!order) return <></>;
      const { user, createdAt } = order;
      return (
        <S.Detail>
          <S.DetailLabel>
            <S.SlotUser>
              <S.User>
                Incluído por: <S.Name title="Solicitante">{user.name}</S.Name>
              </S.User>
              <S.Date title="Data da inclusão">
                {Formatter.date(createdAt, { format: 'dd/MM/yyyy HH:mm' })}
              </S.Date>
            </S.SlotUser>
          </S.DetailLabel>
        </S.Detail>
      );
    }, [order]);

    const ModalHeader = useCallback((): JSX.Element => {
      const orderNumber = orderId ? `${orderId}`.padStart(4, '0') : '';
      const wmsId = order?.wmsId
        ? `${order.wmsId}`.padStart(4, '0')
        : EMPTY_COLUMN_VALUE;

      return (
        <S.ModalHeader>
          <S.HeaderTitle>
            <S.StockOrderIcon />
            <S.Titles>
              <h4>Solicitação {orderNumber}</h4>
              <h6>WMS ID {wmsId}</h6>
            </S.Titles>
            {fetchingOrder && <S.ActivityIndicator />}
          </S.HeaderTitle>
          <S.HeaderCenter>
            {!!order?.status && (
              <StockOrderStatusLabel status={order?.status} />
            )}
          </S.HeaderCenter>
          <S.HeaderButtons>
            <CloseButton onClick={onCloseModal} />
          </S.HeaderButtons>
        </S.ModalHeader>
      );
    }, [fetchingOrder, onCloseModal, order?.status, order?.wmsId, orderId]);

    const AddressPickupGrid = useCallback((): JSX.Element => {
      if (!order) return <></>;
      return (
        <S.DeliveryAddressGrid>
          <S.Detail>
            <S.DetailLabel>Endereço de entrega</S.DetailLabel>
            <S.DetailValue>{Formatter.address(order)}</S.DetailValue>
          </S.Detail>
        </S.DeliveryAddressGrid>
      );
    }, [order]);

    const MainGrid = useCallback((): JSX.Element => {
      if (!order) return <></>;

      const { company, warehouse, withdrawalDate, canceledAt } = order;

      const details: Detail[] = [
        { label: 'Cliente', value: company?.tradeName },
        {
          label: 'CNPJ do cliente',
          value: Formatter.document(company?.document),
        },
        {
          label: 'Armazém',
          value: warehouse?.tradeName,
        },
        {
          label: 'CNPJ do armazém',
          value: Formatter.document(warehouse?.document),
        },
        {
          label: 'Data de entrega',
          value: withdrawalDate
            ? Formatter.date(withdrawalDate)
            : EMPTY_COLUMN_VALUE,
        },
      ];

      if (canceledAt) {
        details.push({
          label: 'Data de cancelamento',
          value: Formatter.date(canceledAt),
        });
      }

      return (
        <S.MainGrid>
          {details.map(({ label, value }, i) => (
            <S.Detail key={i}>
              <S.DetailLabel>{label}</S.DetailLabel>
              <S.DetailValue>{value}</S.DetailValue>
            </S.Detail>
          ))}
        </S.MainGrid>
      );
    }, [order]);

    useEffect(() => {
      fetchOrder();
    }, [fetchOrder]);

    useImperativeHandle(
      ref,
      () => ({
        selectOrder: (orderId: number): void => {
          setOrderId(orderId);
          setIsOpen(true);
        },
      }),
      []
    );

    return (
      <Modal isOpen={isOpen} onClickOutside={onCloseModal}>
        <S.ModalContent style={{ maxWidth: '960px' }}>
          <ModalHeader />
          <S.ModalBody>
            <AddressPickupGrid />
            <MainGrid />
            {!!order?.items && <OrderItems items={order.items} />}
            <User />
          </S.ModalBody>
        </S.ModalContent>
      </Modal>
    );
  }
);
