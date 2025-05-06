import React, { useCallback } from 'react';
import { Pagination } from 'contracts/Pagination';
import * as S from './styles';

interface Props {
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
  neighbors?: number;
}

export const Paginator: React.FC<Props> = ({
  pagination,
  onPageChange,
  neighbors = 2,
}) => {
  const handleClick = useCallback(
    (page: number): void => {
      onPageChange && onPageChange(page);
    },
    [onPageChange]
  );

  const ButtonsPresenter = useCallback((): JSX.Element => {
    if (!pagination) return <></>;

    const { currentPage, lastPage } = pagination;
    if (lastPage <= 1) return <></>;

    const targetSize = neighbors * 2;
    const middle = Math.floor(targetSize / 2);
    const paginatorArray = [];

    let start = currentPage > middle ? currentPage - middle : 1;
    start = start > lastPage - targetSize ? lastPage - targetSize : start;
    start = start < 1 ? 1 : start;
    let t = start + targetSize;
    t = lastPage < t ? lastPage : t;
    for (let i = start; i <= t; i++) {
      paginatorArray.push(i);
    }

    return (
      <S.Container>
        <>
          <S.AltButton
            key="first"
            disabled={currentPage === 1}
            onClick={() => handleClick(1)}
          >
            Primeira
          </S.AltButton>
          {paginatorArray.map((i) => (
            <S.Button
              key={i}
              active={currentPage === i}
              onClick={() => handleClick(i)}
            >
              {i}
            </S.Button>
          ))}
          <S.AltButton
            key="last"
            disabled={currentPage === lastPage}
            onClick={() => handleClick(lastPage)}
          >
            Última
          </S.AltButton>
        </>
      </S.Container>
    );
  }, [handleClick, neighbors, pagination]);

  return <ButtonsPresenter />;
};
