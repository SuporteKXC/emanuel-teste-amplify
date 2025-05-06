import React, { useCallback } from 'react';
import { Pagination } from "contracts";
import * as S from './styles';
import { useTranslation } from 'react-i18next';

interface Props {
  pagination?: Pagination | undefined;
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
    const { i18n,t } = useTranslation();

    const { current_page, last_page } = pagination;
    // if (last_page <= 1) return <></>;

    const targetSize = neighbors * 2;
    const middle = Math.floor(targetSize / 2);
    const paginatorArray = [];

    let start = current_page > middle ? current_page - middle : 1;
    start = start > last_page - targetSize ? last_page - targetSize : start;
    start = start < 1 ? 1 : start;
    let p = start + targetSize;
    p = last_page < p ? last_page : p;
    for (let i = start; i <= p; i++) {
      paginatorArray.push(i);
    }


    return (
      <S.Container>
        <>
          <S.AltButton
            key="first"
            disabled={current_page === 1}
            onClick={() => handleClick(1)}
          >
            {t('general.page.first')}
          </S.AltButton>
          {paginatorArray.map((i) => (
            <S.Button
              key={i}
              active={current_page === i}
              onClick={() => handleClick(i)}
            >
              {i}
            </S.Button>
          ))}
          <S.AltButton
            key="last"
            disabled={current_page === last_page}
            onClick={() => handleClick(last_page)}
          >
           {t('general.page.last')}
          </S.AltButton>
        </>
      </S.Container>
    );
  }, [handleClick, neighbors, pagination]);

  return <ButtonsPresenter />;
};
