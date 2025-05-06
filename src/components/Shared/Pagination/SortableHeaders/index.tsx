import type { SortingParams } from 'contracts/Common';
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
  order: { direction: 'asc' },
});

interface SortableGroupProps
  extends React.PropsWithChildren<{
    currentSort: SortingParams;
    onSort?: (sort: SortingParams) => void;
  }> {}

interface SortableHeaderProps {
  label: string | JSX.Element;
  column: string;
  padding?: boolean;
  disabled?: boolean;
}

export const SortableHeadersGroup: React.FC<SortableGroupProps> = ({
  currentSort,
  onSort,
  children,
}) => {
  const [order, setOrder] = useState<SortingParams>({
    ...(currentSort && {
      orderBy: currentSort?.orderBy,
      direction: currentSort?.direction || 'asc',
    }),
    dirty: false,
  });

  const changeOrder = useCallback((column: string) => {
    setOrder((state) => {
      const { orderBy, direction } = state;

      if (orderBy !== column) {
        return { ...state, orderBy: column, direction: 'asc', dirty: true };
      } else if (direction === 'asc') {
        return { ...state, direction: 'desc', dirty: true };
      } else {
        return { ...state, direction: 'asc', dirty: true };
      }
    });
  }, []);

  const handleOnSort = useCallback((): void => {
    if (order?.orderBy && order.dirty && onSort) {
      onSort(order);
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
  padding = false,
  disabled = false,
}) => {
  const { order, changeOrder } = useContext(HeadersContext);

  const Icon = useCallback((): JSX.Element => {
    if (order?.orderBy !== column) return <S.SortIcon />;
    if (order.direction === 'asc') return <S.SortUpIcon />;
    return <S.SortDownIcon />;
  }, [column, order.direction, order?.orderBy]);

  return (
    <div>
      <S.SortableHeader onClick={() => changeOrder?.(column)} padding={padding} disabled={disabled}>
        {label} {!disabled && <Icon />}
      </S.SortableHeader>
    </div>
  );
};
