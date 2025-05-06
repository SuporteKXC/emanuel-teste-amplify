import type { SortingParams } from "contracts";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as S from './styles';

interface PaginationContext {
  order: SortingParams;
  changeOrder?: (column: string) => void;
}

const HeadersContext = createContext<PaginationContext>({
  order: { orderByDirection: 'asc' },
});

interface SortableGroupProps
  extends React.PropsWithChildren<{
    currentSort: SortingParams;
    onSort?: (sort: SortingParams) => void;
  }> {}

interface SortableHeaderProps {
  label: string | JSX.Element;
  column: string;
}

export const SortableHeadersGroup: React.FC<SortableGroupProps> = ({
  currentSort,
  onSort,
  children,
}) => {
  const [order, setOrder] = useState<SortingParams & { dirty: boolean }>({
    ...(currentSort && {
      orderBy: currentSort?.orderBy,
      orderByDirection: currentSort?.orderByDirection || 'asc',
    }),
    dirty: false,
  });

  const changeOrder = useCallback((column: string) => {
    setOrder((state) => {
      const { orderBy, orderByDirection } = state;

      if (orderBy !== column) {
        return { ...state, orderBy: column, orderByDirection: 'asc', dirty: true };
      } else if (orderByDirection === 'asc') {
        return { ...state, orderByDirection: 'desc', dirty: true };
      } else {
        return { ...state, orderByDirection: 'asc', dirty: true };
      }
    });
  }, []);

  const handleOnSort = useCallback((): void => {
    if (order?.orderBy && order.dirty && onSort) {
      onSort({
        orderBy: order.orderBy,
        orderByDirection: order.orderByDirection 
      });
    }
  }, [order, onSort]);

  useEffect(() => {
    handleOnSort();
  }, [handleOnSort]);

  return (
    <HeadersContext.Provider value={{ order, changeOrder }}>
      {children}
    </HeadersContext.Provider>
  );
};

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  column,
}) => {
  const { order, changeOrder } = useContext(HeadersContext);

  const Icon = useCallback((): JSX.Element => {
    if (order?.orderBy !== column) return <S.SortIcon />;
    if (order.orderByDirection === 'asc') return <S.SortUpIcon />;
    return <S.SortDownIcon />;
  }, [column, order?.orderByDirection, order?.orderBy]);

  return (
    <div>
      <S.SortableHeader onClick={() => changeOrder?.(column)}>
        {label} <Icon />
      </S.SortableHeader>
    </div>
  );
};
