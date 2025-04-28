import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useTranslation } from 'hooks';
import { translations } from './translations';
import * as S from './styles';
import { Input } from 'components/shared/Form';

interface ISearch {
  onSearch: Function;
}

export const Search: React.FC<ISearch> = ({ onSearch }) => {
  const formSearch = useRef<FormHandles>(null);
  const { getTranslation } = useTranslation(translations);
  const handleSearch = useCallback(
    (data) => {
      onSearch(data.search);
    },
    [onSearch]
  );

  return (
    <S.Container>
      <Form ref={formSearch} onSubmit={handleSearch}>
        <S.Wrapper>
          <Input name='search' placeholder={getTranslation('buscar')} />
          <S.SubmitButton>
            <S.IconSearch />
          </S.SubmitButton>
        </S.Wrapper>
      </Form>
    </S.Container>
  );
};
