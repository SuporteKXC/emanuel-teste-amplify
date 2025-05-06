import { Form } from '@unform/web';
import { CompactSearch } from 'components/Shared';
import type { FindMany } from 'contracts/Common';
import { throttle } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as S from './styles';

export interface FindMembers extends FindMany {}

interface Props {
  onFilter?: (query: FindMembers) => void;
  currentFilter: FindMembers;
  delay?: number;
}

export const MemberFilters: React.FC<Props> = ({
  delay = 1000,
  currentFilter,
  onFilter,
}) => {
  const [filters, setFilters] = useState<FindMembers>({
    ...currentFilter,
    dirty: false,
  });

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setFilters((state) => ({
        ...state,
        dirty: true,
        search: e.target.value,
      }));
    },
    []
  );

  // throttled methods

  const onSearch = useMemo(
    () => throttle(handleSearch, delay),
    [delay, handleSearch]
  );

  useEffect(() => {
    if (filters.dirty && onFilter) {
      onFilter(filters);
    }
  }, [filters, onFilter]);

  return (
    <S.Container>
      <Form onSubmit={() => {}}>
        <CompactSearch
          onChange={onSearch}
          defaultValue={filters?.search}
          placeholder="Buscar"
          name="search"
        />
      </Form>
    </S.Container>
  );
};
